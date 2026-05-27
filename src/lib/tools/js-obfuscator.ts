import generate from "@babel/generator";
import { parse } from "@babel/parser";
import * as t from "@babel/types";

export interface TransformJsCodeInput {
  sourceCode: string;
  identifierTargets?: string[];
  stringLiteralTargets?: string[];
}

type MutableNode = t.Node & Record<string, unknown>;

interface WalkContext {
  parent: t.Node | null;
  key: string | null;
  index: number | null;
  replaceWith: (nextNode: t.Node) => void;
}

function normalizeTargets(targets: string[] = []): string[] {
  return Array.from(
    new Set(
      targets
        .map((target) => target.trim())
        .filter((target) => target.length > 0)
    )
  );
}

function createIdentifierName(index: number): string {
  return `_jst_${index.toString(36)}`;
}

function createStringExpression(value: string): t.Expression {
  const charCodes = Array.from(value, (char) => char.charCodeAt(0));

  /**
   * 字符串字面量不直接替换成另一个固定字符串，而是改成运行时还原表达式。
   * 这样输出里不再保留原始特征文本，同时执行结果保持一致。
   */
  return t.callExpression(
    t.memberExpression(
      t.identifier("String"),
      t.identifier("fromCharCode")
    ),
    charCodes.map((charCode) => t.numericLiteral(charCode))
  );
}

function isNode(value: unknown): value is t.Node {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as { type?: unknown }).type === "string"
  );
}

function walkNode(
  node: t.Node,
  context: WalkContext,
  visitor: (node: t.Node, context: WalkContext) => void
) {
  visitor(node, context);

  const currentNode = node as MutableNode;

  for (const key of Object.keys(currentNode)) {
    if (
      key === "loc" ||
      key === "start" ||
      key === "end" ||
      key === "extra" ||
      key.endsWith("Comments")
    ) {
      continue;
    }

    const value = currentNode[key];

    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        if (!isNode(item)) {
          return;
        }

        walkNode(item, {
          parent: node,
          key,
          index,
          replaceWith: (nextNode) => {
            value[index] = nextNode;
          },
        }, visitor);
      });
      continue;
    }

    if (isNode(value)) {
      walkNode(value, {
        parent: node,
        key,
        index: null,
        replaceWith: (nextNode) => {
          currentNode[key] = nextNode;
        },
      }, visitor);
    }
  }
}

function collectPatternIdentifiers(
  node: t.Node | null | undefined,
  targetSet: Set<string>,
  declaredTargets: Set<string>
) {
  if (!node) {
    return;
  }

  if (t.isIdentifier(node)) {
    if (targetSet.has(node.name)) {
      declaredTargets.add(node.name);
    }
    return;
  }

  if (t.isRestElement(node)) {
    collectPatternIdentifiers(node.argument, targetSet, declaredTargets);
    return;
  }

  if (t.isAssignmentPattern(node)) {
    collectPatternIdentifiers(node.left, targetSet, declaredTargets);
    return;
  }

  if (t.isArrayPattern(node)) {
    node.elements.forEach((element) => {
      collectPatternIdentifiers(element, targetSet, declaredTargets);
    });
    return;
  }

  if (t.isObjectPattern(node)) {
    node.properties.forEach((property) => {
      if (t.isRestElement(property)) {
        collectPatternIdentifiers(property.argument, targetSet, declaredTargets);
        return;
      }

      collectPatternIdentifiers(property.value, targetSet, declaredTargets);
    });
  }
}

function collectDeclaredTargets(ast: t.Node, targetSet: Set<string>): Set<string> {
  const declaredTargets = new Set<string>();

  walkNode(ast, {
    parent: null,
    key: null,
    index: null,
    replaceWith: () => undefined,
  }, (node) => {
    if (t.isVariableDeclarator(node)) {
      collectPatternIdentifiers(node.id, targetSet, declaredTargets);
      return;
    }

    if (
      t.isFunctionDeclaration(node) ||
      t.isFunctionExpression(node) ||
      t.isArrowFunctionExpression(node) ||
      t.isObjectMethod(node) ||
      t.isClassMethod(node)
    ) {
      node.params.forEach((param) => {
        collectPatternIdentifiers(param, targetSet, declaredTargets);
      });
      return;
    }

    if (t.isCatchClause(node)) {
      collectPatternIdentifiers(node.param, targetSet, declaredTargets);
      return;
    }

    if (
      t.isImportSpecifier(node) ||
      t.isImportDefaultSpecifier(node) ||
      t.isImportNamespaceSpecifier(node)
    ) {
      collectPatternIdentifiers(node.local, targetSet, declaredTargets);
    }
  });

  return declaredTargets;
}

function isNonComputedPropertyKey(node: t.Identifier, parent: t.Node | null): boolean {
  return (
    ((t.isMemberExpression(parent) ||
      t.isOptionalMemberExpression(parent)) &&
      parent.property === node &&
      !parent.computed) ||
    ((t.isObjectMethod(parent) ||
      t.isClassMethod(parent) ||
      t.isClassProperty(parent) ||
      t.isObjectProperty(parent)) &&
      parent.key === node &&
      !parent.computed)
  );
}

function shouldRenameIdentifier(
  node: t.Identifier,
  parent: t.Node | null,
  declaredTargets: Set<string>
): boolean {
  if (!declaredTargets.has(node.name)) {
    return false;
  }

  if (isNonComputedPropertyKey(node, parent)) {
    return false;
  }

  if (t.isFunctionDeclaration(parent) && parent.id === node) {
    return false;
  }

  if (t.isFunctionExpression(parent) && parent.id === node) {
    return false;
  }

  if (t.isClassDeclaration(parent) && parent.id === node) {
    return false;
  }

  if (t.isClassExpression(parent) && parent.id === node) {
    return false;
  }

  if (t.isLabeledStatement(parent) && parent.label === node) {
    return false;
  }

  if (
    (t.isBreakStatement(parent) || t.isContinueStatement(parent)) &&
    parent.label === node
  ) {
    return false;
  }

  if (t.isImportSpecifier(parent) && parent.imported === node) {
    return false;
  }

  if (t.isExportSpecifier(parent) && parent.exported === node) {
    return false;
  }

  return true;
}

function shouldSkipStringLiteral(node: t.StringLiteral, parent: t.Node | null): boolean {
  if (
    t.isObjectProperty(parent) &&
    parent.key === node &&
    !parent.computed
  ) {
    return true;
  }

  if (
    t.isObjectMethod(parent) &&
    parent.key === node &&
    !parent.computed
  ) {
    return true;
  }

  if (
    (t.isMemberExpression(parent) || t.isOptionalMemberExpression(parent)) &&
    parent.property === node
  ) {
    return true;
  }

  if (
    t.isImportDeclaration(parent) ||
    t.isExportAllDeclaration(parent) ||
    t.isExportNamedDeclaration(parent)
  ) {
    return true;
  }

  return false;
}

export async function transformJsCode({
  sourceCode,
  identifierTargets = [],
  stringLiteralTargets = [],
}: TransformJsCodeInput): Promise<string> {
  if (sourceCode.trim().length === 0) {
    throw new Error("JS 代码不能为空");
  }

  const normalizedIdentifiers = normalizeTargets(identifierTargets);
  const normalizedStrings = normalizeTargets(stringLiteralTargets);
  const identifierTargetSet = new Set(normalizedIdentifiers);
  const identifierNameMap = new Map<string, string>();
  const stringTargetSet = new Set(normalizedStrings);

  normalizedIdentifiers.forEach((target, index) => {
    identifierNameMap.set(target, createIdentifierName(index));
  });

  try {
    const ast = parse(sourceCode, {
      sourceType: "unambiguous",
      plugins: ["jsx", "typescript"],
    });
    const declaredTargets = collectDeclaredTargets(ast, identifierTargetSet);

    walkNode(ast, {
      parent: null,
      key: null,
      index: null,
      replaceWith: () => undefined,
    }, (node, context) => {
      if (t.isIdentifier(node) && shouldRenameIdentifier(node, context.parent, declaredTargets)) {
        node.name = identifierNameMap.get(node.name) || node.name;
        return;
      }

      if (t.isStringLiteral(node)) {
        if (!stringTargetSet.has(node.value) || shouldSkipStringLiteral(node, context.parent)) {
          return;
        }

        context.replaceWith(createStringExpression(node.value));
      }
    });

    const outputCode = generate(ast, {
      comments: false,
      compact: true,
      minified: true,
      jsescOption: {
        minimal: true,
      },
    }).code;

    if (!outputCode) {
      throw new Error("压缩结果为空");
    }

    return outputCode;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "未知错误";

    throw new Error(`JS 定向处理失败：${errorMessage}`);
  }
}

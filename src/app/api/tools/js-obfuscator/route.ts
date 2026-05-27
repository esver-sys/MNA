import { NextRequest, NextResponse } from "next/server";

import { transformJsCode } from "@/lib/tools/js-obfuscator";

interface JsObfuscatorRequestBody {
  sourceCode?: string;
  identifierTargets?: string[];
  stringLiteralTargets?: string[];
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as JsObfuscatorRequestBody;

    if (typeof body.sourceCode !== "string") {
      return NextResponse.json(
        { error: "请提供需要混淆的 JS 代码" },
        { status: 400 }
      );
    }

    const outputCode = await transformJsCode({
      sourceCode: body.sourceCode,
      identifierTargets: Array.isArray(body.identifierTargets)
        ? body.identifierTargets
        : [],
      stringLiteralTargets: Array.isArray(body.stringLiteralTargets)
        ? body.stringLiteralTargets
        : [],
    });

    return NextResponse.json({
      outputCode,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "JS 定向处理失败";

    return NextResponse.json(
      { error: errorMessage },
      { status: 400 }
    );
  }
}

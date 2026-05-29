import { label } from "motion/react-client";

export const templateOptions = [
  {
    label: "Next",
    value: "template-next-checkout"
  },
  {
    label: 'Cleaner1',
    value: 'template-cleaner-blog',
  },
  {
    label: 'Cleaner2',
    value: 'template-cleaner-product',
  },
  {
    label: "Single",
    value: "template-range-xtd"
  },
  {
    label: "Echo",
    value: "template-echo-checkout"
  },
  {
    label: "Motion",
    value: "template-motion-checkout"
  },
  {
    label: "Gift",
    value: "template-gift-checkout"
  },
  {
    label: 'seed',
    value: 'template-seed-product',
  },
  {
    label: 'loop',
    value: 'template-loop-blog',
  },
  {
    label: "Blank1",
    value: "template-blank-blog"
  },
  {
    label: "Blank2",
    value: "template-blank-product"
  }
] as const;

export type TemplateValue = (typeof templateOptions)[number]['value'];


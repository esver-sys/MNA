export const templateOptions = [
  {
    label: 'cleaner1',
    value: 'template-cleaner-blog',
  },
  {
    label: 'cleaner2',
    value: 'template-cleaner-product',
  },
  {
    label: 'single',
    value: 'template-single'
  }
] as const;

export type TemplateValue = (typeof templateOptions)[number]['value'];

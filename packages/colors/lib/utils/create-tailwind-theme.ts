import { flattenHybridCase } from './create-styles.js';
import { camelCaseToKebabCase } from './format-variable.js';

/** Creates a Tailwind CSS v4 inline color theme backed by the Kontur CSS variables. */
export function createTailwindTheme(tokens: unknown): string {
  const colors = Object.keys(flattenHybridCase(tokens))
    .map((key) => {
      const tokenName = camelCaseToKebabCase(key);
      return `  --color-k-${tokenName}: var(--k-color-${tokenName});`;
    })
    .join('\n');

  return `@theme inline {\n${colors}\n}\n`;
}

import { expect, test } from 'vitest';

import { getColors } from '../lib/get-colors.js';
import { flattenHybridCase } from '../lib/utils/create-styles.js';
import { createTailwindTheme } from '../lib/utils/create-tailwind-theme.js';
import { camelCaseToKebabCase } from '../lib/utils/format-variable.js';

test('creates Tailwind v4 utilities for every color token', () => {
  const tokens = getColors({ brand: 'red', accent: 'gray', theme: 'light' });
  const theme = createTailwindTheme(tokens);
  const tokenNames = Object.keys(flattenHybridCase(tokens)).map(camelCaseToKebabCase);

  expect(theme).toContain('@theme inline {');
  expect(theme).toContain('  --color-k-text-neutral-heavy: var(--k-color-text-neutral-heavy);');
  expect(theme.match(/--color-k-/g)).toHaveLength(tokenNames.length);

  for (const tokenName of tokenNames) {
    expect(theme).toContain(`--color-k-${tokenName}: var(--k-color-${tokenName});`);
  }
});

// @ts-expect-error - jscodeshift/dist/testUtils doesn't have type definitions
import { defineInlineTest } from 'jscodeshift/dist/testUtils';

import transform from '../renameThemeVars';

defineInlineTest(
  transform,
  {},
  `
  const THEME = ThemeFactory.create({
      blue: '#0000ff',
      checkboxLabelGap: '10px',
      switcherLabelFontSizeSmall: '20px',
    }, DEFAULT_THEME);
`,
  `
    const THEME = ThemeFactory.create({
      blue: '#0000ff',
      checkboxCaptionGap: '10px',
      switcherCaptionFontSizeSmall: '20px',
    }, DEFAULT_THEME);
  `,
  `rename theme variables`,
);

const { defineInlineTest } = require('jscodeshift/dist/testUtils');

const transform = require('../renameThemeVars');

jest.autoMockOff();

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

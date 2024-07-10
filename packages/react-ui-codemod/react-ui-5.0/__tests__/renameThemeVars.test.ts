const { defineInlineTest } = require('jscodeshift/dist/testUtils');

const transform = require('../renameThemeVars');

jest.autoMockOff();

defineInlineTest(
  transform,
  {},
  `
  const THEME = ThemeFactory.create({
      blue: '#0000ff',
      btnLinkLineBorderBottomStyle: 'solid',
      linkLineBorderBottomWidth: '2px',
    }, DEFAULT_THEME);
`,
  `
    const THEME = ThemeFactory.create({
      blue: '#0000ff',
      btnLinkTextDecorationStyle: 'solid',
      linkTextDecorationThickness: '2px',
    }, DEFAULT_THEME);
  `,
  `rename theme variables`,
);

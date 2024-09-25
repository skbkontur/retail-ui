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
    pagingForwardIconMarginTop: '5px',
    tokenMarginY: '20px',
    tokenInputLineHeight: '5px',
    btnIconGapSmall: '5px',
    menuItemIconWidth: '5px',
    toggleFontSize: '5px',
    checkboxFontSize: '5px',
    textareaFontSize: '5px',
    radioSize: '5px',
    tabFontSize: '5px',
    fileUploaderFontSize: '5px',
  }, DEFAULT_THEME);
`,
`
  const THEME = ThemeFactory.create({
    blue: '#0000ff',
    btnLinkTextDecorationStyle: 'solid',
    linkTextDecorationThickness: '2px',
    pagingForwardIconMarginTop: '5px',
    tokenMarginYSmall: '20px',
    tokenInputLineHeightSmall: '5px',
    btnIconGapSmallLeft: '5px',
    menuItemIconWidthSmall: '5px',
    toggleFontSizeSmall: '5px',
    checkboxFontSizeSmall: '5px',
    textareaFontSizeSmall: '5px',
    radioSizeSmall: '5px',
    tabFontSizeLarge: '5px',
    fileUploaderFontSizeSmall: '5px',
  }, DEFAULT_THEME);
`,
  `rename theme variables`,
);

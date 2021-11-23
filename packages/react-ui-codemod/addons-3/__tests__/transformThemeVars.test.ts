const { defineInlineTest } = require('jscodeshift/dist/testUtils');

const transform = require('../renameThemeVars');

jest.autoMockOff();

defineInlineTest(
  transform,
  {},
  `
    const THEME = ThemeFactory.create({
      blue: '#0000ff',
      tbHeight: '100px',
      logoColor() {},
    }, DEFAULT_THEME);
`,
  `
    const THEME = ThemeFactory.create({
      blue: '#0000ff',
      addonsTopBarHeight: '100px',
      addonsLogoColor() {},
    }, DEFAULT_THEME);
  `,
  `transforms object`,
);

defineInlineTest(
  transform,
  {},
  `
    const node = (
      <ThemeContext.Provider value={ThemeFactory.create({
        blue: '#0000ff',
        tbHeight: '100px',
        logoColor() {},
      }, DEFAULT_THEME)} />
    );
`,
  `
    const node = (
      <ThemeContext.Provider value={ThemeFactory.create({
        blue: '#0000ff',
        addonsTopBarHeight: '100px',
        addonsLogoColor() {},
      }, DEFAULT_THEME)} />
    );
  `,
  `transforms jsx`,
);

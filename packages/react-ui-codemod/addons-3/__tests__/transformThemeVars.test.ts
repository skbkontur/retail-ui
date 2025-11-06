// @ts-expect-error - jscodeshift/dist/testUtils doesn't have type definitions
import { defineInlineTest } from 'jscodeshift/dist/testUtils';

import transform from '../renameThemeVars';

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

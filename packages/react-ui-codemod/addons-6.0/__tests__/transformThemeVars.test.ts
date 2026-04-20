import { defineInlineTest } from 'jscodeshift/dist/testUtils';

import transform from '../renameThemeVars';

defineInlineTest(
  transform,
  {},
  `
  const THEME = ThemeFactory.create({
    blue: '#0000ff',
    addonsTopBarTextColor: '#fff',
    addonsLogoButtonActionColor: '#fff',
    addonsUserAvatarActiveBackground: '#fff',
  }, LIGHT_THEME);
`,
`
  const THEME = ThemeFactory.create({
    blue: '#0000ff',
    addonsTopBarColor: '#fff',
    addonsLogoButtonColorAction: '#fff',
    addonsUserAvatarBgActive: '#fff',
  }, LIGHT_THEME);
`,
  `rename theme variables`,
);
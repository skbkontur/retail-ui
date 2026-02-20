// @ts-expect-error - jscodeshift/dist/testUtils doesn't have type definitions
import { defineInlineTest } from 'jscodeshift/dist/testUtils';

import transform from '../renameThemeVars';

defineInlineTest(
  transform,
  {},
  `
  const THEME = ThemeFactory.create({
    blue: '#0000ff',
    sideMenuBgColor: '#fff',
    sideMenuFocusedItemBoxShadowColor() {},
  }, LIGHT_THEME);
`,
`
  const THEME = ThemeFactory.create({
    blue: '#0000ff',
    sideMenuBg: '#fff',
    sideMenuItemFocusBoxShadowColor() {},
  }, LIGHT_THEME);
`,
  `rename theme variables`,
);
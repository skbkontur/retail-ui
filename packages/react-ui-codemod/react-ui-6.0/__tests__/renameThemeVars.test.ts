import { defineInlineTest } from 'jscodeshift/dist/testUtils';

import transform from '../renameThemeVars';

defineInlineTest(
  transform,
  {},
  `
  const THEME = ThemeFactory.create({
    blue: '#0000ff',
    btnWithIconPaddingLeftSmall: '10px',
    tooltipPaddingY: '10px',
    tooltipPaddingX: '10px',
    tooltipCloseBtnPadding: '10px',
    tooltipBorderRadius: '10px',
    tooltipPinOffsetY: '10px',
    tooltipPinOffsetX: '10px',
    tooltipMargin: '10px',
    tooltipPinSize: '10px',
    tooltipFontSize: '10px',
    tooltipLineHeight: '10px',
    mobileSidePageCloseButtonRightPadding: '10px',
    pagingFontSize: '10px',
    pagingLineHeight: '10px',
    pagingPageLinkPaddingY: '10px',
    pagingPageLinkPaddingX: '10px',
    pagingDotsPadding: '10px',
  }, LIGHT_THEME);
`,
`
  const THEME = ThemeFactory.create({
    blue: '#0000ff',
    btnWithIconPaddingSmall: '10px',
    tooltipPaddingYSmall: '10px',
    tooltipPaddingXSmall: '10px',
    tooltipCloseBtnPaddingSmall: '10px',
    tooltipBorderRadiusSmall: '10px',
    tooltipPinOffsetYSmall: '10px',
    tooltipPinOffsetXSmall: '10px',
    tooltipMarginSmall: '10px',
    tooltipPinSizeSmall: '10px',
    tooltipFontSizeSmall: '10px',
    tooltipLineHeightSmall: '10px',
    mobileSidePageCloseButtonPadding: '10px',
    pagingFontSizeSmall: '10px',
    pagingLineHeightSmall: '10px',
    pagingPageLinkPaddingYSmall: '10px',
    pagingPageLinkPaddingXSmall: '10px',
    pagingDotsPaddingSmall: '10px',
  }, LIGHT_THEME);
`,
  `rename theme variables`,
);

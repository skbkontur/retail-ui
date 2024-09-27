import { API, FileInfo } from 'jscodeshift';

const RENAMED_VARS: Record<string, string> = {
  linkLineBorderBottomStyle: 'linkTextDecorationStyle',
  linkLineHoverBorderBottomStyle: 'linkHoverTextDecorationStyle',
  linkLineBorderBottomWidth: 'linkTextDecorationThickness',
  linkLineBorderBottomOpacity: 'linkTextUnderlineOpacity',
  linkLineBorderBottomColor: 'linkTextDecorationColor',
  btnLinkLineBorderBottomColor: 'btnLinkTextDecorationColor',
  btnLinkLineBorderBottomStyle: 'btnLinkTextDecorationStyle',
  btnLinkHoverLineBorderBottomStyle: 'btnLinkHoverTextDecorationStyle',
  btnLinkLineBorderBottomWidth: 'btnLinkTextDecorationThickness',
  btnLinkLineBorderBottomOpacity: 'btnLinkTextUnderlineOpacity',
  tokenMarginY: 'tokenMarginYSmall',
  tokenMarginX: 'tokenMarginXSmall',
  tokenFontSize: 'tokenFontSizeSmall',
  tokenLineHeight: 'tokenLineHeightSmall',
  tokenPaddingY: 'tokenPaddingYSmall',
  tokenPaddingX: 'tokenPaddingXSmall',
  tokenInputLineHeight: 'tokenInputLineHeightSmall',
  tokenInputPaddingY: 'tokenInputPaddingYSmall',
  tokenInputPaddingX: 'tokenInputPaddingXSmall',
  btnIconGapSmall: 'btnIconGapSmallLeft',
  btnIconGapMedium: 'btnIconGapMediumLeft',
  btnIconGapLarge: 'btnIconGapLargeLeft',
  menuItemIconWidth: 'menuItemIconWidthSmall',
  menuItemPaddingForIcon: 'menuItemPaddingForIconSmall',
  menuItemLineHeight: 'menuItemLineHeightSmall',
  menuItemFontSize: 'menuItemFontSizeSmall',
  menuItemPaddingX: 'menuItemPaddingXSmall',
  menuMessageLineHeight: 'menuMessageLineHeightSmall',
  menuMessageFontSize: 'menuMessageFontSizeSmall',
  menuHeaderLineHeight: 'menuHeaderLineHeightSmall',
  menuHeaderFontSize: 'menuHeaderFontSizeSmall',
  menuHeaderPaddingX: 'menuHeaderPaddingXSmall',
  menuHeaderPaddingTop: 'menuHeaderPaddingTopSmall',
  menuHeaderPaddingBottom: 'menuHeaderPaddingBottomSmall',
  menuLegacyPaddingY: 'menuScrollContainerContentWrapperPaddingY',
  toggleFontSize: 'toggleFontSizeSmall',
  toggleLineHeight: 'toggleLineHeightSmall',
  toggleHandleBorderRadius: 'toggleHandleBorderRadiusSmall',
  toggleHeight: 'toggleHeightSmall',
  toggleWidth: 'toggleWidthSmall',
  toggleBorderRadius: 'toggleBorderRadiusSmall',
  toggleBg: 'toggleHandleBg',
  toggleHandleSize: 'toggleHandleSizeSmall',
  toggleHandleBoxShadowOld: 'toggleHandleBoxShadow',
  checkboxFontSize: 'checkboxFontSizeSmall',
  checkboxLineHeight: 'checkboxLineHeightSmall',
  checkboxBoxSize: 'checkboxBoxSizeSmall',
  checkboxPaddingY: 'checkboxPaddingYSmall',
  textareaFontSize: 'textareaFontSizeSmall',
  textareaLineHeight: 'textareaLineHeightSmall',
  textareaMinHeight: 'textareaMinHeightSmall',
  textareaPaddingX: 'textareaPaddingXSmall',
  textareaPaddingY: 'textareaPaddingYSmall',
  radioSize: 'radioSizeSmall',
  radioFontSize: 'radioFontSizeSmall',
  radioLineHeight: 'radioLineHeightSmall',
  radioPaddingY: 'radioPaddingYSmall',
  radioBulletSize: 'radioBulletSizeSmall',
  tabFontSize: 'tabFontSizeLarge',
  tabLineHeight: 'tabLineHeightLarge',
  tabPaddingX: 'tabPaddingXLarge',
  tabsMarginX: 'tabPaddingXLarge',
  tabPaddingY: 'tabPaddingYLarge',
  dropdownMenuSelectedBg: 'menuItemSelectedBg',
  dropdownMenuHoverBg: 'menuItemHoverBg',
  fileUploaderFontSize:'fileUploaderFontSizeSmall',
  fileUploaderLineHeight:'fileUploaderLineHeightSmall',
  fileUploaderPaddingX:'fileUploaderPaddingXSmall',
  fileUploaderPaddingY:'fileUploaderPaddingYSmall',
  pickerBg: 'calendarBg',
  pickerBorderRadius: 'calendarBorderRadius',
  tokenDefaultIdleBg: 'tokenBg',
  tokenDefaultIdleColor: 'tokenColor',
  tokenDefaultIdleBorderColor: 'tokenBorderColor',
  tokenDefaultIdleBgHover: 'tokenBgHover',
  tokenDefaultIdleColorHover: 'tokenColorHover',
  tokenDefaultIdleBorderColorHover: 'tokenBorderColorHover',
  tokenDefaultActiveBg: 'tokenBgActive',
  tokenDefaultActiveColor: 'tokenColorActive',
  tokenDefaultActiveBorderColor: 'tokenBorderColorActive'
};

export default function transform(file: FileInfo, api: API) {
  const j = api.jscodeshift;
  let modified = false;
  const result = j(file.source)
    .find(j.ObjectExpression)
    .find(j.Identifier, (node) => !!RENAMED_VARS[node.name])
    .replaceWith((path) => {
      path.node.name = RENAMED_VARS[path.node.name];
      modified = true;
      return path.node;
    });
  if (modified) {
    return result.toSource({ lineTerminator: '\n' });
  }
}

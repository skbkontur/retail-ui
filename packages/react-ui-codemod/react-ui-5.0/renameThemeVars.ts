import { API, FileInfo } from 'jscodeshift';

const RENAMED_VARS: Record<string, string> = {
  calendarCellSize: 'calendarCellHeight',
  tokenMarginY: 'tokenMarginYSmall',
  tokenMarginX: 'tokenMarginXSmall',
  tokenFontSize: 'tokenFontSizeSmall',
  tokenLineHeight: 'tokenLineHeightSmall',
  tokenPaddingY: 'tokenPaddingYSmall',
  tokenPaddingX: 'tokenPaddingXSmall',
  tokenInputLineHeight: 'tokenInputLineHeightSmall',
  tokenInputPaddingY: 'tokenInputPaddingYSmall',
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
  toggleFontSize: 'toggleFontSizeSmall',
  toggleLineHeight: 'toggleLineHeightSmall',
  toggleHandleBorderRadius: 'toggleHandleBorderRadiusSmall',
  toggleHeight: 'toggleHeightSmall',
  toggleWidth: 'toggleWidthSmall',
  toggleBorderRadius: 'toggleBorderRadiusSmall',
  toggleBg: 'toggleHandleBg',
  toggleHandleSize: 'toggleHandleSizeSmall',
  toggleBgActive: 'toggleContainerBgDisabled',
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
  pagingForwardLinkDisabledColor: 'linkDisabledColor',
  dropdownMenuSelectedBg: 'menuItemSelectedBg',
  dropdownMenuHoverBg: 'menuItemHoverBg'
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
    return  result.toSource({ lineTerminator: '\n' });
  }
}

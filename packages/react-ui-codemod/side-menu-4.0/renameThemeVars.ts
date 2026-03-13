import { API, FileInfo } from 'jscodeshift';

const RENAMED_VARS: Record<string, string> = {
  // SideMenu
  sideMenuBgColor: "sideMenuBg",
  sideMenuLargeLineHeight: "sideMenuLineHeightLarge",
  sideMenuMinimizedWidth: "sideMenuWidthCollapsed",
  sideMenuWidthForTouchScreens: "sideMenuWidthTouchScreen",
  // Header
  sideMenuHeaderPaddingTopForTouchScreens: "sideMenuHeaderPaddingTopTabletAndMobile",
  // Divider
  sideMenuDividerBgColor: "sideMenuDividerBg",
  // Item
  sideMenuItemHoverBg: "sideMenuItemBgHover",
  sideMenuItemActiveBg: "sideMenuItemBgActive",
  sideMenuItemDisabledColor: "sideMenuItemColorDisabled",
  sideMenuNestedMenuPaddingLeft: "sideMenuItemNestedPaddingLeft",
  sideMenuFocusedItemBoxShadow: "sideMenuItemBoxShadowFocus",
  sideMenuFocusedItemBoxShadowColor: "sideMenuItemBoxShadowColorFocus",
  sideMenuSubItemWithSeparatedSubMenuHoverBg: "sideMenuSubItemWithSeparatedSubMenuBgHover",
  sideMenuSubItemWithSeparatedSubMenuActiveBg: "sideMenuSubItemWithSeparatedSubMenuBgActive",
  // ItemContent
  sideMenuItemContentLargePaddingY: "sideMenuItemContentPaddingYLarge",
  sideMenuItemContentLargeMultilinePaddingTop: "sideMenuItemContentMultilinePaddingTopLarge",
  sideMenuItemContentLargeMultilinePaddingBottom: "sideMenuItemContentMultilinePaddingBottomLarge",
  sideMenuItemContentPaddingYForTouchScreens: "sideMenuItemContentPaddingYTouchScreen",
  sideMenuSubItemContentLargePaddingY: "sideMenuSubItemContentPaddingYLarge",
  sideMenuSubItemContentPaddingYForTouchScreens: "sideMenuSubItemContentPaddingYTouchScreen",
  // Icon
  sideMenuIconLargeMinHeight: "sideMenuIconMinHeightLarge",
  sideMenuIconLargeLineHeight: "sideMenuIconLineHeightLarge",
  sideMenuIconLargeSubItemMinHeight: "sideMenuIconSubItemMinHeightLarge",
  // Caption
  sideMenuCaptionLargeFontSize: "sideMenuCaptionFontSizeLarge",
  sideMenuCaptionLargeLineHeight: "sideMenuCaptionLineHeightLarge",
  sideMenuCaptionFontSizeForTouchScreens: "sideMenuCaptionFontSizeTouchScreen",
  sideMenuCaptionLineHeightForTouchScreens: "sideMenuCaptionLineHeightTouchScreen",
  sideMenuCaptionSubItemFontSizeForTouchScreens: "sideMenuCaptionSubItemFontSizeTouchScreen",
  sideMenuCaptionSubItemLineHeightForTouchScreens: "sideMenuCaptionSubItemLineHeightTouchScreen",
  // Marker
  sideMenuSubItemMarkerFontWeight: "sideMenuMarkerSubItemFontWeight",
  sideMenuSubItemEmptyMarkerBg: "sideMenuMarkerSubItemEmptyBg",
  // SeparatedSubMenu
  sideMenuSeparatedSubMenuBgColor: "sideMenuSeparatedSubMenuBg",
  // RightBorder
  sideMenuRightBorderHoverIconColor: "sideMenuRightBorderIconColorHover"
};

export default function transform(file: FileInfo, api: API) {
  const j = api.jscodeshift;
  let modified = false;
  const result = j(file.source)
    .find(j.ObjectExpression)
    .find(j.Identifier, node => RENAMED_VARS[node.name])
    .replaceWith(path => {
      path.node.name = RENAMED_VARS[path.node.name];
      modified = true;
      return path.node;
    });
  if (modified) {
    return result.toSource({ lineTerminator: '\n' });
  }
}

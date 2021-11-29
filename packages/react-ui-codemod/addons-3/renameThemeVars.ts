/* eslint-disable import/no-default-export */
import { API, FileInfo } from 'jscodeshift';

const RENAMED_VARS: Record<string, string> = {
  tbBg: 'addonsTopBarBg',
  tbShadow: 'addonsTopBarShadow',
  tdDividerBg: 'addonsTopBarDividerBg',
  tbDividerHeight: 'addonsTopBarDividerHeight',
  tbDividerMarginX: 'addonsTopBarDividerMarginX',
  tbHeight: 'addonsTopBarHeight',
  tbItemHeight: 'addonsTopBarItemHeight',
  tbItemLineHeight: 'addonsTopBarItemLineHeight',
  tbItemPaddingY: 'addonsTopBarItemPaddingY',
  tbItemPaddingX: 'addonsTopBarItemPaddingX',
  tbItemMarginY: 'addonsTopBarItemMarginY',
  tbItemMarginX: 'addonsTopBarItemMarginX',
  tbAvatarItemOutline: 'addonsTopBarAvatarItemOutline',
  tbAvatarItemGap: 'addonsTopBarAvatarItemGap',
  tbAvatarItemHeight: 'addonsTopBarAvatarItemHeight',
  tbAvatarItemPaddingY: 'addonsTopBarAvatarItemPaddingY',
  tbAvatarItemPaddingX: 'addonsTopBarAvatarItemPaddingX',
  tbAvatarItemMarginY: 'addonsTopBarAvatarItemMarginY',
  tbAvatarItemMarginX: 'addonsTopBarAvatarItemMarginX',
  tbPaddingX: 'addonsTopBarPaddingX',
  tbPaddingY: 'addonsTopBarPaddingY',
  tbMarginBottom: 'addonsTopBarMarginBottom',
  tbItemIconGap: 'addonsTopBarItemIconGap',
  tbIconColor: 'addonsTopBarIconColor',
  tbItemBorderRadius: 'addonsTopBarItemBorderRadius',
  tbItemActionBackground: 'addonsTopBarItemActionBackground',
  tbMenuSeparatorMarginX: 'addonsTopBarMenuSeparatorMarginX',
  tbMenuSeparatorMarginY: 'addonsTopBarMenuSeparatorMarginY',
  tbMenuSeparatorColor: 'addonsTopBarMenuSeparatorColor',
  tbMenuItemHoverBg: 'addonsTopBarMenuItemHoverBg',
  tbMenuItemHoverColor: 'addonsTopBarMenuItemHoverColor',
  tbMenuItemPaddingX: 'addonsTopBarMenuItemPaddingX',

  logoColor: 'addonsLogoColor',
  logoHoverColor: 'addonsLogoHoverColor',
  logoDividerHeight: 'addonsLogoDividerHeight',
  logoDividerWidth: 'addonsLogoDividerWidth',
  logoDividerMarginX: 'addonsLogoDividerMarginX',
  logoDividerBg: 'addonsLogoDividerBg',

  logoWidgetPaddingX: 'addonsLogoWidgetPaddingX',
  logoButtonHeight: 'addonsLogoButtonHeight',
  logoButtonWidth: 'addonsLogoButtonWidth',
  logoButtonMarginLeft: 'addonsLogoButtonMarginLeft',
  logoButtonActionBorderRadius: 'addonsLogoButtonActionBorderRadius',
  logoButtonActionBackground: 'addonsLogoButtonActionBackground',

  userAvatarSize:  'addonsUserAvatarSize',
  userAvatarBorderRadius:  'addonsUserAvatarBorderRadius',
  userAvatarBackground:  'addonsUserAvatarBackground',
  userAvatarHoverBackground:  'addonsUserAvatarHoverBackground',
  userAvatarActiveBackground:  'addonsUserAvatarActiveBackground',
  userAvatarColor:  'addonsUserAvatarColor',
  userAvatarHoverColor:  'addonsUserAvatarHoverColor',
  userAvatarActiveColor:  'addonsUserAvatarActiveColor',
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
    return result.toSource();
  }
}

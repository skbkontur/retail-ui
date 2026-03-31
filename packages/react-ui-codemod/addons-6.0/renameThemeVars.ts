import { API, FileInfo } from 'jscodeshift';

const RENAMED_VARS: Record<string, string> = {
  // TopBar
  addonsTopBarTextColor: "addonsTopBarColor",
  addonsTopBarItemIconGap: "addonsTopBarItemGap",
  addonsTopBarIconColor: "addonsTopBarItemIconColor",
  addonsTopBarAvatarItemOutline: "addonsTopBarAvatarOutline",
  addonsTopBarAvatarItemGap: "addonsTopBarAvatarGap",
  addonsTopBarAvatarItemHeight: "addonsTopBarAvatarHeight",
  addonsTopBarAvatarItemPaddingY: "addonsTopBarAvatarPaddingY",
  addonsTopBarAvatarItemPaddingX: "addonsTopBarAvatarPaddingX",
  addonsTopBarAvatarItemMarginY: "addonsTopBarAvatarMarginY",
  addonsTopBarAvatarItemMarginX: "addonsTopBarAvatarMarginX",
  // Logotype
  addonsLogoButtonActionColor: "addonsLogoButtonColorAction",
  // UserAvatar
  addonsUserAvatarBackground: "addonsUserAvatarBg",
  addonsUserAvatarHoverBackground: "addonsUserAvatarBgHover",
  addonsUserAvatarActiveBackground: "addonsUserAvatarBgActive",
  addonsUserAvatarHoverColor: "addonsUserAvatarColorHover",
  addonsUserAvatarActiveColor: "addonsUserAvatarColorActive",
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

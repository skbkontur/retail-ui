import { Theme } from '../../lib/theming/Theme';
import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { resetButton } from '../../lib/styles/Mixins';

import { iconSizeMixin, menuItemSizeMixin, withIconSizeMixin } from './MenuItem.mixins';

export const getMenuItemPaddings = ({
  menuItemPaddingX,
  menuItemPaddingY,
}: Record<'menuItemPaddingX' | 'menuItemPaddingY', string>) => {
  const paddingX = menuItemPaddingX;
  const paddingY = menuItemPaddingY;

  return { paddingX, paddingY };
};

export const styles = memoizeStyle({
  root(t: Theme) {
    return css`
      ${resetButton()};

      cursor: pointer;
      display: ${t.menuItemDisplay};
      position: relative;
      text-decoration: none;
      color: ${t.menuItemTextColor};
      border-radius: ${t.menuItemBorderRadius};

      button& {
        min-width: 100%;
      }

      &:nth-last-of-type(n + 2) {
        margin-bottom: ${t.menuItemGap};
      }
    `;
  },

  rootSmall(t: Theme) {
    return css`
      ${menuItemSizeMixin(
        t.menuItemPaddingXSmall,
        t.menuItemPaddingYSmall,
        t.menuItemLineHeightSmall,
        t.menuItemFontSizeSmall,
      )};
    `;
  },
  rootMedium(t: Theme) {
    return css`
      ${menuItemSizeMixin(
        t.menuItemPaddingXMedium,
        t.menuItemPaddingYMedium,
        t.menuItemLineHeightMedium,
        t.menuItemFontSizeMedium,
      )};
    `;
  },
  rootLarge(t: Theme) {
    return css`
      ${menuItemSizeMixin(
        t.menuItemPaddingXLarge,
        t.menuItemPaddingYLarge,
        t.menuItemLineHeightLarge,
        t.menuItemFontSizeLarge,
      )};
    `;
  },

  rootMobile(t: Theme) {
    return css`
      font-size: ${t.menuItemFontSizeMobile};
      line-height: ${t.menuItemLineHeightMobile};
      padding: ${t.menuItemPaddingMobile};
    `;
  },

  hover(t: Theme) {
    // Color with !important in purpose to override `a:hover`
    return css`
      background: ${t.menuItemHoverBg} !important;
      color: ${t.menuItemHoverColor} !important;
    `;
  },
  selected(t: Theme) {
    return css`
      background: ${t.menuItemSelectedBg} !important;
    `;
  },
  disabled(t: Theme) {
    return css`
      background: ${t.menuItemDisabledBg};
      color: ${t.menuItemDisabledColor};
      cursor: default;
    `;
  },
  nonSelectable() {
    return css`
      cursor: default;
    `;
  },
  link(t: Theme) {
    return css`
      color: ${t.menuItemLinkColor};
    `;
  },
  loose() {
    return css`
      padding-left: 15px;
    `;
  },
  withIconSmall(t: Theme) {
    return css`
      ${withIconSizeMixin(t.menuItemPaddingForIconSmall)}
    `;
  },
  withIconMedium(t: Theme) {
    return css`
      ${withIconSizeMixin(t.menuItemPaddingForIconMedium)}
    `;
  },
  withIconLarge(t: Theme) {
    return css`
      ${withIconSizeMixin(t.menuItemPaddingForIconLarge)}
    `;
  },
  comment(t: Theme) {
    return css`
      color: ${t.menuItemCommentColor};
      opacity: ${t.menuItemCommentOpacity};
      white-space: normal;
      padding-top: 4px;
    `;
  },
  commentHover(t: Theme) {
    return css`
      color: ${t.menuItemCommentColorHover};
      opacity: 0.6;
    `;
  },
  icon() {
    return css`
      display: inline-block;
      position: absolute;
      transform: translateY(0px); // icon shifts one pixel up in firefox on medium size without this property
    `;
  },
  iconSmall(t: Theme) {
    return css`
      ${iconSizeMixin(t.menuItemIconWidthSmall, t.menuItemPaddingXSmall)};
    `;
  },
  iconMedium(t: Theme) {
    return css`
      ${iconSizeMixin(t.menuItemIconWidthMedium, t.menuItemPaddingXMedium)};
    `;
  },
  iconLarge(t: Theme) {
    return css`
      ${iconSizeMixin(t.menuItemIconWidthLarge, t.menuItemPaddingXLarge)};
    `;
  },
  mobileContentWithIcon() {
    return css`
      margin-left: 8px;
    `;
  },
});

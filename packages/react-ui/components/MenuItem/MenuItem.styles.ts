import { Theme } from '../../lib/theming/Theme';
import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { resetButton } from '../../lib/styles/Mixins';

import { iconSizeMixin, menuItemSizeMixin, withIconSizeMixin } from './MenuItem.mixins';

export const getMenuItemPaddings = ({
  menuItemLegacyPaddingX,
  menuItemPaddingX,
  menuItemLegacyPaddingY,
  menuItemPaddingY,
}: Record<'menuItemLegacyPaddingX' | 'menuItemPaddingX' | 'menuItemLegacyPaddingY' | 'menuItemPaddingY', string>) => {
  const legacyPaddingX = parseFloat(menuItemLegacyPaddingX);
  const legacyPaddingY = parseFloat(menuItemLegacyPaddingY);

  const paddingX = legacyPaddingX !== 0 ? `${parseFloat(menuItemPaddingX) + legacyPaddingX}px` : menuItemPaddingX;
  const paddingY = legacyPaddingY !== 0 ? `${parseFloat(menuItemPaddingY) + legacyPaddingY}px` : menuItemPaddingY;

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
        t.menuItemLegacyPaddingX,
        t.menuItemPaddingXSmall,
        t.menuItemLegacyPaddingY,
        t.menuItemPaddingYSmall,
        t.menuItemLineHeightSmall,
        t.menuItemFontSizeSmall,
      )};
    `;
  },
  rootMedium(t: Theme) {
    return css`
      ${menuItemSizeMixin(
        t.menuItemLegacyPaddingX,
        t.menuItemPaddingXMedium,
        t.menuItemLegacyPaddingY,
        t.menuItemPaddingYMedium,
        t.menuItemLineHeightMedium,
        t.menuItemFontSizeMedium,
      )};
    `;
  },
  rootLarge(t: Theme) {
    return css`
      ${menuItemSizeMixin(
        t.menuItemLegacyPaddingX,
        t.menuItemPaddingXLarge,
        t.menuItemLegacyPaddingY,
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
      padding-left: ${t.menuItemPaddingForIconMedium};
    `;
  },
  withIconLarge(t: Theme) {
    return css`
      padding-left: ${t.menuItemPaddingForIconLarge};
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
  icon(t: Theme) {
    return css`
      display: inline-block;
      position: absolute;
      transform: translateY(${t.menuItemIconLegacyShift});
    `;
  },
  iconSmall(t: Theme) {
    return css`
      ${iconSizeMixin(t.menuItemIconWidthSmall, t.menuItemPaddingXSmall, t.menuItemIconLegacyMargin)};
    `;
  },
  iconMedium(t: Theme) {
    return css`
      ${iconSizeMixin(t.menuItemIconWidthMedium, t.menuItemPaddingXMedium, t.menuItemIconLegacyMargin)};
    `;
  },
  iconLarge(t: Theme) {
    return css`
      ${iconSizeMixin(t.menuItemIconWidthLarge, t.menuItemPaddingXLarge, t.menuItemIconLegacyMargin)};
    `;
  },
  mobileContentWithIcon() {
    return css`
      margin-left: 8px;
    `;
  },
});

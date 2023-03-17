import { Theme } from '../../lib/theming/Theme';
import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { resetButton } from '../../lib/styles/Mixins';

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
    const { paddingX, paddingY } = getMenuItemPaddings({
      menuItemLegacyPaddingX: t.menuItemLegacyPaddingX,
      menuItemPaddingX: t.menuItemPaddingX,
      menuItemLegacyPaddingY: t.menuItemLegacyPaddingY,
      menuItemPaddingY: t.menuItemPaddingY,
    });

    return css`
      ${resetButton()};

      cursor: pointer;
      display: ${t.menuItemDisplay};
      line-height: ${t.menuItemLineHeight};
      font-size: ${t.menuItemFontSize};
      padding: ${t.menuItemPaddingY} ${paddingX} ${paddingY} ${t.menuItemPaddingX};
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
  withIcon(t: Theme) {
    return css`
      padding-left: ${t.menuItemPaddingForIcon};
    `;
  },
  comment(t: Theme) {
    return css`
      color: ${t.menuItemCommentColor};
      opacity: ${t.menuItemCommentOpacity};
      white-space: normal;
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
      width: ${t.menuItemIconWidth};
      display: inline-block;
      position: absolute;
      left: ${parseInt(t.menuItemPaddingX) + parseInt(t.menuItemIconLegacyMargin)}px;
      transform: translateY(${t.menuItemIconLegacyShift});
    `;
  },
  mobileContentWithIcon() {
    return css`
      margin-left: 8px;
    `;
  },
});

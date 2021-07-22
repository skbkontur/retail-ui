import { Theme } from '../../lib/theming/Theme';
import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { resetButton } from '../../lib/styles/Mixins';

const styles = {
  root(t: Theme) {
    const legacyPaddingX = parseFloat(t.menuItemLegacyPaddingX);
    const legacyPaddingY = parseFloat(t.menuItemLegacyPaddingY);

    const paddingX = legacyPaddingX !== 0 ? `${parseFloat(t.menuItemPaddingX) + legacyPaddingX}px` : t.menuItemPaddingX;
    const paddingY = legacyPaddingY !== 0 ? `${parseFloat(t.menuItemPaddingY) + legacyPaddingY}px` : t.menuItemPaddingY;

    return css`
      ${resetButton()};

      cursor: pointer;
      display: block;
      line-height: ${t.menuItemLineHeight};
      font-size: ${t.menuItemFontSize};
      padding: ${t.menuItemPaddingY} ${paddingX} ${paddingY} ${t.menuItemPaddingX};
      position: relative;
      text-decoration: none;

      button& {
        min-width: 100%;
      }
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
      background: transparent;
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
      top: ${t.menuItemPaddingY};
      transform: translateY(${t.menuItemIconLegacyShift});
    `;
  },
};

export const jsStyles = memoizeStyle(styles);

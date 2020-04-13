import { Theme } from '../../lib/theming/Theme';
import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { resetButton } from '../../lib/styles/Mixins';

const styles = {
  root(t: Theme) {
    return css`
      ${resetButton()};

      cursor: pointer;
      display: block;
      line-height: ${t.menuItemLineHeight};
      padding: 6px 18px 7px 8px;
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
      background: ${t.menuItemDropdownMenuHoverBg};
      color: ${t.menuItemTextColorInvert} !important;
    `;
  },
  selected(t: Theme) {
    return css`
      background: ${t.menuItemDropdownMenuSelectedBg};
    `;
  },
  disabled(t: Theme) {
    return css`
      background: transparent;
      color: ${t.menuItemTextColorDisabled};
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
      & {
        padding-left: ${t.menuItemPaddingForIcon};
      }
    `;
  },
  comment() {
    return css`
      color: #a0a0a0;
      white-space: normal;
    `;
  },
  commentHover() {
    return css`
      color: #fff;
      opacity: 0.6;
    `;
  },
  icon() {
    return css`
      display: inline-block;
      position: absolute;
      left: 15px;
      top: 5px;
    `;
  },
};

export const jsStyles = memoizeStyle(styles);

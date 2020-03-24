import { Theme } from '../../lib/theming/Theme';
import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { resetButton } from '../../lib/styles/Mixins';

const styles = {
  root() {
    return css`
      ${resetButton()};

      cursor: pointer;
      display: block;
      line-height: 18px;
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
      background: ${t.dropdownMenuHoverBg};
      color: ${t.textColorInvert} !important;
    `;
  },
  selected(t: Theme) {
    return css`
      background: ${t.dropdownMenuSelectedBg};
    `;
  },
  disabled(t: Theme) {
    return css`
      background: transparent;
      color: ${t.textColorDisabled};
      cursor: default;
    `;
  },
  link(t: Theme) {
    return css`
      color: ${t.linkColor};
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

import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

const styles = {
  root(t: Theme) {
    return css`
      display: inline-block;
      position: relative;
    `;
  },

  placeholder(t: Theme) {
    return css`
      color: ${t.selectPlaceholderColor};
      text-overflow: ellipsis;
    `;
  },

  customUsePlaceholder() {
    return css`
      color: inherit;
      opacity: 0.7;
    `;
  },

  arrowWrap(t: Theme) {
    return css`
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      color: ${t.selectMenuArrowColor};
    `;
  },

  customUseArrow() {
    return css`
      border-top-color: inherit;
      color: inherit;
      opacity: 0.7;
    `;
  },

  label() {
    return css`
      box-sizing: border-box;
      display: inline-block;
      max-width: 100%;
      width: auto;
      position: relative;
    `;
  },

  labelText() {
    return css`
      display: inline-block;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      vertical-align: top;
      white-space: nowrap;
    `;
  },

  search() {
    return css`
      margin: 1px 4px 4px;
    `;
  },
};

export const jsStyles = memoizeStyle(styles);

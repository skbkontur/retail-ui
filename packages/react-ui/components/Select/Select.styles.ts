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
      color: ${t.selectMenuArrowColor};
      flex-shrink: 0;
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
      flex: 1 1 auto;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    `;
  },

  search() {
    return css`
      margin: 1px 4px 4px;
    `;
  },

  selectButtonContainer() {
    return css`
      width: 100%;
      display: inline-flex;
      justify-content: space-between;
    `;
  },
};

export const jsStyles = memoizeStyle(styles);

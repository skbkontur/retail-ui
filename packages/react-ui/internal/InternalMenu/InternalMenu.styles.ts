import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

const styles = {
  root(t: Theme) {
    return css`
      overflow: auto;
      padding: 5px 0;
      outline: none;
      background: ${t.bgDefault};
    `;
  },

  shadow() {
    return css`
      border: 1px solid #d5d5d5;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    `;
  },

  header() {
    return css`
      top: -5px;
      position: relative;
      z-index: 1;
      width: 100%;
      overflow: hidden;
      line-height: 18px;
      box-sizing: border-box;
      padding: 6px 18px 7px 8px;
    `;
  },

  footer() {
    return css`
      bottom: -5px;
      position: relative;
      z-index: 1;
      width: 100%;
      overflow: hidden;
      line-height: 18px;
      box-sizing: border-box;
      padding: 6px 18px 7px 8px;
    `;
  },

  fixedHeader() {
    return css`
      box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
    `;
  },

  fixedFooter() {
    return css`
      box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.1);
    `;
  },
};

export const jsStyles = memoizeStyle(styles);

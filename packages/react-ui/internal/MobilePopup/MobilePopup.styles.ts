import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

const styles = {
  root(t: Theme) {
    return css`
      width: 100%;
      height: 100%;
      flex-direction: column;
      display: flex;
      justify-content: flex-end;
      border-radius: ${t.mobilePopupBorderRadius};
      overflow: hidden;
      padding-bottom: 8px;
      background: ${t.menuBgDefault};
    `;
  },

  wrapper() {
    return css`
      position: fixed;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      overflow: auto;
      z-index: inherit;
    `;
  },

  content(t: Theme) {
    return css`
      background-color: ${t.bgDefault};
    `;
  },

  container(t: Theme) {
    return css`
      position: absolute;
      top: ${t.mobilePopupTopPadding};
      left: ${t.mobilePopupOuterIndentY};
      width: calc(100% - ${t.mobilePopupOuterIndentY} * 2);
      z-index: 100000;
    `;
  },

  bg() {
    return css`
      position: fixed;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      z-index: 9999;
      background: #333333;
      pointer-events: none;
      opacity: 50%;
    `;
  },

  bottomIndent() {
    return css`
      height: 80px;
    `;
  },
};

export const jsStyles = memoizeStyle(styles);

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
      border-radius: 16px;
      overflow: hidden;
      padding-bottom: 8px;
      background: ${t.menuBgDefault};
    `;
  },

  rootFullHeight(t: Theme) {
    return css`
      background-color: ${t.bgDefault};
      justify-content: flex-start;
      flex-grow: 1;
    `;
  },

  rootWithChildren() {
    return css`
      padding-bottom: 8px;
    `;
  },

  wrapper() {
    return css`
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      height: 100%;
      overflow: auto;
    `;
  },

  content(t: Theme) {
    return css`
      background-color: ${t.bgDefault};
    `;
  },

  container(t: Theme) {
    const indentY = '24px';
    return css`
      position: absolute;
      top: ${t.mobilePopupTopPadding};
      left: ${indentY};
      width: calc(100% - ${indentY} * 2);
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
      opacity: 0%;
      pointer-events: none;
    `;
  },

  bgShowed() {
    return css`
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

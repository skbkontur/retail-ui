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
      border-radius: ${t.mobilePopupHeaderBorderRadius};
    `;
  },

  rootFullHeight(t: Theme) {
    return css`
      background-color: ${t.bgDefault};
      justify-content: flex-start;
      flex-grow: 1;
    `;
  },

  content(t: Theme) {
    return css`
      overflow: auto;
      background-color: ${t.bgDefault};
    `;
  },

  container(t: Theme) {
    return css`
      position: fixed;
      top: ${t.mobilePopupTopPadding};
      right: 0;
      left: 0;
      bottom: 0;
      width: 100%;
      z-index: 100000;
      border-radius: ${t.mobilePopupHeaderBorderRadius};
      transform: translateY(100%);
      transition: transform 0.25s;
    `;
  },

  containerOpened() {
    return css`
      transform: translateY(0%);
      transition: transform 0.25s;
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
      opacity: 50%;
    `;
  },
};

export const jsStyles = memoizeStyle(styles);

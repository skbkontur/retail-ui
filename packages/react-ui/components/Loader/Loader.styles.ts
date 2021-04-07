import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

const styles = {
  active(t: Theme) {
    return css`
      ${styles.fillContainerPosition()};

      background: ${t.loaderBg};
    `;
  },

  fillContainerPosition() {
    return css`
      bottom: 0;
      left: 0;
      position: absolute;
      right: 0;
      top: 0;
    `;
  },

  loader() {
    return css`
      box-sizing: border-box;
      display: inline-block;
      position: relative;
      width: 100%;
      z-index: inherit;
    `;
  },

  spinnerContainer() {
    return css`
      display: block;
      margin: auto;
      text-align: center;
    `;
  },

  spinnerContainerSticky() {
    return css`
      ${styles.spinnerContainer()};

      position: fixed;

      &::before {
        content: ' ';
        display: inline-block;
        height: 100%;
        min-height: 100%;
        vertical-align: middle;
      }
    `;
  },

  spinnerContainerCenter() {
    return css`
      ${styles.spinnerContainer()};
      ${styles.fillContainerPosition()};

      &::before {
        content: ' ';
        display: inline-block;
        height: 100%;
        min-height: 100%;
        vertical-align: middle;
      }
    `;
  },

  spinnerComponentWrapper() {
    return css`
      display: inline-block;
    `;
  },
};

export const jsStyles = memoizeStyle(styles);

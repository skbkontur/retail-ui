import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

const styles = {
  active(t: Theme) {
    return css`
      ${styles.fillContainerPosition(t)};

      background: ${t.loaderBg};
    `;
  },

  fillContainerPosition(t: Theme) {
    return css`
      bottom: 0;
      left: 0;
      position: absolute;
      right: 0;
      top: 0;
    `;
  },

  loader(t: Theme) {
    return css`
      box-sizing: border-box;
      display: inline-block;
      position: relative;
      width: 100%;
      z-index: inherit;
    `;
  },

  spinnerContainer(t: Theme) {
    return css`
      display: block;
      margin: auto;
      text-align: center;
    `;
  },

  spinnerContainerSticky(t: Theme) {
    return css`
      ${styles.spinnerContainer(t)};

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

  spinnerContainerCenter(t: Theme) {
    return css`
      ${styles.spinnerContainer(t)};
      ${styles.fillContainerPosition(t)};

      &::before {
        content: ' ';
        display: inline-block;
        height: 100%;
        min-height: 100%;
        vertical-align: middle;
      }
    `;
  },
};

export const jsStyles = memoizeStyle(styles);

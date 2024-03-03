import { css, memoizeStyle } from '../../lib/theming/Emotion';

export const buttonLoadingIconStyles = memoizeStyle({
  buttonLoading() {
    return css`
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      border-radius: inherit;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10;
    `;
  },
});

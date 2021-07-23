import { css, memoizeStyle } from '../../lib/theming/Emotion';

export const styles = memoizeStyle({
  enter() {
    return css`
      transform: translateY(-40px);
    `;
  },
  enterActive() {
    return css`
      transition: transform 0.2s cubic-bezier(0.22, 0.61, 0.36, 1);
      transform: translateY(0);
    `;
  },
  exit() {
    return css`
      transform: translateY(0);
      opacity: 1;
    `;
  },
  exitActive() {
    return css`
      opacity: 0.01;
      transition: opacity 0.15s ease-out;
    `;
  },
});

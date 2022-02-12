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
});

import { Theme } from '../../lib/theming/Theme';
import { css, memoizeStyle } from '../../lib/theming/Emotion';

const styles = {
  mobileMenu(t: Theme) {
    return css`
      left: 0;
      position: fixed;
      bottom: 0;
      width: 100%;
      z-index: 100000;
      background-color: #fff;
      border-radius: ${t.mobileMenuHeaderBorderRadius};
      transform: translateY(100%);
    `;
  },

  mobileMenuOpened() {
    return css`
      transform: translateY(0%);
      transition: transform 0.25s;
    `;
  },

  bg() {
    return css`
      height: 100%;
      left: 0;
      position: fixed;
      top: 0;
      width: 100%;
      z-index: 9999;
      background: #333333;
      opacity: 50%;
    `;
  },
};

export const jsStyles = memoizeStyle(styles);

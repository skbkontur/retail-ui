import { Theme } from '../../lib/theming/Theme';
import { css, memoizeStyle } from '../../lib/theming/Emotion';

const styles = {
  mobileMenu(t: Theme) {
    return css`
      position: fixed;
      top: ${t.mobileMenuTopPadding};
      right: 0;
      left: 0;
      bottom: 0;
      width: 100%;
      z-index: 100000;
      border-radius: ${t.mobileMenuHeaderBorderRadius};
      transform: translateY(100%);
      transition: transform 0.25s;
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

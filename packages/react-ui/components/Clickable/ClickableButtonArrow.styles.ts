import { Theme } from '../../lib/theming/Theme';
import { css, memoizeStyle } from '../../lib/theming/Emotion';

export const buttonArrowStyles = memoizeStyle({
  buttonArrowIconRoot() {
    return css`
      position: absolute;
      height: 100%;
      top: 0;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: content-box;
    `;
  },
  buttonArrowIconRootSmall(t: Theme) {
    return css`
      padding: 0 ${t.btnWithIconPaddingLeftSmall} 0 ${t.btnWithIconPaddingLeftSmall};
      width: ${t.btnIconSizeSmall};
    `;
  },
  buttonArrowIconRootMedium(t: Theme) {
    return css`
      padding: 0 ${t.btnWithIconPaddingLeftMedium} 0 ${t.btnWithIconPaddingLeftMedium};
      width: ${t.btnIconSizeMedium};
    `;
  },
  buttonArrowIconRootLarge(t: Theme) {
    return css`
      padding: 0 ${t.btnWithIconPaddingLeftLarge} 0 ${t.btnWithIconPaddingLeftLarge};
      width: ${t.btnIconSizeLarge};
    `;
  },

  buttonArrowIconLeft() {
    return css`
      left: 0;
    `;
  },
});

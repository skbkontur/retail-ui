import { Theme } from '../../lib/theming/Theme';
import { css, memoizeStyle } from '../../lib/theming/Emotion';

export const buttonOutlineStyles = memoizeStyle({
  buttonOutline() {
    return css`
      border-radius: inherit;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    `;
  },
  buttonOutlineWarning(t: Theme) {
    return css`
      box-shadow: 0 0 0 ${t.btnOutlineWidth} ${t.btnBorderColorWarning},
        inset 0 0 0 ${t.btnInsetWidth} ${t.btnInsetColor};
    `;
  },
  buttonOutlineError(t: Theme) {
    return css`
      box-shadow: 0 0 0 ${t.btnOutlineWidth} ${t.btnBorderColorError}, inset 0 0 0 ${t.btnInsetWidth} ${t.btnInsetColor};
    `;
  },
});

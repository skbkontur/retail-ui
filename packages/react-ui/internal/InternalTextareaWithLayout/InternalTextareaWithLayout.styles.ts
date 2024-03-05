import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const styles = memoizeStyle({
  contentWrapper() {
    return css`
      display: inline-flex;
      align-items: flex-start;
    `;
  },
  focus(t: Theme) {
    return css`
      border-color: ${t.inputBorderColorFocus};
      box-shadow: ${t.inputFocusShadow};
      outline: none;
      z-index: 2;
    `;
  },
});

import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const styles = memoizeStyle({
  container() {
    return css`
      display: inline-flex;
      position: relative;
      font-size: inherit;
      flex: 100% 1 1;
    `;
  },
  inputMask(t: Theme) {
    return css`
      color: ${t.placeholderColor};
      pointer-events: none;
      font-size: inherit;
      z-index: 5;
      user-select: none;
    `;
  },
  inputMaskLeft() {
    return css`
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
    `;
  },
});

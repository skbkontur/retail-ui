import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';
import { resetButton } from '../../lib/styles/Mixins';

export const styles = memoizeStyle({
  wrapper(t: Theme) {
    return css`
      ${resetButton()}
      display: inline-block;
      position: relative;
      border-radius: 8px;
      color: ${t.closeIconColor};
      cursor: pointer;

      &:focus,
      &:hover {
        color: ${t.closeIconHoverColor};
      }
    `;
  },
  focus(t: Theme) {
    return css`
      &,
      &:focus {
        box-shadow: inset 0 0 0 1px ${t.borderColorFocus}, inset 0 0 0 2px ${t.outlineColorFocus};
      }
    `;
  },
  root() {
    return css`
      box-sizing: content-box;
      display: flex;
      width: 100%;
      height: 100%;
      align-items: center;
      justify-content: center;
    `;
  },
});

import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';
import { resetButton } from '../../lib/styles/Mixins';

export const styles = memoizeStyle({
  root(t: Theme) {
    return css`
      ${resetButton()}
      display: inline-block;
      position: relative;
      border-radius: 4px;
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
      box-shadow: inset 0 0 0 1px ${t.borderColorFocus}, inset 0 0 0 2px ${t.outlineColorFocus};
    `;
  },
  wrapper() {
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

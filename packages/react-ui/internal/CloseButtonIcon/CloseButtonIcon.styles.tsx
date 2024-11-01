import { css, memoizeStyle } from '../../lib/theming/Emotion';
import type { Theme } from '../../lib/theming/Theme';
import { resetButton } from '../../lib/styles/Mixins';

export const styles = memoizeStyle({
  root(t: Theme) {
    return css`
      ${resetButton()}
      display: inline-block;
      position: relative;
      border-radius: ${t.closeBtnIconBorderRadius};
      color: ${t.closeBtnIconColor};
      cursor: pointer;
      transition: color ${t.transitionDuration} ${t.transitionTimingFunction};

      &:enabled:focus,
      &:enabled:hover {
        color: ${t.closeBtnIconHoverColor};
      }
    `;
  },
  rootDisabled(t: Theme) {
    return css`
      color: ${t.closeBtnIconDisabledColor};
    `;
  },
  focus(t: Theme) {
    return css`
      box-shadow: ${t.closeBtnIconFocusShadow};
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
      pointer-events: none;
    `;
  },
});

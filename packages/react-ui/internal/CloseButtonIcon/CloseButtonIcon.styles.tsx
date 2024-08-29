import type { Emotion } from '@emotion/css/create-instance';

import { memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';
import { resetButton } from '../../lib/styles/Mixins';

export const getStyles = (emotion: Emotion) =>
  memoizeStyle({
    root(t: Theme) {
      return emotion.css`
        ${resetButton(emotion)}
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
      return emotion.css`
        color: ${t.closeBtnIconDisabledColor};
      `;
    },
    focus(t: Theme) {
      return emotion.css`
        box-shadow: ${t.closeBtnIconFocusShadow};
      `;
    },
    wrapper() {
      return emotion.css`
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

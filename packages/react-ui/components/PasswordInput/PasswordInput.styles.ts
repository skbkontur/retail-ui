import type { Emotion } from '@emotion/css/create-instance';

import { Theme } from '../../lib/theming/Theme';
import { memoizeStyle } from '../../lib/theming/Emotion';

export const getStyles = (emotion: Emotion) =>
  memoizeStyle({
    root() {
      return emotion.css`
        position: relative;
        display: inline-block;
        line-height: normal;

        input::-ms-clear,
        input::-ms-reveal {
          display: none;
        }
      `;
    },
    toggleVisibility(t: Theme) {
      return emotion.css`
        color: ${t.passwordInputVisibilityIconColor};
        cursor: pointer;
        opacity: ${t.passwordInputVisibilityIconOpacity};
        user-select: none;

        &:hover {
          color: ${t.passwordInputVisibilityIconHoverColor};
          opacity: ${t.passwordInputVisibilityIconHoverOpacity};
        }
      `;
    },
    capsLockDetector() {
      return emotion.css`
        display: inline-block;
        font-size: 9px;
        margin-right: 8px;
        color: #fff;
        cursor: default;
        background: #999;
        padding: 2px 5px;
        border-radius: 3px;
        z-index: 9;
        box-sizing: border-box;
        line-height: normal;

        &::before {
          content: 'CapsLock';
        }
      `;
    },
    iconWrapper() {
      return emotion.css`
        display: flex;
        align-items: center;
        justify-content: flex-end;
      `;
    },

    eyeWrapperSmall(t: Theme) {
      return emotion.css`
        min-width: ${t.inputIconSizeSmall};
      `;
    },

    eyeWrapperMedium(t: Theme) {
      return emotion.css`
        min-width: ${t.inputIconSizeMedium};
      `;
    },

    eyeWrapperLarge(t: Theme) {
      return emotion.css`
        min-width: ${t.inputIconSizeLarge};
      `;
    },
    icon() {
      return emotion.css`
        padding: 0;
        border: none;
        font: inherit;
        color: inherit;
        background-color: transparent;
        cursor: pointer;
      `;
    },
  });

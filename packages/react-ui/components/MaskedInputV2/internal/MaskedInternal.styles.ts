import type { Emotion } from '@emotion/css/create-instance';

import { memoizeGetStyles, prefix } from '../../../lib/theming/Emotion.js';
import type { Theme } from '../../../lib/theming/Theme.js';

export const globalClasses = prefix('masked-internal')({
  input: 'input',
  disabled: 'disabled',
  selected: 'selected',
  masked: 'masked',
  colored: 'colored',
});

export const getStyles = memoizeGetStyles(({ css }: Emotion) => ({
  input(t: Theme) {
    return css`
      color-scheme: ${t.inputColorScheme};

      &:-internal-autofill-selected {
        background-color: ${t.inputBg} !important;
        background-image: none !important;
        color: ${t.inputTextColor} !important;
      }

      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus {
        -webkit-box-shadow: 0 0 0 1000px ${t.inputBg} inset;
        box-shadow: 0 0 0 1000px ${t.inputBg} inset;
        -webkit-text-fill-color: ${t.inputTextColor} !important;
        color: ${t.inputTextColor} !important;
        /* Chrome иначе скрывает caret при autofill (color/currentColor). */
        caret-color: ${t.inputTextColor} !important;
        transition:
          background-color 0s 600000s,
          color 0s 600000s !important;
      }

      &:disabled {
        color: ${t.inputTextColorDisabled};

        &:-internal-autofill-selected {
          background-color: ${t.inputDisabledBg} !important;
        }

        &:-webkit-autofill,
        &:-webkit-autofill:hover,
        &:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0 1000px ${t.inputDisabledBg} inset;
          box-shadow: 0 0 0 1000px ${t.inputDisabledBg} inset;
        }
      }

      &.${globalClasses.masked} {
        color: transparent;
        -webkit-text-fill-color: transparent;
        caret-color: ${t.inputTextColor};

        &::selection {
          background-color: transparent !important;
          color: transparent !important;
          -webkit-text-fill-color: transparent !important;
        }

        /* Текст рисует MaskOverlay; браузер при autofill не должен перебивать fill-color. */
        &:-internal-autofill-selected {
          color: transparent !important;
          caret-color: ${t.inputTextColor} !important;
        }

        &:-webkit-autofill,
        &:-webkit-autofill:hover,
        &:-webkit-autofill:focus {
          -webkit-text-fill-color: transparent !important;
          color: transparent !important;
          /* Без этого caret становится transparent вместе с текстом и не мигает. */
          caret-color: ${t.inputTextColor} !important;
        }
      }
    `;
  },
  overlay() {
    return css`
      position: absolute;
      inset: 0;
      pointer-events: none;
      user-select: none;
      overflow: hidden;
      display: flex;
      align-items: center;
      z-index: 2;
    `;
  },
  typed(t: Theme) {
    return css`
      white-space: pre;
      color: ${t.inputTextColor};

      &.${globalClasses.disabled} {
        color: ${t.inputTextColorDisabled};
      }
    `;
  },
  mask(t: Theme) {
    return css`
      white-space: pre;
      color: ${t.inputTextColor};

      &.${globalClasses.colored} {
        color: ${t.inputPlaceholderColor};
      }

      &.${globalClasses.disabled} {
        color: ${t.inputTextColorDisabled};
      }
    `;
  },
  selectedSegment() {
    return css`
      background-color: #3390ff;
      color: #fff !important;
      -webkit-text-fill-color: #fff !important;
    `;
  },
}));

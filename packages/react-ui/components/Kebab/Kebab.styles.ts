import type { Emotion } from '@emotion/css/create-instance';

import { memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const getStyles = (emotion: Emotion) =>
  memoizeStyle({
    kebab(t: Theme) {
      return emotion.css`
        display: inline-flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        border: ${t.kebabBorder};
        box-sizing: border-box;
        border-radius: ${t.kebabBorderRadius};
        user-select: none;
        cursor: pointer;
        outline: 0;
        transition: background 0.12s ease-out;
        background: ${t.kebabBackground};

        &:hover {
          background: ${t.kebabBackgroundHover};
        }

        &:active {
          background: ${t.kebabBackgroundActive};
        }
      `;
    },

    kebabSmall(t: Theme) {
      return emotion.css`
        width: ${t.kebabSizeSmall};
        height: ${t.kebabSizeSmall};
      `;
    },

    kebabMedium(t: Theme) {
      return emotion.css`
        width: ${t.kebabSizeMedium};
        height: ${t.kebabSizeMedium};
      `;
    },

    kebabLarge(t: Theme) {
      return emotion.css`
        width: ${t.kebabSizeLarge};
        height: ${t.kebabSizeLarge};
      `;
    },

    focused(t: Theme) {
      return emotion.css`
        background: ${t.kebabBackgroundHover};
        border-color: ${t.borderColorFocus};
      `;
    },

    opened(t: Theme) {
      return emotion.css`
        background: ${t.kebabBackgroundActive} !important; // override kebab:hover style
        cursor: default;
      `;
    },

    disabled() {
      return emotion.css`
        cursor: default;

        &:hover {
          background: none;
        }
      `;
    },

    menu(t: Theme) {
      return emotion.css`
        overflow: hidden;
        border-radius: ${t.popupBorderRadius};
      `;
    },
  });

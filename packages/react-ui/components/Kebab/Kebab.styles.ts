import type { Emotion } from '@emotion/css/create-instance';

import { memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const getStyles = (emotion: Emotion) =>
  memoizeStyle({
    kebab(t: Theme) {
      return emotion.css`
        display: inline-block;
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

    kebab2022() {
      return emotion.css`
        display: inline-flex;
        align-items: center;
        justify-content: center;
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

    icon(t: Theme) {
      return emotion.css`
        color: ${t.kebabIconColor};
        line-height: 1;
      `;
    },

    iconsmall(t: Theme) {
      return emotion.css`
        margin-top: 2px;
        font-size: ${t.kebabIconSizeSmall};
      `;
    },

    iconmedium(t: Theme) {
      return emotion.css`
        margin-top: -1px;
        margin-left: 0.5px;
        font-size: ${t.kebabIconSizeMedium};
      `;
    },

    iconlarge(t: Theme) {
      return emotion.css`
        margin-top: -2px;
        margin-left: 1px;
        font-size: ${t.kebabIconSizeLarge};
      `;
    },

    menu(t: Theme) {
      return emotion.css`
        overflow: hidden;
        border-radius: ${t.popupBorderRadius};
      `;
    },
  });

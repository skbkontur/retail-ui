import type { Emotion } from '@emotion/css/create-instance';

import { memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const getStyles = (emotion: Emotion) =>
  memoizeStyle({
    active(t: Theme) {
      return emotion.css`
        border-radius: ${t.loaderBorderRadius};
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;

        background: ${t.loaderBg};
      `;
    },

    loader() {
      return emotion.css`
        box-sizing: border-box;
        display: inline-block;
        position: relative;
        width: 100%;
        z-index: inherit;
      `;
    },

    spinnerContainer() {
      return emotion.css`
        display: block;
        margin: auto;
        text-align: center;

        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;

        &::before {
          content: ' ';
          display: inline-block;
          height: 100%;
          min-height: 100%;
          vertical-align: middle;
        }
      `;
    },

    spinnerContainerSticky() {
      return emotion.css`
        position: fixed;
      `;
    },

    spinnerComponentWrapper() {
      return emotion.css`
        display: inline-block;
      `;
    },
  });

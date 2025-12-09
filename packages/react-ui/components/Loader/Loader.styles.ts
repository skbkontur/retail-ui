import type { Emotion } from '@emotion/css/types/create-instance';

import { memoizeGetStyles } from '../../lib/theming/Emotion';
import type { Theme } from '../../lib/theming/Theme';

export const getStyles = memoizeGetStyles(({ css }: Emotion) => ({
  active(t: Theme) {
    return css`
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
    return css`
      box-sizing: border-box;
      display: inline-block;
      position: relative;
      width: 100%;
      z-index: inherit;
    `;
  },

  spinnerContainer() {
    return css`
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
    return css`
      position: fixed;
    `;
  },

  spinnerComponentWrapper() {
    return css`
      display: inline-block;
    `;
  },
}));

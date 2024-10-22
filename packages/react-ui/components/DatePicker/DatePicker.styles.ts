import type { Emotion } from '@emotion/css/create-instance';

import { Theme } from '../../lib/theming/Theme';
import { memoizeStyle } from '../../lib/theming/Emotion';

export const getStyles = (emotion: Emotion) =>
  memoizeStyle({
    root() {
      return emotion.css`
        display: inline-block;
        position: relative;
        touch-action: none;
        line-height: normal;
      `;
    },
    calendarWrapper(t: Theme) {
      return emotion.css`
        background: ${t.calendarBg};
        box-shadow: ${t.pickerShadow};
        display: flex;
        flex-flow: column nowrap;
        font-size: 0;
        z-index: 1000;
        touch-action: none;
        border-radius: ${t.calendarBorderRadius};
      `;
    },
  });

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
        background: ${t.pickerBg};
        box-shadow: ${t.pickerShadow};
        display: inline-block;
        font-size: 0;
        z-index: 1000;
        touch-action: none;
        border-radius: ${t.pickerBorderRadius};
      `;
    },
    todayLinkWrapper(t: Theme) {
      return emotion.css`
        background-color: ${t.pickerTodayWrapperBgColor};
        border: none;
        border-top: ${t.pickerTodayWrapperBorderTop};
        color: ${t.linkColor};
        display: block;
        font-size: ${t.pickerTodayWrapperFontSize};
        padding-bottom: ${t.pickerTodayWrapperPaddingBottom};
        padding-top: ${t.pickerTodayWrapperPaddingTop};
        line-height: ${t.pickerTodayWrapperLineHeight};
        width: 100%;

        &:hover {
          background-color: ${t.pickerTodayWrapperHoverBgColor};
          cursor: pointer;
        }

        &:active {
          color: ${t.linkActiveColor};
        }
      `;
    },
  });

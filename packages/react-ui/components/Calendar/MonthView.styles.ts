import type { Emotion } from '@emotion/css/create-instance';

import { memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const getStyles = (emotion: Emotion) =>
  memoizeStyle({
    headerMonth(t: Theme) {
      return emotion.css`
        display: inline-block;
        padding: ${t.calendarMonthTitlePaddingTop} 0 ${t.calendarMonthTitlePaddingBottom};
      `;
    },

    headerYear(t: Theme) {
      return emotion.css`
        display: inline-block;
        position: absolute;
        right: 0;
        padding: ${t.calendarMonthTitlePaddingTop} 0 ${t.calendarMonthTitlePaddingBottom};
      `;
    },

    month(t: Theme) {
      const width = parseInt(t.calendarCellWidth) * 7;
      return emotion.css`
        position: absolute;
        width: ${width}px;
      `;
    },

    monthMobile() {
      return emotion.css`
        width: 100%;
      `;
    },

    header() {
      return emotion.css`
        position: relative;
      `;
    },

    headerSticky(t: Theme) {
      return emotion.css`
        background-color: ${t.calendarMonthHeaderStickedBgColor};
        z-index: 2;
      `;
    },

    monthTitle(t: Theme) {
      return emotion.css`
        border-bottom: 1px solid ${t.calendarMonthTitleBorderBottomColor};
        font-weight: ${t.dateSelectFontWeight};
        margin: 0 ${t.calendarMonthTitleMarginX} ${t.calendarMonthTitleMarginBottom};
        line-height: ${t.calendarMonthTitleLineHeight};
      `;
    },

    /* Note: this could've been
     * display: grid;
     * grid-template-columns: repeat(7, minmax(0, 1fr));
     */
    monthDayGrid(t: Theme) {
      return emotion.css`
        line-height: ${t.calendarCellLineHeight};
      display: flex;
      flex-direction: column;
      padding: ${t.calendarGridRowSpacing} 0px;
    `;
    },

    monthDayRow(t: Theme) {
      return emotion.css`
      display: flex;
      justify-content: space-between;

      & + & {
        margin-top: ${t.calendarGridRowSpacing};
      }
    `;
    },

    nativeSelect() {
      return emotion.css`
      position: absolute;
      top: -12px;
      right: 0;
      bottom: -8px;
      left: 0;
      cursor: pointer;
      appearance: none;
      opacity: 0;
      border: none;
      `;
    },
  });

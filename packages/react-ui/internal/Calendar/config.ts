import { Theme } from '../../lib/theming/Theme';
import { memo } from '../../lib/memo';

const getConfig = memo(
  (
    monthTitleLineHeight: string,
    monthTitlePaddingTop: string,
    monthTitlePaddingBottom: string,
    monthTitleMarginBottom: string,
    cellSize: string,
    wrapperHeight: string,
    monthMarginBottom: string,
    maxMonthsToAppendOnScroll: string,
  ) => {
    const monthTitleHeight =
      parseInt(monthTitleLineHeight) + parseInt(monthTitlePaddingTop) + parseInt(monthTitlePaddingBottom);
    return {
      DAY_SIZE: parseInt(cellSize),
      MONTH_TITLE_HEIGHT: monthTitleHeight,
      MONTH_TITLE_OFFSET_HEIGHT: monthTitleHeight + parseInt(monthTitleMarginBottom) + 1, // + 1px separator line
      WRAPPER_HEIGHT: parseInt(wrapperHeight),
      MONTH_BOTTOM_MARGIN: parseInt(monthMarginBottom),
      MAX_MONTHS_TO_APPEND_ON_SCROLL: parseInt(maxMonthsToAppendOnScroll),
    };
  },
);

export const themeConfig = (t: Theme) =>
  getConfig(
    t.calendarMonthTitleLineHeight,
    t.calendarMonthTitlePaddingTop,
    t.calendarMonthTitlePaddingBottom,
    t.calendarMonthTitleMarginBottom,
    t.calendarCellSize,
    t.calendarWrapperHeight,
    t.calendarMonthMarginBottom,
    t.calendarMaxMonthsToAppendOnScroll,
  );

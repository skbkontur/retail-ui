import type { Theme } from '../../lib/theming/Theme';
import { memo } from '../../lib/memo';

const getConfig = memo(
  (
    monthTitleLineHeight: string,
    monthTitlePaddingTop: string,
    monthTitlePaddingBottom: string,
    monthTitleMarginBottom: string,
    cellWidth: string,
    cellHeight: string,
    wrapperHeight: string,
    monthMarginBottom: string,
    maxMonthsToAppendOnScroll: string,
    calendarGridRowSpacing: string,
  ) => {
    const monthTitleHeight =
      parseInt(monthTitleLineHeight) + parseInt(monthTitlePaddingTop) + parseInt(monthTitlePaddingBottom);
    return {
      DAY_WIDTH: parseInt(cellWidth),
      DAY_HEIGHT: parseInt(cellHeight),
      MONTH_TITLE_HEIGHT: monthTitleHeight,
      MONTH_TITLE_OFFSET_HEIGHT: monthTitleHeight + parseInt(monthTitleMarginBottom) + 1, // + 1px separator line
      WRAPPER_HEIGHT: parseInt(wrapperHeight),
      MONTH_BOTTOM_MARGIN: parseInt(monthMarginBottom),
      MAX_MONTHS_TO_APPEND_ON_SCROLL: parseInt(maxMonthsToAppendOnScroll),
      CALENDAR_GRID_ROW_SPACING: parseInt(calendarGridRowSpacing),
    };
  },
);

export const themeConfig = (t: Theme) =>
  getConfig(
    t.calendarMonthTitleLineHeight,
    t.calendarMonthTitlePaddingTop,
    t.calendarMonthTitlePaddingBottom,
    t.calendarMonthTitleMarginBottom,
    t.calendarCellWidth,
    t.calendarCellHeight,
    t.calendarWrapperHeight,
    t.calendarMonthMarginBottom,
    t.calendarMaxMonthsToAppendOnScroll,
    t.calendarGridRowSpacing,
  );

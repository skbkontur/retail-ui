import { Theme } from '../../lib/theming/Theme';

export const config = {
  /**
   * DEPRECATED
   *
   * Day cell size
   */
  DAY_HEIGHT: 30,

  MONTH_TITLE_HEIGHT: 40,

  /**
   * DEPRECATED
   *
   * MONTH_TITLE_HEIGHT + MONTH_BOTTOM_MARGIN + 1px separator line
   *
   */
  MONTH_TITLE_OFFSET_HEIGHT: 51,

  /**
   * DEPRECATED
   *
   * Calendar height
   */
  WRAPPER_HEIGHT: 330,

  /**
   * DEPRECATED
   *
   * Margin between months
   */
  MONTH_BOTTOM_MARGIN: 10,

  /**
   * Maximal count of month appending on scrollTo method call
   * with large intervals
   */
  MAX_MONTHS_TO_APPEND_ON_SCROLL: 5,
};

export const themeConfig = (t: Theme) => {
  return {
    DAY_HEIGHT: parseInt(t.calendarDayHeight),
    MONTH_TITLE_HEIGHT: parseInt(t.calendarMonthTitleHeight),
    /*
      MONTH_TITLE_OFFSET_HEIGHT = MONTH_TITLE_HEIGHT + MONTH_BOTTOM_MARGIN + 1px separator line
   */
    MONTH_TITLE_OFFSET_HEIGHT: parseInt(t.calendarMonthTitleHeight) + parseInt(t.calendarMonthBottomMargin) + 1,
    WRAPPER_HEIGHT: parseInt(t.calendarWrapperHeight),
    MONTH_BOTTOM_MARGIN: parseInt(t.calendarMonthBottomMargin),
    MAX_MONTHS_TO_APPEND_ON_SCROLL: parseInt(t.calendarMaxMonthsToAppendOnScroll),
  };
};

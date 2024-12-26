import { ThemeFactory } from '../../lib/theming/ThemeFactory';
import { Theme } from '../../lib/theming/Theme';

export const getDateRangePickerTheme = (theme: Theme): Theme => {
  return ThemeFactory.create(
    {
      calendarBottomSeparatorBorder: 'none',
      calendarCellBg: 'transparent',
      calendarWrapperHeight: theme.calendarRangeWrapperHeight,
    },
    theme,
  );
};

export const getMobileDateRangePickerTheme = (theme: Theme): Theme => {
  return ThemeFactory.create(
    {
      calendarPaddingX: theme.mobileCalendarPaddingX,
      calendarCellWidth: theme.mobileCalendarCellWidth,
      calendarCellHeight: theme.mobileCalendarRangeCellHeight,
      calendarCellBorderRadius: theme.mobileCalendarCellBorderRadius,
      calendarCellFontSize: theme.mobileCalendarCellFontSize,
      calendarGridRowSpacing: theme.mobileCalendarRangeGridRowSpacing,
      dateSelectFontSize: theme.mobileDateSelectFontSize,
      dateSelectLineHeight: theme.mobileDateSelectLineHeight,
      calendarWrapperHeight: theme.mobileCalendarRangeWrapperHeight,
    },
    theme,
  );
};

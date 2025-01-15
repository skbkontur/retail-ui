import { ThemeFactory } from '../../lib/theming/ThemeFactory';
import { Theme } from '../../lib/theming/Theme';

export const getDateRangePickerTheme = (theme: Theme): Theme => {
  return ThemeFactory.create(
    {
      calendarBottomSeparatorBorder: 'none',
      calendarCellBg: 'transparent',
      calendarWrapperHeight: theme.rangeCalendarWrapperHeight,
    },
    theme,
  );
};

export const getMobileDateRangePickerTheme = (theme: Theme): Theme => {
  return ThemeFactory.create(
    {
      calendarCellBg: 'transparent',
      calendarCellBorderRadius: theme.mobileCalendarCellBorderRadius,
      calendarCellFontSize: theme.mobileCalendarCellFontSize,
      calendarGridRowSpacing: theme.mobileRangeCalendarGridRowSpacing,
      calendarPaddingX: theme.mobileCalendarPaddingX,
      calendarCellWidth: theme.mobileRangeCalendarCellWidth,
      calendarCellHeight: theme.mobileRangeCalendarCellHeight,
      calendarWrapperHeight: theme.mobileRangeCalendarWrapperHeight,
      dateSelectFontSize: theme.mobileDateSelectFontSize,
      dateSelectLineHeight: theme.mobileDateSelectLineHeight,
    },
    theme,
  );
};

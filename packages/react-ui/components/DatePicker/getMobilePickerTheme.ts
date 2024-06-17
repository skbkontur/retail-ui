import { ThemeFactory } from '../../lib/theming/ThemeFactory';
import { Theme } from '../../lib/theming/Theme';

export const getMobilePickerTheme = (theme: Theme): Theme => {
  return ThemeFactory.create(
    {
      calendarPaddingX: theme.mobileCalendarPaddingX,
      calendarCellWidth: theme.mobileCalendarCellWidth,
      calendarCellHeight: theme.mobileCalendarCellHeight,
      calendarCellBorderRadius: theme.mobileCalendarCellBorderRadius,
      calendarCellFontSize: theme.mobileCalendarCellFontSize,
      calendarGridRowSpacing: theme.mobileCalendarGridRowSpacing,
      dateSelectFontSize: theme.mobileDateSelectFontSize,
      dateSelectLineHeight: theme.mobileDateSelectLineHeight,
      calendarWrapperHeight: theme.mobileCalendarWrapperHeight,
    },
    theme,
  );
};

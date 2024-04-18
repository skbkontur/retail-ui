import React, { useContext } from 'react';

import { useLocaleForControl } from '../../lib/locale/useLocaleForControl';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { cx } from '../../lib/theming/Emotion';
import { isTheme2022 } from '../../lib/theming/ThemeHelpers';
import { DatePickerLocaleHelper } from '../DatePicker/locale';
import { InternalDate } from '../../lib/date/InternalDate';
import { LocaleContext } from '../../lib/locale';
import { getVisualStateDataAttributes } from '../../internal/CommonWrapper/getVisualStateDataAttributes';

import * as CDS from './CalendarDateShape';
import { styles } from './DayCellView.styles';
import { CalendarDataTids } from './Calendar';

export interface CalendarDayProps extends React.HTMLAttributes<HTMLButtonElement> {
  isToday: boolean;
  isSelected: boolean;
  isDisabled: boolean;
  isWeekend: boolean;
  date: CDS.CalendarDateShape;
}

export const CalendarDay: React.FC<CalendarDayProps> = ({
  isToday,
  isSelected,
  isDisabled,
  isWeekend,
  date,
  children,
  className,
  ...rest
}) => {
  const theme = useContext(ThemeContext);
  const _isTheme2022 = isTheme2022(theme);

  const locale = useLocaleForControl('Calendar', DatePickerLocaleHelper);
  const { langCode } = useContext(LocaleContext);
  const ariaLabel = `${locale.dayCellChooseDateAriaLabel}: ${new InternalDate({ langCode })
    .setComponents({ ...date }, true)
    .toA11YFormat()}`;

  const day = children ?? date.date;

  return (
    <button
      data-tid={CalendarDataTids.dayCell}
      aria-label={ariaLabel}
      tabIndex={-1}
      disabled={isDisabled}
      className={cx(
        {
          [styles.baseCell(theme)]: true,
          [styles.dayCell(theme)]: true,
          [styles.today(theme)]: isToday && !_isTheme2022,
          [styles.selected(theme)]: isSelected,
          [styles.weekend(theme)]: Boolean(isWeekend),
        },
        className,
      )}
      {...getVisualStateDataAttributes({ selected: isSelected })}
      {...rest}
    >
      <span className={cx({ [styles.todayCaption2022(theme)]: isToday && _isTheme2022 })}>{day}</span>
    </button>
  );
};

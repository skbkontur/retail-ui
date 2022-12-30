import React, { RefObject, useContext } from 'react';

import { cx } from '../../lib/theming/Emotion';
import { forwardRefAndName } from '../../lib/forwardRefAndName';
import { useLocaleForControl } from '../../lib/locale/useLocaleForControl';
import { InternalDateGetter } from '../../lib/date/InternalDateGetter';
import { InternalDate } from '../../lib/date/InternalDate';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { DatePickerLocaleHelper } from '../DatePicker/locale';
import { Calendar as CalendarInternal } from '../../internal/Calendar';

import { CalendarProps } from './Calendar';
import { styles } from './Calendar.styles';
import { handleSelectToday } from './calendarHelpers';

export interface CalendarTodayLinkProps extends Pick<CalendarProps, 'onSelect'>, Pick<CalendarProps, '_isDatePicker'> {
  /**
   * Рефка календаря
   */
  calendarRef: RefObject<CalendarInternal>;
}

export const CalendarTodayLink = forwardRefAndName<HTMLButtonElement, CalendarTodayLinkProps>(
  'CalendarTodayLink',
  ({ onSelect, calendarRef, _isDatePicker }, ref) => {
    const theme = useContext(ThemeContext);

    const locale = useLocaleForControl('DatePicker', DatePickerLocaleHelper);
    const internalDateToday = new InternalDate({ order: locale.order, separator: locale.separator }).setComponents(
      InternalDateGetter.getTodayComponents(),
    );

    return (
      <button
        ref={ref}
        data-tid="Picker__todayWrapper"
        className={cx({
          [styles.todayLinkWrapper(theme)]: true,
          [styles.todayLinkSeparator(theme)]: _isDatePicker,
        })}
        onClick={handleSelectToday(internalDateToday, onSelect, calendarRef)}
        tabIndex={-1}
      >
        {`${locale.today} ${internalDateToday.toString({ withPad: true, withSeparator: true })}`}
      </button>
    );
  },
);

import React, { useContext } from 'react';

import { ThemeContext } from '../../lib/theming/ThemeContext';

import { styles } from './DayCellView.styles';
import { CalendarContext } from './CalendarContext';
import * as CalendarUtils from './CalendarUtils';
import { DayCellViewModel } from './DayCellViewModel';
import * as CDS from './CalendarDateShape';
import { CalendarDay, CalendarDayProps } from './CalendarDay';

export interface DayCellViewProps {
  date: DayCellViewModel;
}

export const DayCellView = (props: DayCellViewProps) => {
  const { date } = props;
  const { date: day, month: nativeMonth, year } = date;
  const { value, minDate, maxDate, isHoliday, renderDay, today, onDateClick } = useContext(CalendarContext);
  const theme = useContext(ThemeContext);

  const handleClick = () => {
    onDateClick?.(date);
  };

  const humanDate = CDS.create(day, CalendarUtils.getMonthInHumanFormat(nativeMonth), year);
  const humanDateString = CDS.toString(humanDate);

  const dayProps: CalendarDayProps = {
    isToday: Boolean(today && CDS.isEqual(date, today)),
    isSelected: Boolean(value && CDS.isEqual(date, value)),
    isDisabled: !CDS.isBetween(date, minDate, maxDate),
    isWeekend: isHoliday?.(humanDateString, date.isWeekend) ?? date.isWeekend,
    date: humanDate,
  };

  const dayElement = renderDay?.(dayProps) ?? <CalendarDay {...dayProps} />;

  return (
    <div onClick={handleClick} className={styles.cell(theme)}>
      {dayElement}
    </div>
  );
};

import React, { useContext } from 'react';

import { ThemeContext } from '../../lib/theming/ThemeContext';
import { InternalDateTransformer } from '../../lib/date/InternalDateTransformer';

import { styles } from './DayCellView.styles';
import { CalendarContext } from './CalendarContext';
import type { DayCellViewModel } from './DayCellViewModel';
import * as CDS from './CalendarDateShape';
import type { CalendarDayProps } from './CalendarDay';
import { CalendarDay } from './CalendarDay';

export interface DayCellViewProps {
  date: DayCellViewModel;
}

export const DayCellView = (props: DayCellViewProps) => {
  const { date } = props;
  const { value, minDate, maxDate, isHoliday, renderDay, today, onDateClick } = useContext(CalendarContext);
  const theme = useContext(ThemeContext);

  const handleClick = () => {
    onDateClick?.(date);
  };

  const humanDateString = InternalDateTransformer.dateToHumanString(date);

  const dayProps: CalendarDayProps = {
    isToday: Boolean(today && CDS.isEqual(date, today)),
    isSelected: Boolean(value && CDS.isEqual(date, value)),
    isDisabled: !CDS.isBetween(date, minDate, maxDate),
    isWeekend: isHoliday?.(humanDateString, date.isWeekend) ?? date.isWeekend,
    date: humanDateString,
  };

  const dayElement = renderDay?.(dayProps) ?? <CalendarDay {...dayProps} />;

  return (
    <div onClick={handleClick} className={styles.cell(theme)}>
      {dayElement}
    </div>
  );
};

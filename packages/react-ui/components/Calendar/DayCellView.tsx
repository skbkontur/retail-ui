import React, { useContext } from 'react';

import { InternalDateTransformer } from '../../lib/date/InternalDateTransformer';
import { cx } from '../../lib/theming/Emotion';
import { ThemeContext } from '../../lib/theming/ThemeContext';

import { styles } from './DayCellView.styles';
import { CalendarContext } from './CalendarContext';
import * as CalendarUtils from './CalendarUtils';
import { DayCellViewModel } from './DayCellViewModel';
import { isBetween, isEqual } from './CalendarDateShape';
import { CalendarDay, CalendarDayProps } from './CalendarDay';

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

  const stringDate = InternalDateTransformer.dateToInternalString({
    date: date.date,
    month: CalendarUtils.getMonthInHumanFormat(date.month),
    year: date.year,
  });

  const dayProps: CalendarDayProps = {
    isToday: Boolean(today && isEqual(date, today)),
    isSelected: Boolean(value && isEqual(date, value)),
    isDisabled: !isBetween(date, minDate, maxDate),
    isWeekend: isHoliday?.(stringDate, date.isWeekend) ?? date.isWeekend,
    date,
  };

  const dayElement = renderDay?.(dayProps) ?? <CalendarDay {...dayProps} />;

  return (
    <div onClick={handleClick} className={cx(styles.cell(theme))}>
      {dayElement}
    </div>
  );
};

import React from 'react';

import { Nullable } from '../../typings/utility-types';

import * as CDS from './CalendarDateShape';
import { CalendarDay, CalendarDayProps } from './CalendarDay';

import type { CalendarProps } from '.';

interface DayCellViewProps {
  date: CDS.CalendarDateShape;
  today?: CDS.CalendarDateShape;
  value?: Nullable<CDS.CalendarDateShape>;
  minDate?: CDS.CalendarDateShape;
  maxDate?: CDS.CalendarDateShape;
  onDateClick?: (day: CDS.CalendarDateShape) => void;
  isWeekend?: boolean;
  renderDay?: CalendarProps['renderDay'];
}

export const DayCellView: React.FC<DayCellViewProps> = (props) => {
  const { date, minDate, maxDate, today, value, isWeekend, onDateClick, renderDay } = props;

  const handleClick = () => {
    const { date, month, year } = props.date;
    onDateClick?.({ date, month, year });
  };

  const dayProps: CalendarDayProps = {
    isToday: Boolean(today && CDS.isEqual(date, today)),
    isSelected: Boolean(value && CDS.isEqual(date, value)),
    isDisabled: !CDS.isBetween(date, minDate, maxDate),
    isWeekend: Boolean(isWeekend),
    date,
  };

  const dayElement = renderDay?.(dayProps) ?? <CalendarDay {...dayProps} />;

  return React.isValidElement<CalendarDayProps>(dayElement)
    ? React.cloneElement<CalendarDayProps>(dayElement, {
        onClick: (e) => {
          dayElement.props.onClick?.(e);
          handleClick();
        },
      })
    : dayElement;
};

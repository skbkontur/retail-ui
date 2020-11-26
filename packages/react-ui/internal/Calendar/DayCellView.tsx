import React, { useContext } from 'react';
import cn from 'classnames';

import { Nullable } from '../../typings/utility-types';
import { ThemeContext } from '../../lib/theming/ThemeContext';

import * as CDS from './CalendarDateShape';
import { jsStyles } from './DayCellView.styles';

interface DayCellViewProps {
  date: CDS.CalendarDateShape;
  today?: CDS.CalendarDateShape;
  value?: Nullable<CDS.CalendarDateShape>;
  minDate?: CDS.CalendarDateShape;
  maxDate?: CDS.CalendarDateShape;
  onDateClick?: (day: CDS.CalendarDateShape) => void;
  isWeekend?: boolean;
}

export function DayCellView(props: DayCellViewProps) {
  const { date, minDate, maxDate, today, value, isWeekend, onDateClick } = props;
  const theme = useContext(ThemeContext);

  const handleClick = () => {
    const { date, month, year } = props.date;
    onDateClick?.({ date, month, year });
  };

  const cellStyle = {
    width: theme.calendarDayHeight,
    height: theme.calendarDayHeight,
    margin: ` 0 ${theme.calendarDayMarginRight} ${theme.calendarDayMarginBottom} 0`,
    lineHeight: parseInt(theme.calendarDayHeight) - 2 + 'px',
    borderRadius: parseInt(theme.calendarDayHeight) / 2,
  };

  return (
    <button
      style={cellStyle}
      tabIndex={-1}
      disabled={!CDS.isBetween(date, minDate, maxDate)}
      className={cn({
        [jsStyles.cell(theme)]: true,
        [jsStyles.today(theme)]: Boolean(today && CDS.isEqual(date, today)),
        [jsStyles.selected(theme)]: Boolean(value && CDS.isEqual(date, value)),
        [jsStyles.weekend(theme)]: Boolean(isWeekend),
      })}
      onClick={handleClick}
    >
      {date.date}
    </button>
  );
}

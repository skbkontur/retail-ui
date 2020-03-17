import React, { useContext } from 'react';
import cn from 'classnames';

import { Nullable } from '../../typings/utility-types';
import { ThemeContext } from '../../lib/theming/ThemeContext';

import * as CDS from './CalendarDateShape';
import { config } from './config';
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

const size = config.DAY_HEIGHT;

const cellStyle = {
  width: size,
  height: size,
  lineHeight: size - 2 + 'px',
  borderRadius: size / 2,
};

export function DayCellView(props: DayCellViewProps) {
  const { date, minDate, maxDate, today, value, isWeekend, onDateClick } = props;
  const theme = useContext(ThemeContext);

  const handleClick = () => {
    const { date, month, year } = props.date;
    onDateClick?.({ date, month, year });
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

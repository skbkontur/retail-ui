import React, { useContext } from 'react';

import { Nullable } from '../../typings/utility-types';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { cx } from '../../lib/theming/Emotion';

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

  return (
    <button
      tabIndex={-1}
      disabled={!CDS.isBetween(date, minDate, maxDate)}
      className={cx({
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

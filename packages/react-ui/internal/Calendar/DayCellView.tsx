import React, { useContext } from 'react';

import { Nullable } from '../../typings/utility-types';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { cx } from '../../lib/theming/Emotion';

import * as CDS from './CalendarDateShape';
import { styles } from './DayCellView.styles';

interface DayCellViewProps {
  date: CDS.CalendarDateShape;
  today?: CDS.CalendarDateShape;
  value?: Nullable<CDS.CalendarDateShape>;
  minDate?: CDS.CalendarDateShape;
  maxDate?: CDS.CalendarDateShape;
  onDateClick?: (day: CDS.CalendarDateShape) => void;
  isWeekend?: boolean;
  renderItem: (date: CDS.CalendarDateShape) => React.ReactNode | number;
}

export function DayCellView(props: DayCellViewProps) {
  const { date, minDate, maxDate, today, value, isWeekend, onDateClick, renderItem } = props;
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
        [styles.cell(theme)]: true,
        [styles.today(theme)]: Boolean(today && CDS.isEqual(date, today)),
        [styles.selected(theme)]: Boolean(value && CDS.isEqual(date, value)),
        [styles.weekend(theme)]: Boolean(isWeekend),
      })}
      onClick={handleClick}
    >
      {renderItem(date)}
    </button>
  );
}

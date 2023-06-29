import React, { useContext } from 'react';

import { Nullable } from '../../typings/utility-types';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { cx } from '../../lib/theming/Emotion';
import { isTheme2022 } from '../../lib/theming/ThemeHelpers';

import * as CDS from './CalendarDateShape';
import { globalClasses, styles } from './DayCellView.styles';

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
  const _isTheme2022 = isTheme2022(theme);

  const handleClick = () => {
    const { date, month, year } = props.date;
    onDateClick?.({ date, month, year });
  };

  const child = _isTheme2022 ? (
    <span className={cx(globalClasses.todayCaption, styles.todayCaption())}>{date.date}</span>
  ) : (
    date.date
  );

  const isToday = Boolean(today && CDS.isEqual(date, today));

  return (
    <button
      tabIndex={-1}
      disabled={!CDS.isBetween(date, minDate, maxDate)}
      className={cx({
        [styles.cell(theme)]: true,
        [styles.today(theme)]: isToday && !_isTheme2022,
        [styles.today2022()]: isToday && _isTheme2022,
        [styles.selected(theme)]: Boolean(value && CDS.isEqual(date, value)),
        [styles.weekend(theme)]: Boolean(isWeekend),
      })}
      onClick={handleClick}
    >
      {child}
    </button>
  );
}

import React, { useContext } from 'react';

import { Nullable } from '../../typings/utility-types';
import { cx } from '../../lib/theming/Emotion';
import { ThemeContext } from '../../lib/theming/ThemeContext';

import * as CDS from './CalendarDateShape';
import { config } from './config';
import styles from './DayCellView.module.less';
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
      className={cx({
        [styles.cell]: true,
        [jsStyles.cell(theme)]: true,
        [jsStyles.today(theme)]: !!today && !!CDS.isEqual(date, today),
        [jsStyles.selected(theme)]: !!value && !!CDS.isEqual(date, value),
        [jsStyles.weekend(theme)]: !!isWeekend,
      })}
      onClick={handleClick}
    >
      {date.date}
    </button>
  );
}

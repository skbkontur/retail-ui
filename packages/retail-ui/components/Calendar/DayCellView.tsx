import classNames from 'classnames';
import * as React from 'react';
import * as CDS from './CalendarDateShape';

import config from './config';

import classes = require('./DayCellView.less');

interface DayCellViewProps {
  date: CDS.CalendarDateShape;
  today?: CDS.CalendarDateShape;
  value?: Nullable<CDS.CalendarDateShape>;
  minDate?: CDS.CalendarDateShape;
  maxDate?: CDS.CalendarDateShape;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isWeekend?: boolean;
}

export const DayCellView = ({
  date,
  minDate,
  maxDate,
  today,
  value,
  isWeekend,
  onClick
}: DayCellViewProps) => (
  <button
    style={styles.cell}
    tabIndex={-1}
    disabled={!CDS.isBetween(date, minDate, maxDate)}
    name={`${date.date}.${date.month}.${date.year}`}
    className={classNames({
      [classes.cell]: true,
      [classes.weekend]: isWeekend,
      [classes.today]: today && CDS.isEqual(date, today),
      [classes.selected]: value && CDS.isEqual(date, value)
    })}
    onClick={onClick}
  >
    {date.date}
  </button>
);

const styles = {
  cell: {
    width: config.DAY_HEIGHT,
    height: config.DAY_HEIGHT,
    lineHeight: config.DAY_HEIGHT - 2 + 'px',
    borderRadius: config.DAY_HEIGHT / 2
  }
};

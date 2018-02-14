// @flow
import classNames from 'classnames';
import * as React from 'react';
import * as CDS from './CalendarDateShape';

import config from './config';

import classes from './DayCellView.less';

type Props = {
  date: CDS.CalendarDateShape,
  today?: CDS.CalendarDateShape,
  value?: ?CDS.CalendarDateShape,
  minDate?: CDS.CalendarDateShape,
  maxDate?: CDS.CalendarDateShape,
  onClick?: (event: SyntheticEvent<HTMLButtonElement>) => void,
  isWeekend?: boolean
};

export const DayCellView = ({
  date,
  minDate,
  maxDate,
  today,
  value,
  isWeekend,
  onClick
}: Props) => {
  return (
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
};

const styles = {
  cell: {
    width: config.DAY_HEIGHT,
    height: config.DAY_HEIGHT,
    lineHeight: config.DAY_HEIGHT - 2 + 'px',
    borderRadius: config.DAY_HEIGHT / 2
  }
};

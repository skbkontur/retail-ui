import classNames from 'classnames';
import * as React from 'react';
import * as CDS from './CalendarDateShape';

import config from './config';

import styles from './DayCellView.less';
import { Nullable } from '../../typings/utility-types';

interface DayCellViewProps {
  date: CDS.CalendarDateShape;
  today?: CDS.CalendarDateShape;
  value?: Nullable<CDS.CalendarDateShape>;
  minDate?: CDS.CalendarDateShape;
  maxDate?: CDS.CalendarDateShape;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isWeekend?: boolean;
}

const cellStyle = {
  width: config.DAY_HEIGHT,
  height: config.DAY_HEIGHT,
  lineHeight: config.DAY_HEIGHT - 2 + 'px',
  borderRadius: config.DAY_HEIGHT / 2,
};

export const DayCellView = ({ date, minDate, maxDate, today, value, isWeekend, onClick }: DayCellViewProps) => (
  <button
    style={cellStyle}
    tabIndex={-1}
    disabled={!CDS.isBetween(date, minDate, maxDate)}
    name={`${date.date}.${date.month}.${date.year}`}
    className={classNames({
      [styles.cell]: true,
      [styles.weekend]: isWeekend,
      [styles.today]: today && CDS.isEqual(date, today),
      [styles.selected]: value && CDS.isEqual(date, value),
    })}
    onClick={onClick}
  >
    {date.date}
  </button>
);

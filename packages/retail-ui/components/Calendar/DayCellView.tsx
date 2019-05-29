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
  onDateClick?: (day: CDS.CalendarDateShape) => void;
  isWeekend?: boolean;
}

const cellStyle = {
  width: config.DAY_HEIGHT,
  height: config.DAY_HEIGHT,
  lineHeight: config.DAY_HEIGHT - 2 + 'px',
  borderRadius: config.DAY_HEIGHT / 2,
};

export class DayCellView extends React.PureComponent<DayCellViewProps, {}> {
  public render() {
    const { date, minDate, maxDate, today, value, isWeekend } = this.props;

    return (
      <button
        style={cellStyle}
        tabIndex={-1}
        disabled={!CDS.isBetween(date, minDate, maxDate)}
        className={classNames({
          [styles.cell]: true,
          [styles.weekend]: isWeekend,
          [styles.today]: today && CDS.isEqual(date, today),
          [styles.selected]: value && CDS.isEqual(date, value),
        })}
        onClick={this.handleClick}
      >
        {date.date}
      </button>
    );
  }

  private handleClick = (): void => {
    const { onDateClick } = this.props;
    if (!onDateClick) {
      return;
    }
    const { date, month, year } = this.props.date;
    onDateClick({ date, month, year });
  }
}

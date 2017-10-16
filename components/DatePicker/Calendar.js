// @flow

import classNames from 'classnames';
import * as React from 'react';

import styles from './Calendar.less';

import Cell from './CalendarCell';
import { formatDate } from './utils';

const MONTH_NAMES = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь'
];
const DAY = 24 * 60 * 60 * 1000;
const WEEK = 7 * DAY;
const FIRST_WEEK_SHIFT = (new Date(0).getUTCDay() - 1) * DAY;
const DAY_HEIGHT = 30;
const CALENDAR_HEIGHT = 331;

type Props = {
  initialDate: Date,
  value: ?Date,
  onNav: (date: Date) => void,
  onPick: (date: Date) => void
};

type State = {
  pos: number
};

export default class Calendar extends React.Component<Props, State> {
  constructor(props: Props, context: mixed) {
    super(props, context);

    this.state = {
      pos: dateToPos(props.initialDate)
    };
  }

  render() {
    const { value, onPick, minYear, maxYear } = this.props;

    let offset = this.state.pos % DAY_HEIGHT;
    if (offset < 0) {
      offset += DAY_HEIGHT;
    }
    const from = (this.state.pos - offset) / DAY_HEIGHT * WEEK - FIRST_WEEK_SHIFT;
    const week = getWeek(from);

    // const months = [];
    // let monthStart = new Date(from);
    // monthStart.setUTCDate(1);
    //
    // for (let i = 0; i < 4; ++i) {
    //   const monthEnd = new Date(monthStart.getTime());
    //   monthEnd.setUTCMonth(monthEnd.getUTCMonth() + 1);
    //   const y = getDayTop(week, offset, +monthStart);
    //   const height = getDayTop(week, offset, +monthEnd) - y;
    //   const style = {
    //     top: y,
    //     height
    //   };
    //   const monthClass = classNames({
    //     [styles.month]: true,
    //     [styles.first]: monthStart.getUTCMonth() === 0
    //   });
    //   const top = Math.max(0, -y);
    //   const wrapperStyle = {
    //     position: 'relative',
    //     top,
    //     display: top > height ? 'none' : 'block',
    //     opacity: top > height / 3 ? 0 : 1,
    //     transition: 'opacity 0.2s ease-out'
    //   };
    //   months.push(
    //     <div key={+monthStart} className={monthClass} style={style}>
    //       <div style={wrapperStyle}>
    //         {MONTH_NAMES[monthStart.getUTCMonth()]}
    //         <div className={styles.year}>
    //           {monthStart.getUTCFullYear()}
    //         </div>
    //       </div>
    //     </div>
    //   );
    //
    //   monthStart = monthEnd;
    // }
    //
    const cells = [];
    const cellCount = Math.ceil((CALENDAR_HEIGHT + offset) / DAY_HEIGHT) * 7;
    for (let i = 0; i < cellCount; ++i) {
      const cur = from + i * DAY;
      const curWeek = getWeek(cur);
      const date = new Date(cur);

      const cellProps = {
        date,
        weekIdx: curWeek - week,
        offset,
        value,
        onPick,
        minYear,
        maxYear
      };
      cells.push(<Cell key={cur} {...cellProps} />);
    }

    const now = new Date();
    const today = <button className={styles.today} onClick={() => this.moveToDate(now)}>Сегодня {formatDate(now)}</button>;

    return (
      <div className={styles.root} tabIndex="0" onWheel={this.handleWheel}>
        {cells}
        {/*{months}*/}
        {today}
      </div>
    );
  }

  moveToDate(date: Date) {
    const newDate = new Date(0);
    newDate.setUTCFullYear(date.getUTCFullYear());
    newDate.setUTCMonth(date.getUTCMonth());
    this.setState({ pos: dateToPos(newDate) });
  }

  handleWheel = (event: SyntheticWheelEvent<>) => {
    event.preventDefault();
    let deltaY = event.deltaY;
    if (event.deltaMode === 1) {
      deltaY *= DAY_HEIGHT;
    } else if (event.deltaMode === 2) {
      deltaY *= DAY_HEIGHT * 4;
    }

    const pos = this.state.pos + deltaY;
    this.setState({ pos });

    const date = posToDate(pos);
    date.setUTCDate(date.getUTCDate() + 6);
    this.props.onNav(date);
  };
}

function dateToPos(date) {
  return (Math.floor((+date - FIRST_WEEK_SHIFT - DAY) / WEEK) - 1) * DAY_HEIGHT;
}

function posToDate(pos) {
  return new Date(Math.floor(pos / DAY_HEIGHT + 2) * WEEK - FIRST_WEEK_SHIFT);
}

function getWeek(time) {
  return Math.floor((FIRST_WEEK_SHIFT + time) / WEEK);
}

function getDayTop(fromWeek, offset, time) {
  return (getWeek(time) - fromWeek) * DAY_HEIGHT - offset;
}

import React, { Component } from 'react';
import classNames from 'classnames';
import styles from './Calendar.less';

const DAY_WIDTH = 26;
const DAY_HEIGHT = 31;
const FIRST_CELL_OFFSET = 6;
const HOLIDAYS_OFFSET = 3;

export default class CalendarCell extends Component {
  constructor(props) {
    super(props);

    this._today = new Date();
  }

  render() {
    const { date, weekIdx, offset, value } = this.props;

    const day = getDay(date);
    const isHolyday = date.getUTCDay() === 0 || date.getUTCDay() === 6;

    const y = weekIdx * DAY_HEIGHT - offset;
    let x = day * DAY_WIDTH + FIRST_CELL_OFFSET;
    let width = DAY_WIDTH;
    if (day === 0) {
      x = 0;
      width += FIRST_CELL_OFFSET;
    }
    if (day === 5) {
      width += HOLIDAYS_OFFSET;
    }
    if (day === 6) {
      x += HOLIDAYS_OFFSET;
    }
    const style = { left: x, top: y, width, height: DAY_HEIGHT };

    const cellClass = classNames({
      [styles.cell]: true,
      [styles.cellToday]: this._isToday(date),
      [styles.cellCurrent]: isSameDate(value, date),
      [styles.grey]: date.getUTCMonth() % 2,
      [styles.cellHoly]: isHolyday
    });

    return (
      <span className={cellClass} style={style}>
        <div
          className={styles.cellInner}
          onMouseOver={this.activate}
          onMouseLeave={this.deactivate}
          onClick={this.pick}
        >
          {date.getUTCDate()}
        </div>
      </span>
    );
  }

  _isToday(date) {
    return isSameDate(date, this._today);
  }

  pick = event => {
    if (event.button !== 0) {
      return;
    }

    if (this.props.onPick) {
      this.props.onPick(this.props.date);
    }
  };
}

function isSameDate(a, b) {
  return (
    a &&
    b &&
    a.getUTCFullYear() === b.getUTCFullYear() &&
    a.getUTCMonth() === b.getUTCMonth() &&
    a.getUTCDate() === b.getUTCDate()
  );
}

function getDay(date) {
  const day = date.getUTCDay();
  return day ? day - 1 : 6;
}

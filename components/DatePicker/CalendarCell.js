import React, { Component } from 'react';
import classNames from 'classnames';
import styles from './CalendarCell.less';

const DAY_WIDTH = 30;
const DAY_HEIGHT = 30;
const LEFT_OFFSET = 15;

export default class CalendarCell extends Component {
  render() {
    const { date, weekIdx, offset, value, minYear, maxYear } = this.props;

    const day = getDay(date);
    const isHoliday = date.getUTCDay() === 0 || date.getUTCDay() === 6;
    const isDisabled = isOutOfRange(date, minYear, maxYear);

    const y = weekIdx * DAY_HEIGHT - offset;
    let x = day * DAY_WIDTH + LEFT_OFFSET;
    const style = { left: x, top: y, width: DAY_WIDTH, height: DAY_HEIGHT };

    const cellClass = classNames({
      [styles.cell]: true,
      [styles.today]: this._isToday(date),
      [styles.current]: isSameDate(value, date),
      [styles.holiday]: isHoliday,
      [styles.disabled]: isDisabled
    });

    return (
      <span
        className={cellClass}
        style={style}
        onClick={isDisabled ? null : this.pick}
      >
          {date.getUTCDate()}
      </span>
    );
  }

  _isToday(date) {
    return isSameDate(date, new Date());
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

function isOutOfRange(date, minYear, maxYear) {
  const year = date.getUTCFullYear();
  return (minYear && year < minYear) || (maxYear && year > maxYear);
}

function getDay(date) {
  const day = date.getUTCDay();
  return day ? day - 1 : 6;
}

import React, { Component } from 'react';
import { getDay } from './utils';
import classNames from 'classnames';
import styles from './CalendarCell.less';

const DAY_WIDTH = 30;
const DAY_HEIGHT = 30;
const LEFT_OFFSET = 15;

export default class CalendarCell extends Component {
  render() {
    const { rowIdx, ownDate, chosenDate, minYear, maxYear } = this.props;

    const isHoliday = ownDate.getUTCDay() === 0 || ownDate.getUTCDay() === 6;
    const isDisabled = isOutOfRange(ownDate, minYear, maxYear);

    const cellClass = classNames({
      [styles.cell]: true,
      [styles.today]: this._isToday(ownDate),
      [styles.current]: isSameDate(chosenDate, ownDate),
      [styles.holiday]: isHoliday,
      [styles.disabled]: isDisabled
    });

    const y = rowIdx * DAY_HEIGHT;
    let x = getDay(ownDate) * DAY_WIDTH + LEFT_OFFSET;
    const cellStyle = { left: x, top: y, width: DAY_WIDTH, height: DAY_HEIGHT };

    const cellProps = {
      className: cellClass,
      style: cellStyle
    };
    if (!isDisabled) {
      cellProps.onClick = this.pick;
    }

    return (
      <span {...cellProps}>
        {ownDate.getUTCDate()}
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
      this.props.onPick(this.props.ownDate);
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

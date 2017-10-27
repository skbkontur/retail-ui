// @flow

import classNames from 'classnames';
import * as React from 'react';

import ReactList from 'react-list';
import Cell from './CalendarCell';

import { getDay, getLastDayOfMonth } from './utils';
import getScrollWidth from '../../lib/dom/getScrollWidth';
import throttle from 'lodash.throttle';

import styles from './Calendar.less';

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
const DAY_HEIGHT = 30;
const MONTH_NAME_HEIGHT = 39;
const MONTH_BOTTOM_OFFSET = 17;

type Props = {
  initialDate: Date,
  maxYear: number,
  minYear: number,
  value: ?Date,
  onNav: (date: Date) => void,
  onPick: (date: Date) => void
};

export default class Calendar extends React.Component<Props, State> {
  render() {
    const { initialDate, minYear, maxYear } = this.props;

    const hidingScrollBar = {
      paddingRight: 30,
      marginRight: -(30 + getScrollWidth())
    };

    return (
      <div className={styles.root} tabIndex="0">
        <div
          className={styles.inner}
          style={hidingScrollBar}
          onScroll={this.handleScroll}
        >
          <ReactList
            initialIndex={this.dateToIndex(initialDate)}
            itemRenderer={this.renderItem}
            itemSizeGetter={this.getItemSize}
            length={12 * (maxYear - minYear)}
            ref={this.getListRef}
            type="variable"
          />
        </div>
      </div>
    );
  }

  renderMonth = monthStart => {
    const year = monthStart.getUTCFullYear();
    const month = monthStart.getUTCMonth();

    const monthClass = classNames({
      [styles.month]: true,
      [styles.first]: month === 0
    });

    const monthCellsStyle = {
      height: getMonthHeight(monthStart)
    };

    return (
      <div key={`${month}_${year}`} className={monthClass}>
        <div className={styles.monthName}>
          {MONTH_NAMES[month]}
          <span className={styles.year}>{year}</span>
        </div>
        <div className={styles.monthCells} style={monthCellsStyle}>
          {this.renderCells(year, month)}
        </div>
      </div>
    );
  }

  renderCells = (year, month) => {
    const { chosenDate, onPick, minYear, maxYear } = this.props;

    const daysAmount = getLastDayOfMonth(year, month);
    const firstDay = new Date(Date.UTC(year, month, 1));
    const firstWeekOffset = getDay(firstDay);

    const cells = [];
    for (let i = 1; i < daysAmount + 1; ++i) {
      const ownDate = new Date(Date.UTC(year, month, i));
      const cellProps = {
        key: Number(ownDate),
        rowIdx: Math.floor((firstWeekOffset + i - 1) / 7),
        ownDate,
        chosenDate,
        onPick,
        minYear,
        maxYear
      };
      cells.push(<Cell {...cellProps} />);
    }
    return cells;
  }

  renderItem = index => {
    const monthStart = this.indexToDate(index);
    return this.renderMonth(monthStart);
  }

  getItemSize = index => {
    const firstDay = this.indexToDate(index);
    return getMonthHeight(firstDay) + MONTH_NAME_HEIGHT + MONTH_BOTTOM_OFFSET;
  }

  handleScroll = throttle(() => {
    if (!this.props.onNav || !this.list) {
      return;
    }
    const [firstIndex] = this.list.getVisibleRange();
    if (!firstIndex) {
      return;
    }
    this.props.onNav(this.indexToDate(firstIndex));
  }, 200)

  moveToDate = date => {
    this.list.scrollTo(this.dateToIndex(date));
  }

  dateToIndex(date) {
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth();
    return (year - this.props.minYear) * 12 + month;
  }

  indexToDate(index) {
    const month = index % 12;
    const year = this.props.minYear + Math.floor(index / 12);
    return new Date(Date.UTC(year, month, 1));
  }

  getListRef = ref => {
    this.list = ref;
  }
}

function getMonthHeight(firstDay) {
  const firstWeekOffset = getDay(firstDay);
  const lastDayOfMonth = new Date(firstDay.getUTCFullYear(), firstDay.getUTCMonth() + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const rowsAmount = Math.ceil((daysInMonth + firstWeekOffset) / 7);
  return rowsAmount * DAY_HEIGHT;
}

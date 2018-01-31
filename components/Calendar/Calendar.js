// @flow
import * as React from 'react';
import classNames from 'classnames';
import normalizeWheel from 'normalize-wheel';

import config from './config';
import * as CalendarUtils from './CalendarUtils';
import { Animation } from './Animation';
import { CalendarDate } from './CalendarDate';
import { CalendarMonth } from './CalendarMonth';

import DateSelect from '../DateSelect';

import classes from './Calendar.less';

export type CalendarDateShape = { year: number, month: number, date: number };

type Props = {
  initialMonth?: number,
  initialYear?: number,
  onSelect?: (date: CalendarDate) => void,
  maxDate?: CalendarDateShape,
  minDate?: CalendarDateShape
};

type State = {
  scrollPosition: number,
  months: CalendarMonth[],
  today: CalendarDate
};

const getTodayDate = () => {
  const date = new Date();
  return CalendarDate.create(
    date.getDate(),
    date.getMonth(),
    date.getFullYear()
  );
};

class Calendar extends React.Component<Props, State> {
  _animating;
  _timeout;
  _unmounted;

  _animation = Animation();

  constructor(props: Props) {
    super(props);

    const today = getTodayDate();

    const initialMonth =
      props.initialMonth == null ? today.month : props.initialMonth;
    const initialYear =
      props.initialYear == null ? today.year : props.initialYear;

    this.state = {
      scrollPosition: 0,
      months: CalendarUtils.getMonths(initialMonth, initialYear),
      today
    };
  }

  componentWillUnmount() {
    if (this._timeout) {
      clearTimeout(this._timeout);
    }
    if (this._animating) {
      this._animating = false;
      this._unmounted = true;
    }
  }

  /**
   * @public
   * Scrolls calendar to given date
   */
  scrollToMonth(month: number, year: number) {
    this._scrollToMonth(month, year);
  }

  render() {
    const { scrollPosition, months } = this.state;
    const positions = [scrollPosition - months[0].height];

    for (let i = 1; i < months.length; i++) {
      const position = positions[i - 1] + months[i - 1].height;
      positions.push(position);
    }

    return (
      <div className={classes.root} onWheel={this._handleWheel}>
        <div style={styles.wrapper} className={classes.wrapper}>
          {months
            .map((x, i) => [positions[i], x])
            .filter(tupple => CalendarUtils.isMonthVisible(...tupple))
            .map(this._renderMonth, this)}
        </div>
      </div>
    );
  }

  _renderCell(date: CalendarDate) {
    const minDate =
      this.props.minDate && CalendarUtils.shapeToDate(this.props.minDate);
    const maxDate =
      this.props.maxDate && CalendarUtils.shapeToDate(this.props.maxDate);
    return (
      <button
        key={date.date}
        style={styles.cell}
        tabIndex={-1}
        disabled={!date.isBetween(minDate, maxDate)}
        className={classNames({
          [classes.cell]: true,
          [classes.weekend]: date.isWeekend,
          [classes.today]: date.isEqual(this.state.today)
        })}
        onClick={() => this._handleSelect(date)}
      >
        {date.date}
      </button>
    );
  }

  _renderMonth([top, month]) {
    const isTopNegative = top <= 0;
    const isHeaderSticked = isTopNegative && month.height > -top;

    const headerTop = isHeaderSticked
      ? Math.min(-top, month.height - config.MONTH_TITLE_HEIGHT)
      : 0;

    const alpha = isHeaderSticked
      ? (month.height + top - config.MONTH_TITLE_HEIGHT) / 10
      : 1;

    const borderBottomColor = `rgba(223, 222, 222, ${alpha})`;

    const isYearVisible = month.isFirstInYear || isHeaderSticked;
    const yearTop =
      isHeaderSticked && !month.isLastInYear ? -headerTop - top : 0;

    return (
      <div
        className={classes.month}
        style={{ top }}
        key={month.month + '-' + month.year}
      >
        <div
          style={{ ...styles.monthTitle, top: headerTop, borderBottomColor }}
          className={classNames({
            [classes.monthTitle]: true,
            [classes.headerSticked]: isHeaderSticked
          })}
        >
          <div className={classes.headerMonth}>
            <DateSelect
              disabled={top > 25}
              width={85}
              type="month"
              value={month.month}
              onChange={m => this.scrollToMonth(m, month.year)}
            />
          </div>
          {isYearVisible && (
            <div className={classes.headerYear} style={{ top: yearTop }}>
              <DateSelect
                disabled={top > 25}
                width={50}
                type="year"
                value={month.year}
                minYear={
                  this.props.minDate ? this.props.minDate.year : undefined
                }
                maxYear={
                  this.props.maxDate ? this.props.maxDate.year : undefined
                }
                onChange={y => this.scrollToMonth(month.month, y)}
              />
            </div>
          )}
        </div>
        <div
          style={{ width: month.offset * config.DAY_HEIGHT }}
          className={classes.placeholder}
        />
        {month.days.map(this._renderCell, this)}
      </div>
    );
  }

  _handleSelect = date => {
    const { onSelect } = this.props;
    if (onSelect) {
      onSelect(date);
    }
  };

  _handleWheel = (event: SyntheticWheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    const { pixelY } = normalizeWheel(event);
    this.setState(CalendarUtils.applyDelta(pixelY), this._handleWheelEnd);
  };

  _handleWheelEnd = () => {
    if (this._timeout) {
      clearTimeout(this._timeout);
    }
    if (this._animating) {
      this._animating = false;
    }

    this._timeout = setTimeout(this._scrollToNearestWeek, 300);
  };

  _scrollToNearestWeek = () => {
    const { scrollPosition } = this.state;
    const offset = scrollPosition - config.MONTH_TITLE_OFFSET_HEIGHT;
    const weeksCount = Math.max(Math.round(offset / config.DAY_HEIGHT), 1);
    if (scrollPosition < config.MONTH_TITLE_OFFSET_HEIGHT / 2) {
      this._scrollTo(0);
    } else {
      this._scrollTo(
        Math.abs(weeksCount) * config.DAY_HEIGHT +
          config.MONTH_TITLE_OFFSET_HEIGHT
      );
    }
  };

  _scrollToMonth = (month: number, year: number) => {
    if (this._animation.isAnimating()) {
      this._animation
        .animationPromise()
        .then(() => this._scrollToMonth(month, year));
      return;
    }

    const minDate =
      this.props.minDate && CalendarUtils.shapeToDate(this.props.minDate);
    if (minDate && minDate.isGreater(CalendarDate.create(32, month, year))) {
      this._scrollToMonth(minDate.month, minDate.year);
      return;
    }

    const maxDate =
      this.props.maxDate && CalendarUtils.shapeToDate(this.props.maxDate);
    if (maxDate && maxDate.isLess(CalendarDate.create(0, month, year))) {
      this._scrollToMonth(maxDate.month, maxDate.year);
      return;
    }

    const currentMonth = this.state.months[1];
    const diffInMonths =
      currentMonth.month + currentMonth.year * 12 - month - year * 12;

    const maxMonthsToAdd = config.MAX_MONTHS_TO_APPEND_ON_SCROLL;

    const onEnd = () =>
      new Promise(resolve =>
        this.setState(
          {
            months: CalendarUtils.getMonths(month, year),
            scrollPosition: 0
          },
          resolve
        )
      );

    const isYearChanges = state =>
      state.months[1].year !== year &&
      // if diff in months is 2 or less,
      // either year is not changing either months already
      // have right isFirstInYear/isLastInYear flags
      Math.abs(diffInMonths) > 2;

    // If scrolling upwards, prepend maximum maxMonthsToAdd months
    // and scroll to the first month
    if (diffInMonths > 0) {
      const monthsToPrependCount = Math.min(
        Math.abs(diffInMonths) - 1,
        maxMonthsToAdd
      );
      const monthsToPrepend = Array.from(
        { length: monthsToPrependCount },
        (_, index) => CalendarMonth.create(month + index, year)
      );
      this.setState(
        state => {
          const yearChanges = isYearChanges(state);
          if (yearChanges) {
            // Mutating here can lead to some unexpected bugs
            // but we couldn't find any yet
            state.months[0].isFirstInYear = true;
            if (monthsToPrepend.length) {
              // Mutating item here is safe as it was just created
              monthsToPrepend[monthsToPrepend.length - 1].isLastInYear = true;
            }
          }
          return {
            months: monthsToPrepend.concat(state.months),
            scrollPosition: -CalendarUtils.getMonthsHeight(monthsToPrepend)
          };
        },
        () => {
          const targetPosition = this.state.months[0].height;
          this._scrollTo(targetPosition, onEnd);
        }
      );
    }

    // If scrolling downwards, append maximum maxMonthsToAdd months
    // and scroll to the last but one month
    if (diffInMonths < 0) {
      const monthsToAppendCount = Math.min(
        Math.abs(diffInMonths),
        maxMonthsToAdd
      );
      const monthsToAppend = Array.from(
        { length: monthsToAppendCount },
        (_, index) =>
          CalendarMonth.create(month + index - monthsToAppendCount + 2, year)
      );
      this.setState(
        state => {
          if (isYearChanges(state)) {
            // Mutating here can lead to some unexpected bugs
            // but we couldn't find any yet
            state.months[state.months.length - 1].isLastInYear = true;
            // Mutating item here is safe as it was just created
            monthsToAppend[0] && (monthsToAppend[0].isFirstInYear = true);
          }
          return { months: state.months.concat(monthsToAppend) };
        },
        () => {
          const targetPosition =
            -1 * CalendarUtils.getMonthsHeight(this.state.months.slice(1, -2));
          this._scrollTo(targetPosition, onEnd);
        }
      );
    }
  };

  _scrollTo = (pos: number, cb?: () => Promise<void>) => {
    const scrollAmmount = pos - this.state.scrollPosition;
    return this._scrollAmount(scrollAmmount, cb);
  };

  _scrollAmount = (scrollAmmount, cb) => {
    const onFrameEnd = resolve =>
      this.setState(
        state => ({ scrollPosition: Math.round(state.scrollPosition) }),
        resolve
      );
    const applyDelta = deltaY => state => ({
      scrollPosition: state.scrollPosition + deltaY
    });
    return this._animation.animate(
      scrollAmmount,
      deltaY =>
        new Promise(resolve =>
          this.setState(applyDelta(deltaY), () => onFrameEnd(resolve))
        ),
      { onFinish: cb, duration: 400 }
    );
  };
}

const styles = {
  wrapper: {
    height: config.WRAPPER_HEIGHT
  },
  header: {
    lineHeight: config.MONTH_TITLE_HEIGHT + 'px'
  },
  cell: {
    width: config.DAY_HEIGHT,
    height: config.DAY_HEIGHT,
    lineHeight: config.DAY_HEIGHT - 2 + 'px',
    borderRadius: config.DAY_HEIGHT / 2
  },
  monthTitle: {
    lineHeight: config.MONTH_TITLE_HEIGHT + 'px'
  }
};

export default Calendar;

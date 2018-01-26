// @flow
import * as React from 'react';
import classNames from 'classnames';
import normalizeWheel from 'normalize-wheel';

import config from './config';
import * as CalendarUtils from './CalendarUtils';
import { SmoothScrollFactory } from './SmoothScroll';

import DateSelect from '../DateSelect';

import classes from './Calendar.less';

type Props = {
  initialMonth?: number,
  initialYear?: number,
  onSelect?: (date: CalendarUtils.CalendarDate) => void,
  maxDate?: CalendarUtils.CalendarDate,
  minDate?: CalendarUtils.CalendarDate
};

type State = {
  scrollPosition: number,
  months: CalendarUtils.MonthConfig[],
  today: CalendarUtils.CalendarDate
};

const getTodayDate = () => {
  const date = new Date();
  return {
    date: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear()
  };
};

class Calendar extends React.Component<Props, State> {
  _animating;
  _timeout;

  _smoothScroll = SmoothScrollFactory(12, deltaY => {
    this.setState(CalendarUtils.applyDelta(deltaY), this._handleWheelEnd);
  });

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

  /**
   * @api
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
            .map((x, i) => ({ ...x, top: positions[i] }))
            .filter(CalendarUtils.isMonthVisible)
            .map(this._renderMonth, this)}
        </div>
      </div>
    );
  }

  _renderCell({ isWeekend, day, date }) {
    return (
      <button
        key={day}
        style={styles.cell}
        tabIndex={-1}
        disabled={
          !CalendarUtils.isDateBetween(
            date,
            this.props.minDate,
            this.props.maxDate
          )
        }
        className={classNames({
          [classes.cell]: true,
          [classes.weekend]: isWeekend,
          [classes.today]: CalendarUtils.isSameDate(date, this.state.today)
        })}
        onClick={() => this._handleSelect(date)}
      >
        {day}
      </button>
    );
  }

  _renderMonth({
    top,
    offset = 0,
    title,
    cells,
    year,
    month,
    height,
    isFirstInYear,
    isLastInYear
  }) {
    const isTopNegative = top <= 0;
    const isHeaderSticked = isTopNegative && height > -top;

    const headerTop = isHeaderSticked
      ? Math.min(-top, height - config.MONTH_TITLE_HEIGHT)
      : 0;

    const alpha = isHeaderSticked
      ? (height + top - config.MONTH_TITLE_HEIGHT) / 10
      : 1;

    const borderBottomColor = `rgba(223, 222, 222, ${alpha})`;

    const isYearVisible = isFirstInYear || isHeaderSticked;
    const yearTop = isHeaderSticked && !isLastInYear ? -headerTop - top : 0;

    return (
      <div className={classes.month} style={{ top }} key={month + '-' + year}>
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
              value={month}
              onChange={m => this.scrollToMonth(m, year)}
            />
          </div>
          {isYearVisible && (
            <div className={classes.headerYear} style={{ top: yearTop }}>
              <DateSelect
                disabled={top > 25}
                width={50}
                type="year"
                value={year}
                minYear={
                  this.props.minDate ? this.props.minDate.year : undefined
                }
                maxYear={
                  this.props.maxDate ? this.props.maxDate.year : undefined
                }
                onChange={y => this.scrollToMonth(month, y)}
              />
            </div>
          )}
        </div>
        <div
          style={{ width: offset * config.DAY_HEIGHT }}
          className={classes.placeholder}
        />
        {cells.map(this._renderCell, this)}
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
    const { minDate, maxDate } = this.props;
    if (
      minDate &&
      CalendarUtils.isGreater(minDate, { date: 32, month, year })
    ) {
      this._scrollToMonth(minDate.month, minDate.year);
      return;
    }
    if (maxDate && CalendarUtils.isLess(maxDate, { date: 0, month, year })) {
      this._scrollToMonth(maxDate.month, maxDate.year);
      return;
    }

    const currentMonth = this.state.months[1];
    const diffInMonths =
      currentMonth.month + currentMonth.year * 12 - month - year * 12;

    const maxMonthsToAdd = config.MAX_MONTHS_TO_APPEND_ON_SCROLL;

    const onEnd = () => {
      this.setState({
        months: CalendarUtils.getMonths(month, year),
        scrollPosition: 0
      });
    };

    const isYearChanges = state =>
      state.months[1].year !== year &&
      // if diff in months is 2 or less,
      // either year is not changing either months already
      // have right isFirstInYear/isLastInYear flags
      Math.abs(diffInMonths) > 2;

    // If scrolling upwards, prepend maximum 2 months
    // and scroll to the first month
    if (diffInMonths > 0) {
      const monthsToPrependCount = Math.min(
        Math.abs(diffInMonths) - 1,
        maxMonthsToAdd
      );
      const monthsToPrepend = Array.from(
        { length: monthsToPrependCount },
        (_, index) => CalendarUtils.getMonth(month + index, year)
      );
      this.setState(
        state => {
          const yearChanges = isYearChanges(state);

          if (monthsToPrepend.length) {
            // Mutating item here is safe as it was just created
            monthsToPrepend[monthsToPrepend.length - 1].isLastInYear =
              yearChanges ||
              monthsToPrepend[monthsToPrepend.length - 1].isLastInYear;
          }

          const currentMonths = [
            {
              ...state.months[0],
              isFirstInYear: yearChanges || state.months[0].isFirstInYear
            },
            ...state.months.slice(1)
          ];

          return {
            months: monthsToPrepend.concat(currentMonths),
            scrollPosition: -CalendarUtils.getMonthsHeight(monthsToPrepend)
          };
        },
        () => {
          const targetPosition = this.state.months[0].height;
          this._scrollTo(targetPosition, onEnd);
        }
      );
    }

    // If scrolling downwards, append maximum 2 month
    // and scroll to the last but one month
    if (diffInMonths < 0) {
      const monthsToAppendCount = Math.min(
        Math.abs(diffInMonths),
        maxMonthsToAdd
      );
      const monthsToAppend = Array.from(
        { length: monthsToAppendCount },
        (_, index) =>
          CalendarUtils.getMonth(month + index - monthsToAppendCount + 2, year)
      );
      this.setState(
        state => {
          const yearChanges = isYearChanges(state);

          const currentMonths = state.months.slice(0, -1).concat({
            ...state.months[state.months.length - 1],
            isLastInYear:
              yearChanges || state.months[state.months.length - 1].isLastInYear
          });

          // Mutating item here is safe as it was just created
          monthsToAppend[0].isFirstInYear =
            yearChanges || monthsToAppend[0].isFirstInYear;

          return { months: currentMonths.concat(monthsToAppend) };
        },
        () => {
          const targetPosition =
            -1 * CalendarUtils.getMonthsHeight(this.state.months.slice(1, -2));
          this._scrollTo(targetPosition, onEnd);
        }
      );
    }
  };

  _scrollTo = (pos: number, cb?: () => void) => {
    const scrollAmmount = pos - this.state.scrollPosition;
    return this._scrollAmount(scrollAmmount, cb);
  };

  _scrollAmount = (scrollAmmount, cb) => {
    if (this._animating) {
      return;
    }

    this._animating = true;

    const startTime = Date.now();
    const duration = 600;

    let lastEaseValue = 0;

    const animate = () => {
      const t = Math.min((Date.now() - startTime) / duration, 1);
      const easing = CalendarUtils.ease(t) * scrollAmmount;
      const deltaY = lastEaseValue - easing;
      lastEaseValue = easing;
      this.setState(
        state => ({ scrollPosition: state.scrollPosition - deltaY }),
        onFrameEnd
      );
    };

    const onFrameEnd = () => {
      if (this._animating && lastEaseValue !== scrollAmmount) {
        requestAnimationFrame(animate);
        return;
      }
      this.setState(
        state => ({ scrollPosition: Math.round(state.scrollPosition) }),
        cb
      );
      this._animating = false;
    };

    animate();
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

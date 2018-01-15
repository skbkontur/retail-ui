// @flow
import * as React from 'react';
import classNames from 'classnames';

import config from './config';
import * as CalendarUtils from './CalendarUtils';

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

  _renderMonth({ top, offset = 0, title, cells, year, month, height }) {
    const isTopNegative = top <= 0;
    const isHeaderSticked = isTopNegative && height > -top;

    const headerTop = isHeaderSticked
      ? Math.min(-top, height - config.MONTH_TITLE_HEIGHT)
      : 0;

    const alpha = isHeaderSticked
      ? (height + top - config.MONTH_TITLE_HEIGHT) / 10
      : 1;

    const borderBottomColor = `rgba(223, 222, 222, ${alpha})`;

    const isJanuary = month === 0;
    const isDecember = month === 11;
    const isYearVisible = isJanuary || isHeaderSticked;
    const yearTop = isHeaderSticked && !isDecember ? -headerTop - top : 0;

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
    let { deltaY, deltaMode } = event;

    if (deltaY === 0) {
      return;
    }

    if (deltaMode === 1 /* WheelEvent.DOM_DELTA_LINE */) {
      deltaY *= config.DAY_HEIGHT;
    } else if (deltaMode === 2 /* WheelEvent.DOM_DELTA_PAGE */) {
      deltaY *= config.DAY_HEIGHT * 4;
    }

    this.setState(CalendarUtils.applyDelta(deltaY), this._handleWheelEnd);
  };

  _handleWheelEnd = () => {
    if (this._timeout) {
      clearTimeout(this._timeout);
    }
    if (this._animating) {
      this._animating = false;
    }
    this._timeout = setTimeout(this._scrollToCurrentMonth, 300);
  };

  _scrollToCurrentMonth = () => {
    const firstMonth = this.state.months[0];
    if (this.state.scrollPosition > firstMonth.height / 2) {
      this._scrollTo(firstMonth.height);
    } else {
      this._scrollTo(0);
    }
  };

  _scrollToMonth = (month: number, year: number) => {
    const currentMonth = this.state.months[1];
    const diffInMonths =
      currentMonth.month + currentMonth.year * 12 - month - year * 12;

    const onEnd = () => {
      this.setState({
        months: CalendarUtils.getMonths(month, year),
        scrollPosition: 0
      });
    };

    if (diffInMonths > 0) {
      const monthsToAppendCount = Math.min(Math.abs(diffInMonths) - 1, 2);
      const monthsToPrepend = Array.from(
        { length: monthsToAppendCount },
        (_, index) => CalendarUtils.getMonth(month + index, year)
      );
      this.setState(
        state => ({
          months: monthsToPrepend.concat(state.months),
          scrollPosition: -CalendarUtils.getMonthsHeight(monthsToPrepend)
        }),
        () => {
          const toPos = CalendarUtils.getMonthsHeight(
            this.state.months.slice(0, monthsToAppendCount + 1)
          );
          this._scrollAmount(toPos, onEnd);
        }
      );
    }

    if (diffInMonths < 0) {
      const monthsToAppendCount = Math.min(Math.abs(diffInMonths), 2);
      const monthsToAppend = Array.from(
        { length: monthsToAppendCount },
        (_, index) =>
          CalendarUtils.getMonth(month + index - monthsToAppendCount + 2, year)
      );

      this.setState(
        state => ({ months: state.months.concat(monthsToAppend) }),
        () => {
          const toPos = CalendarUtils.getMonthsHeight(
            this.state.months.slice(1, -2)
          );
          this._scrollTo(-toPos, onEnd);
        }
      );
    }
  };

  _scrollTo = (pos: number, cb?: () => void) => {
    const scrollPos = this.state.scrollPosition;
    const scrollAmmount = pos - scrollPos;
    this._scrollAmount(scrollAmmount, cb);
  };

  _scrollAmount = (scrollAmmount, cb) => {
    if (this._animating) {
      return;
    }
    this._animating = true;
    const startTime = Date.now();
    const duration = 500;

    let lastEaseValue = 0;

    const animate = () => {
      const t = Math.min((Date.now() - startTime) / duration, 1);
      const easing = CalendarUtils.ease(t) * scrollAmmount;
      const deltaY = lastEaseValue - easing;
      lastEaseValue = easing;
      this.setState(
        state => ({
          scrollPosition: state.scrollPosition - deltaY
        }),
        onAnimateEnd
      );
    };

    const onAnimateEnd = () => {
      if (this._animating && lastEaseValue !== scrollAmmount) {
        requestAnimationFrame(animate);
      } else {
        cb && cb();
        this.setState(state => ({
          scrollPosition: Math.round(state.scrollPosition)
        }));
        this._animating = false;
      }
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

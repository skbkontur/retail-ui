// @flow
import * as React from 'react';
import classNames from 'classnames';

import config from './config';
import * as CalendarUtils from './CalendarUtils';

import classes from './Calendar.less';

type Props = {
  initialDate: Date
};

type State = {
  scrollPosition: number,
  months: CalendarUtils.MonthConfig[]
};

class Calendar extends React.Component<Props, State> {
  static defaultProps = {
    initialDate: new Date()
  };

  _animating;
  _timeout;

  state = {
    scrollPosition: 0,
    months: CalendarUtils.getMonths(this.props.initialDate)
  };

  /**
   * @api
   * Scrolls calendar to given date
   * @param {Date} date
   */
  scrollToDate(date: Date) {
    this._scrollMonths(date);
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
          {this._renderHeader(positions)}
          {months
            .map((x, i) => ({ ...x, top: positions[i] }))
            .filter(CalendarUtils.isMonthVisible)
            .map(Month)}
        </div>
      </div>
    );
  }

  _renderHeader(positions) {
    const { months, scrollPosition } = this.state;
    const monthIndex = positions.filter(x => x <= 0).length - 1;
    const month = months[monthIndex];
    const isScrollPositive = scrollPosition > 0;
    const top = isScrollPositive
      ? Math.min(scrollPosition, config.MONTH_TITLE_HEIGHT) -
        config.MONTH_TITLE_HEIGHT
      : 0;
    const alpha = isScrollPositive
      ? (scrollPosition - config.MONTH_TITLE_HEIGHT) / 10
      : 1;
    const borderBottomColor = `rgba(223, 222, 222, ${alpha})`;
    const headerTop = month.month === 11 ? 0 : -top;
    return (
      <div
        style={{ ...styles.header, top, borderBottomColor }}
        className={classes.header}
      >
        <div className={classes.headerMonth}>{month.title}</div>
        <div style={{ top: headerTop }} className={classes.headerYear}>
          {month.year}
        </div>
      </div>
    );
  }

  _handleWheel = (event: SyntheticWheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    let { deltaY, deltaMode } = event;
    if (deltaMode === 1) {
      deltaY *= config.DAY_HEIGHT;
    } else if (deltaMode === 2) {
      deltaY *= config.DAY_HEIGHT * 4;
    }
    if (deltaY === 0) {
      return;
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
    this._timeout = setTimeout(this._scrollToCurrentMonth, 100);
  };

  _scrollToCurrentMonth = () => {
    this._scrollTo(0);
  };

  _scrollMonths = (date: Date) => {
    this.setState({
      months: CalendarUtils.getMonths(date),
      scrollPosition: 0
    });

    // Animation is not properly working
    // TODO: make animations
    // if (this._animating) {
    //   // this._animating = false
    //   return;
    // }
    //
    // const currentMonth = this.state.months[1].month;
    // const currentYear = this.state.months[1].year;
    //
    // const dateMonth = date.getMonth();
    // const dateYear = date.getFullYear();
    //
    // const monthsToScroll =
    //   currentMonth + currentYear * 12 - dateMonth - dateYear * 12;
    //
    // if (monthsToScroll === 0) {
    //   return;
    // }
    //
    // const sign = monthsToScroll > 0 ? 1 : -1;
    //
    // const scrollAmount = Array.from(
    //   { length: Math.abs(monthsToScroll) },
    //   sign > 0 ? (_, i) => i : (_, i) => 1 - i
    // )
    //   .map(
    //     delta =>
    //       CalendarUtils.getMonth(
    //         this.state.months[1].month + delta,
    //         this.state.months[1].year
    //       ).height
    //   )
    //   .reduce((a, b) => a + b, 0);
    //
    // this._scrollTo(sign * scrollAmount, () => this._scrollTo(0));
  };

  _scrollTo = (pos: number, cb?: () => void) => {
    const scrollPos = this.state.scrollPosition;
    const scrollAmmount = pos - scrollPos;
    this._scrollAmount(scrollAmmount, cb);
  };

  _scrollAmount = (scrollAmmount, cb) => {
    this._animating = true;

    const startTime = Date.now();
    const duration = 600;

    let lastEaseValue = 0;

    const animate = () => {
      const t = Math.min((Date.now() - startTime) / duration, 1);
      const easing = CalendarUtils.ease(t) * scrollAmmount;
      const deltaY = Math.round(lastEaseValue - easing);
      this.setState(CalendarUtils.applyDelta(deltaY), onAnimateEnd);
      lastEaseValue = easing;
    };

    const onAnimateEnd = () => {
      if (this._animating && lastEaseValue !== scrollAmmount) {
        requestAnimationFrame(animate);
      } else {
        cb && cb();
        this._animating = false;
      }
    };

    animate();
  };
}

const Month = ({ top, offset = 0, title, cells, year, month }) => (
  <div className={classes.month} style={{ top }} key={month + '-' + year}>
    <div style={styles.monthTitle} className={classes.monthTitle}>
      <div className={classes.headerMonth}>{title}</div>
      {month === 0 && <div className={classes.headerYear}>{year}</div>}
    </div>
    <div
      style={{ width: offset * config.DAY_HEIGHT }}
      className={classes.placeholder}
    />
    {cells.map(Cell)}
  </div>
);

const Cell = ({ isWeekend, isToday, day }) => (
  <button
    key={day}
    style={styles.cell}
    tabIndex={-1}
    className={classNames({
      [classes.cell]: true,
      [classes.weekend]: isWeekend,
      [classes.today]: isToday
    })}
  >
    {day}
  </button>
);

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

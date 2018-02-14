// @flow
import * as React from 'react';

import normalizeWheel from 'normalize-wheel';

import config from './config';
import * as CalendarUtils from './CalendarUtils';
import { Animation } from './Animation';
import * as CDS from './CalendarDateShape';
import { MonthViewModel } from './MonthViewModel';
import CalendarScrollEvents from './CalendarScrollEvents';

import { Month } from './Month';

import classes from './Calendar.less';

export type CalendarDateShape = CDS.CalendarDateShape;

export type Props = {|
  initialMonth?: number,
  initialYear?: number,
  onSelect?: (date: CalendarDateShape) => void,
  value?: ?CalendarDateShape,
  maxDate?: CalendarDateShape,
  minDate?: CalendarDateShape
|};

export type State = {
  scrollPosition: number,
  months: MonthViewModel[],
  today: CalendarDateShape,
  scrollDirection: 1 | -1,
  scrollTarget: number
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
  _wheelEndTimeout;

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
      today,
      scrollDirection: 1,
      scrollTarget: 0
    };
  }

  componentWillUnmount() {
    if (this._scrollAnimationTimeout) {
      clearTimeout(this._scrollAnimationTimeout);
    }
    if (this._animation.inProgress()) {
      this._animation.cancel();
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
    const positions = this._getMonthPositions();
    return (
      <div className={classes.root} onWheel={this._handleWheel}>
        <div style={styles.wrapper} className={classes.wrapper}>
          {this.state.months
            .map((x, i) => [positions[i], x])
            .filter(tupple => CalendarUtils.isMonthVisible(...tupple))
            .map(this._renderMonth, this)}
        </div>
      </div>
    );
  }

  _renderMonth([top, month]) {
    return (
      <Month
        key={month.month + '-' + month.year}
        top={top}
        month={month}
        maxDate={this.props.maxDate}
        minDate={this.props.minDate}
        today={this.state.today}
        value={this.props.value}
        onDateClick={this.props.onSelect}
        onMonthYearChange={this._handleMonthYearChange}
      />
    );
  }

  _getMonthPositions() {
    const { scrollPosition, months } = this.state;
    const positions = [scrollPosition - months[0].height];
    for (let i = 1; i < months.length; i++) {
      const position = positions[i - 1] + months[i - 1].height;
      positions.push(position);
    }
    return positions;
  }

  _handleMonthYearChange = (month, year) => {
    this.scrollToMonth(month, year);
  };

  _handleSelect = date => {
    const { onSelect } = this.props;
    if (onSelect) {
      onSelect(date);
    }
  };

  _handleWheel = (event: SyntheticWheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    const { pixelY } = normalizeWheel(event);

    this.setState(({ months, scrollPosition, scrollTarget }) => {
      const targetPosition = CalendarUtils.calculateScrollPosition(
        months,
        scrollPosition,
        pixelY
      ).scrollPosition;
      return { scrollTarget: targetPosition };
    }, this._handleWheelEnd);

    this._animation.animate(pixelY, deltaY =>
      this.setState(CalendarUtils.applyDelta(deltaY))
    );

    CalendarScrollEvents.emit();
  };

  _handleWheelEnd = () => {
    if (this._wheelEndTimeout) {
      clearTimeout(this._wheelEndTimeout);
    }
    this._wheelEndTimeout = setTimeout(this._scrollToNearestWeek, 300);
  };

  _scrollToNearestWeek = () => {
    const { scrollTarget, scrollDirection } = this.state;

    const trasholdHeight = config.MONTH_TITLE_OFFSET_HEIGHT + config.DAY_HEIGHT;

    if (scrollTarget < trasholdHeight) {
      let targetPosition = 0;
      if (scrollDirection < 0) {
        targetPosition = trasholdHeight;
      }

      this.setState({ scrollTarget: targetPosition }, () => {
        const amount = scrollTarget - targetPosition;
        this._animation.animate(amount, deltaY =>
          this.setState(CalendarUtils.applyDelta(deltaY))
        );
      });
    }
  };

  _scrollToMonth = (month: number, year: number) => {
    if (this._animation.inProgress()) {
      this._animation.finish();
    }
    // After animation finish there could be _handleScrollAnimationEnd _scrollAnimationTimeout
    // we have to remove it after _animation.finish
    if (this._scrollAnimationTimeout) {
      clearTimeout(this._scrollAnimationTimeout);
    }

    const { minDate, maxDate } = this.props;

    if (minDate && CDS.isGreater(minDate, CDS.create(32, month, year))) {
      this._scrollToMonth(minDate.month, minDate.year);
      return;
    }

    if (maxDate && CDS.isLess(maxDate, CDS.create(0, month, year))) {
      this._scrollToMonth(maxDate.month, maxDate.year);
      return;
    }

    const currentMonth = this.state.months[1];
    const diffInMonths =
      currentMonth.month + currentMonth.year * 12 - month - year * 12;

    if (diffInMonths === 0) {
      this._scrollTo(0);
      return;
    }

    const amount = Array.from(
      { length: Math.abs(diffInMonths) },
      (_, index) => {
        if (diffInMonths < 0) {
          return -MonthViewModel.create(
            currentMonth.month + index - diffInMonths - 1,
            currentMonth.year
          ).height;
        }
        return MonthViewModel.create(
          currentMonth.month + index,
          currentMonth.year
        ).height;
      }
    ).reduce((a, b) => a + b, 0);

    this._scrollTo(amount);

    return;
  };

  _scrollTo = (pos: number, onEnd?: () => void) => {
    const scrollAmmount = pos - this.state.scrollPosition;
    return this._scrollAmount(scrollAmmount, onEnd);
  };

  _scrollAmount = (scrollAmmount: number, onEnd?: () => void) => {
    return this._animation.animate(
      scrollAmmount,
      deltaY => this.setState(CalendarUtils.applyDelta(-deltaY)),
      onEnd
    );
  };
}

const styles = {
  wrapper: {
    height: config.WRAPPER_HEIGHT
  }
};

export default Calendar;

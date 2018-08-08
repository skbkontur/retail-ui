import * as React from 'react';
import Calendar, { CalendarDateShape } from '../Calendar';
import shallowEqual from 'fbjs/lib/shallowEqual';

import { formatDate } from './DatePickerHelpers';

import styles = require('./Picker.less');
import { Nullable } from '../../typings/utility-types';
import { isLess, isGreater } from '../Calendar/CalendarDateShape';

interface Props {
  maxDate?: CalendarDateShape;
  minDate?: CalendarDateShape;
  value: Nullable<CalendarDateShape>;
  onPick: (date: CalendarDateShape) => void;
  onSelect?: (date: CalendarDateShape) => void;
  enableTodayLink?: boolean;
}

interface State {
  date: CalendarDateShape;
  today: CalendarDateShape;
}

const getTodayCalendarDate = () => {
  const d = new Date();
  return {
    date: d.getDate(),
    month: d.getMonth(),
    year: d.getFullYear()
  };
};

export default class Picker extends React.Component<Props, State> {
  private _calendar: Calendar | null = null;

  constructor(props: Props) {
    super(props);
    const today = getTodayCalendarDate();
    this.state = {
      date: this.getInitialDate(today),
      today
    };
  }

  public componentDidUpdate(prevProps: Props) {
    const { value } = this.props;
    if (value && !shallowEqual(value, prevProps.value)) {
      this._scrollToMonth(value.month, value.year);
    }
  }

  public render() {
    const { date } = this.state;
    return (
      // tslint:disable-next-line:jsx-no-lambda
      <div className={styles.root} onMouseDown={e => e.preventDefault()}>
        <Calendar
          ref={c => (this._calendar = c)}
          value={this.props.value}
          initialMonth={date.month}
          initialYear={date.year}
          onSelect={this.props.onPick}
          minDate={this.props.minDate}
          maxDate={this.props.maxDate}
        />
        {this.props.enableTodayLink && this._renderTodayLink()}
      </div>
    );
  }

  private _scrollToMonth = (month: number, year: number) => {
    if (this._calendar) {
      this._calendar.scrollToMonth(month, year);
    }
  };

  private _renderTodayLink() {
    return (
      <button
        className={styles.todayWrapper}
        onClick={this._handleSelectToday}
        tabIndex={-1}
      >
        Сегодня {formatDate(this.state.today)}
      </button>
    );
  }

  private _handleSelectToday = () => {
    const { today } = this.state;
    if (this.props.onSelect) {
      this.props.onSelect(today);
    }
    if (this._calendar) {
      const { month, year } = today;
      this._calendar.scrollToMonth(month, year);
    }
  };

  private getInitialDate = (today: CalendarDateShape) => {
    if (this.props.value) {
      return this.props.value;
    }

    if (this.props.minDate && isLess(today, this.props.minDate)) {
      return this.props.minDate;
    }

    if (this.props.maxDate && isGreater(today, this.props.maxDate)) {
      return this.props.maxDate;
    }

    return today;
  };
}

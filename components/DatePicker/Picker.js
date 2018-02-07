// @flow

import * as React from 'react';
import shallowEqual from 'fbjs/lib/shallowEqual';
import Calendar, { type CalendarDateShape } from '../Calendar';

import styles from './Picker.less';

type Props = {
  maxDate?: number,
  minDate?: number,
  value: ?CalendarDateShape,
  onPick: (date: CalendarDateShape) => void
};

type State = {
  date: CalendarDateShape
};

const getTodayCalendarDate = () => {
  const d = new Date();
  return {
    date: d.getDate(),
    month: d.getMonth(),
    year: d.getFullYear()
  };
};

export default class Picker extends React.Component<Props, State> {
  _mounted: boolean;

  _calendar;

  constructor(props: Props) {
    super(props);
    this.state = {
      date: this.props.value || getTodayCalendarDate()
    };
  }

  componentWillUpdate({ value }: Props) {
    if (value && !shallowEqual(this.props.value, value)) {
      this._calendar && this._calendar.scrollToMonth(value.month, value.year);
    }
  }

  render() {
    const { date } = this.state;
    return (
      <div className={styles.root} onMouseDown={e => e.preventDefault()}>
        <Calendar
          ref={c => (this._calendar = c)}
          value={this.props.value}
          initialMonth={date.month}
          initialYear={date.year}
          onSelect={this.props.onPick}
        />
      </div>
    );
  }
}

// @flow

import * as React from 'react';

import Calendar from '../Calendar';

import styles from './Picker.less';

type Props = {
  maxDate?: number,
  minDate?: number,
  value: ?Date,
  onPick: (date: Date) => void
};

type State = {
  date: Date
};

export default class Picker extends React.Component<Props, State> {
  _mounted: boolean;

  _calendar;

  state = {
    date: this.props.value ? new Date(this.props.value.getTime()) : new Date()
  };

  componentWillUpdate({ value }: Props) {
    if (value && +value !== +this.props.value) {
      this._calendar &&
        this._calendar.scrollToMonth(
          value.getUTCMonth(),
          value.getUTCFullYear()
        );
    }
  }

  render() {
    const { date } = this.state;
    return (
      <div className={styles.root} onMouseDown={e => e.preventDefault()}>
        <Calendar
          ref={c => (this._calendar = c)}
          value={this._getDateShape(this.props.value)}
          initialMonth={date.getUTCMonth()}
          initialYear={date.getUTCFullYear()}
          onSelect={this._handleDateSelect}
        />
      </div>
    );
  }

  _getDateShape = date => {
    if (!date) {
      return null;
    }
    return {
      date: date.getUTCDate(),
      month: date.getUTCMonth(),
      year: date.getUTCFullYear()
    };
  };

  _handleDateSelect = ({ date, month, year }) => {
    const d = new Date(0);
    d.setUTCDate(date);
    d.setUTCMonth(month);
    d.setUTCFullYear(year);
    this.props.onPick(d);
  };
}

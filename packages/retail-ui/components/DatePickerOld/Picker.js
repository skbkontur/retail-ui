

import * as React from 'react';

import Calendar from '../Calendar';

import styles from './Picker.less';

type Props = {
  maxYear?: number,
  minYear?: number,
  value: ?Date,
  onPick: (date: Date) => void
};

export default class Picker extends React.Component<Props> {
  _mounted: boolean;

  _calendar: Calendar | null = null;

  render() {
    const { value, maxYear, minYear } = this.props;
    return (
      <div className={styles.root} onMouseDown={e => e.preventDefault()}>
        <Calendar
          ref={this._refCalendar}
          initialMonth={value ? value.getUTCMonth() : undefined}
          initialYear={value ? value.getUTCFullYear() : undefined}
          maxDate={
            maxYear !== undefined
              ? { date: 31, month: 11, year: maxYear }
              : undefined
          }
          minDate={
            minYear !== undefined
              ? { date: 1, month: 0, year: minYear }
              : undefined
          }
          value={
            value && {
              date: value.getUTCDate(),
              month: value.getUTCMonth(),
              year: value.getUTCFullYear()
            }
          }
          onSelect={this._handleSelect}
        />
      </div>
    );
  }

  componentDidUpdate(prevProps: Props) {
    const { value } = this.props;
    if (value && +prevProps.value !== +value) {
      if (this._calendar) {
        this._calendar.scrollToMonth(
          value.getUTCMonth(),
          value.getUTCFullYear()
        );
      }
    }
  }

  _refCalendar = calendar => {
    this._calendar = calendar;
  };

  _handleSelect = ({ date, month, year }) => {
    this.props.onPick(new Date(Date.UTC(year, month, date, 0, 0, 0, 0)));
  };
}

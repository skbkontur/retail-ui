// @flow

import * as React from 'react';

import Calendar from './Calendar';
import DateSelect from '../DateSelect';
import Icon from '../Icon';

import styles from './Picker.less';

type Props = {
  maxYear?: number,
  minYear?: number,
  value: ?Date,
  iconRef: ?Icon,
  onPick: (date: Date) => void
};

type State = {
  date: Date
};

export default class Picker extends React.Component<Props, State> {
  _mounted: boolean;

  constructor(props: Props, context: mixed) {
    super(props, context);

    this.state = {
      date: props.value ? new Date(props.value.getTime()) : new Date()
    };
  }

  render() {
    const { date } = this.state;
    return (
      <div className={styles.root}>
        <div className={styles.monthYear}>
          <div className={styles.month}>
            <DateSelect
              type="month"
              value={date.getUTCMonth()}
              width={'90px'}
              onChange={this.handleMonthChange}
            />
          </div>
          <div className={styles.year}>
            <DateSelect
              type="year"
              value={date.getUTCFullYear()}
              minYear={this.props.minYear}
              maxYear={this.props.maxYear}
              width={'56px'}
              onChange={this.handleYearChange}
            />
          </div>
        </div>
        <Calendar
          ref="calendar"
          {...this.props}
          initialDate={date}
          onNav={date => this.setState({ date })}
        />
      </div>
    );
  }

  componentDidMount() {
    this._mounted = true;
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  handleMonthChange = (month: number) => {
    this.state.date.setUTCMonth(month);
    this.setState({});

    this.refs.calendar.moveToDate(this.state.date);
  };

  handleYearChange = (year: number) => {
    this.state.date.setUTCFullYear(year);
    this.setState({});

    this.refs.calendar.moveToDate(this.state.date);
  };
}

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
          <DateSelect
            type="year"
            value={this.state.date.getUTCFullYear()}
            minYear={this.props.minYear}
            maxYear={this.props.maxYear}
            width={'50px'}
            onChange={this.handleYearChange}
          />
          <div style={{ display: 'inline-block', width: 4 }} />
          <DateSelect
            type="month"
            value={this.state.date.getUTCMonth()}
            width={'80px'}
            onChange={this.handleMonthChange}
          />
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

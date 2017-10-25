// @flow

import * as React from 'react';

import Calendar from './Calendar';
import DateSelect from '../DateSelect';

import { formatDate } from './utils';

import styles from './Picker.less';

type Props = {
  chosenDate: ?Date,
  maxYear: number,
  minYear: number,
  noTodayButton?: boolean,
  iconRef: ?Icon,
  onPick: (date: Date) => void
};

type State = {
  date: Date,
};

export default class Picker extends React.Component<Props, State> {
  _mounted: boolean;

  constructor(props: Props, context: mixed) {
    super(props, context);

    const today = new Date();
    let month = today.getUTCMonth();
    let year = today.getUTCFullYear();
    if (props.chosenDate) {
      month = props.chosenDate.getUTCMonth();
      year = props.chosenDate.getUTCFullYear();
    }

    this.state = {
      date: new Date(Date.UTC(year, month, 1)),
    };
  }

  render() {
    const { date } = this.state;

    const monthPicker = (
      <div className={styles.month}>
        <DateSelect
          type="month"
          value={date.getUTCMonth()}
          width={'90px'}
          onChange={this.handleMonthChange}
        />
      </div>
    );

    const yearPicker = (
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
    );

    const todayPicker = this.props.noTodayButton ? null : (
      <button className={styles.today} onClick={this.moveToToday}>
        Сегодня {formatDate(new Date())}
      </button>
    );

    return (
      <div className={styles.root}>
        <div className={styles.wrapper}>
          <div className={styles.picker}>
            {monthPicker}
            {yearPicker}
          </div>
        </div>
        <Calendar
          ref="calendar"
          {...this.props}
          initialDate={date}
          onNav={this.handleNav}
        />
        {todayPicker}
      </div>
    );
  }

  componentDidMount() {
    this._mounted = true;
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.value && +prevProps.value !== +this.props.value) {
      this.setState({ date: this.props.value });
      this.refs.calendar.moveToDate(this.props.value);
    }
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  handleNav = date => {
    if (this.state.date !== date) {
      this.setState({ date });
    }
  }

  moveToToday = () => {
    const today = new Date();
    this.setState({ date: today });

    this.refs.calendar.moveToDate(today);
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

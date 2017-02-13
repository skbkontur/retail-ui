// @flow

import events from 'add-event-listener';
import React from 'react';
import ReactDOM from 'react-dom';

import Calendar from './Calendar';
import DateSelect from '../DateSelect';
import Gapped from '../Gapped';

import styles from './Picker.less';

type Props = {
  maxYear: number,
  minYear: number,
  value: ?Date,
  onClose: () => void,
  onPick: (date: Date) => void,
};

type State = {
  date: Date,
};

export default class Picker extends React.Component {
  props: Props;
  state: State;

  _mounted: bool;

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
          <Gapped gap={5}>
            <DateSelect type="month" value={this.state.date.getUTCMonth()}
              width={100} onChange={this.handleMonthChange}
            />
            <DateSelect type="year" value={this.state.date.getUTCFullYear()}
              minYear={this.props.minYear} maxYear={this.props.maxYear}
              width={70} onChange={this.handleYearChange}
            />
          </Gapped>
        </div>
        <Calendar ref="calendar" {...this.props} initialDate={date}
          onNav={(date) => this.setState({ date })}
        />
      </div>
    );
  }

  componentDidMount() {
    this._mounted = true;

    events.addEventListener(document, 'mousedown', this.handleDocClick);
  }

  componentWillUnmount() {
    this._mounted = false;

    events.removeEventListener(document, 'mousedown', this.handleDocClick);
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

  handleDocClick = (event: MouseEvent) => {
    // For some reason mousedown handler is still being called after
    // `componentWillUnmount` was called in IE11.
    if (!this._mounted) {
      return;
    }

    const target: Element = (event.target: any) || event.srcElement;
    if (!ReactDOM.findDOMNode(this).contains(target) && !isDetached(target)) {
      this.props.onClose();
    }
  };
}

function isDetached(element) {
  const body = document.body;
  do {
    if (element === body) {
      return false;
    }
    element = element && element.parentElement;
  } while (element);

  return true;
}

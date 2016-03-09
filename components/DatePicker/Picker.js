import events from 'add-event-listener';
import React from 'react';
import ReactDOM from 'react-dom';

import Calendar from './Calendar';
import DateSelect from '../DateSelect';
import Gapped from '../Gapped';

import styles from './Picker.less';

class Picker extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      date: props.value ? new Date(props.value) : new Date(),
    };
  }

  render() {
    const {date} = this.state;
    return (
      <div className={styles.root}>
        <div className={styles.monthYear}>
          <Gapped gap={5}>
            <DateSelect type="month" value={this.state.date.getMonth()}
              width={100} onChange={this.handleMonthChange}
            />
            <DateSelect type="year" value={this.state.date.getFullYear()}
              minYear={this.props.minYear} maxYear={this.props.maxYear}
              width={70} onChange={this.handleYearChange}
            />
          </Gapped>
        </div>
        <Calendar ref="calendar" {...this.props} initialDate={date}
          onNav={(date) => this.setState({date})}
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

  handleMonthChange = event => {
    this.state.date.setMonth(event.target.value);
    this.setState({});

    this.refs.calendar.moveToDate(this.state.date);
  };

  handleYearChange = event => {
    this.state.date.setFullYear(event.target.value);
    this.setState({});

    this.refs.calendar.moveToDate(this.state.date);
  };

  handleDocClick = event => {
    // For some reason mousedown handler is still being called after
    // `componentWillUnmount` was called in IE11.
    if (!this._mounted) {
      return;
    }

    const target = event.target || event.srcElement;
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
    element = element.parentNode;
  } while (element);

  return true;
}

export default Picker;

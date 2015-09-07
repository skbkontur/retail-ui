import events from 'add-event-listener';
import React from 'react';

import Calendar from './Calendar';
import DateSelect from '../DateSelect';
import Gapped from '../Gapped';

import styles from './Picker.less';

const Picker = React.createClass({
  getInitialState() {
    return {
      date: this.props.value ? new Date(this.props.value) : new Date(),
    }
  },

  render() {
    let { date } = this.state;
    return (
      <div className={styles.root}>
        <div className={styles.monthYear}>
          <Gapped gap={5}>
            <DateSelect type="month" value={this.state.date.getMonth()}
                width={100} onChange={this.handleMonthChange} />
            <DateSelect type="year" value={this.state.date.getFullYear()}
                width={70} onChange={this.handleYearChange} />
          </Gapped>
        </div>
        <Calendar ref="calendar" {...this.props} initialDate={date}
            onNav={date => this.setState({date})}/>
      </div>
    );
  },

  componentDidMount() {
    events.addEventListener(document, 'mousedown', this.handleDocClick);
  },

  componentWillUnmount() {
    events.removeEventListener(document, 'mousedown', this.handleDocClick);
  },

  handleMonthChange(event) {
    this.state.date.setMonth(event.target.value);
    this.setState({});

    this.refs.calendar.moveToDate(this.state.date);
  },

  handleYearChange(event) {
    this.state.date.setFullYear(event.target.value);
    this.setState({});

    this.refs.calendar.moveToDate(this.state.date);
  },

  handleDocClick(event) {
    let target = event.target || event.srcElement;
    if (!React.findDOMNode(this).contains(target) && !isDetached(target)) {
      this.props.onClose();
    }
  },
});

function isDetached(element) {
  let body = document.body;
  do {
    if (element === body) return false;
    element = element.parentNode;
  } while (element);

  return true;
}

module.exports = Picker;

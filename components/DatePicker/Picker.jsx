const React = require('react');

const Calendar = require('./Calendar');
const DateSelect = require('../DateSelect');
const Gapped = require('../Gapped');

const styles = require('./Picker.less');

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
});

module.exports = Picker;

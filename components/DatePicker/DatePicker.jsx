const React = require('react');

const PropTypes = React.PropTypes;

const Button = require('../Button');
const Group = require('../Group');
const Icon = require('../Icon');
const Input = require('../Input');
const Picker = require('./Picker');

const styles = require('./DatePicker.less');

var DatePicker = React.createClass({
  propTypes: {
    value: PropTypes.instanceOf(Date),

    onChange: PropTypes.func,
  },

  getInitialState() {
    return {
      value: this.props.value !== undefined ? this.props.value : null,
      textValue: '',
      opened: false,
    };
  },

  render() {
    let picker = null;
    if (this.state.opened) {
      picker = (
        <div className={styles.picker} onKeyDown={this.handlePickerKey}>
          <Picker value={this.state.value} onPick={this.handlePick}
              onClose={this.handlePickerClose} />
        </div>
      );
    }
    return (
      <span className={styles.root}>
        <Group width={120}>
          <Input ref="input" mainInGroup value={this.state.textValue}
              maxLength="10" placeholder="дд.мм.гггг"
              onChange={this.handleChange} onBlur={this.handleBlur} />
          <Button narrow active={this.state.opened} onClick={this.open}>
            <Icon name="calendar" />
          </Button>
        </Group>
        {picker}
      </span>
    );
  },

  componentWillReceiveProps(newProps) {
    if (newProps.value !== undefined && this.state.value !== newProps.value) {
      this.setState({
        value: newProps.value,
        textValue: formatDate(newProps.value),
      });
    }
  },

  handleChange(event) {
    let value = event.target.value.replace(/[^\d\.]/g, '');
    let date = parseDate(value);
    if (date) {
      if (this.props.value === undefined) {
        this.setState({
          value: date,
          textValue: value,
        });
      } else if (this.props.onChange) {
        this.props.onChange(date);
      }
    } else {
      this.setState({textValue: value});
    }
  },

  handleBlur() {
    if (this.props.value === undefined) {
      let value = parseDate(this.state.textValue);
      this.setState({
        value,
        textValue: formatDate(value),
      });
    } else {
      this.setState({textValue: formatDate(this.props.value)});
    }
  },

  handlePickerKey(event) {
    if (event.key === 'Escape') {
      this.close(true);
    }
  },

  handlePick(date) {
    if (this.props.value === undefined) {
      this.setState({value: date, textValue: formatDate(date)});
    } else if (this.props.onChange) {
      this.props.onChange(date);
    }
    this.close(false);
  },

  handlePickerClose() {
    this.close(false);
  },

  open() {
    this.setState({opened: true});
  },

  close(focus) {
    this.setState({opened: false});
    if (focus) {
      setTimeout(() => this.refs.input.focus(), 0);
    }
  },
});

function formatDate(date) {
  if (!date) return '';

  let day = formatNumber(date.getDate());
  let month = formatNumber(date.getMonth() + 1);
  return `${day}.${month}.${date.getFullYear()}`;
}

function parseDate(str) {
  let match = str.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);
  if (match) {
    let date = new Date(0);
    date.setFullYear(parseInt(match[3], 10));
    date.setMonth(parseInt(match[2], 10) - 1);
    date.setDate(parseInt(match[1], 10));
    return date;
  }
  return null;
}

function formatNumber(value) {
  let ret = value.toString();
  while (ret.length < 2) {
    ret = '0' + ret;
  }
  return ret;
}

module.exports = DatePicker;

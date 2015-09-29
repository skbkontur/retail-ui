import classNames from 'classnames';
import React, {PropTypes} from 'react';

import Button from '../Button';
import Group from '../Group';
import Icon from '../Icon';
import Input from '../Input';
import Picker from './Picker';

import styles from './DatePicker.less';

var DatePicker = React.createClass({
  propTypes: {
    value: PropTypes.instanceOf(Date),

    onChange: PropTypes.func,
  },

  getInitialState() {
    return {
      value: this.props.value !== undefined ? this.props.value : null,
      textValue: formatDate(this.props.value),
      opened: false,
    };
  },

  render() {
    let picker = null;
    if (this.state.opened) {
      picker = (
        <div className={styles.picker} onKeyDown={this.handlePickerKey}>
          <Picker value={this.state.value} onPick={this.handlePick}
            onClose={this.handlePickerClose}
          />
        </div>
      );
    }
    const className = classNames({
      [styles.root]: true,
      [this.props.className || '']: true,
    });
    return (
      <span className={className}>
        <Group width={120}>
          <Input ref="input" mainInGroup value={this.state.textValue}
            maxLength="10" placeholder="дд.мм.гггг"
            onChange={this.handleChange} onBlur={this.handleBlur}
            onFocus={this.props.onFocus} error={this.props.error}
          />
          <Button narrow active={this.state.opened} onClick={this.open}>
            <Icon name="calendar" />
          </Button>
        </Group>
        {picker}
      </span>
    );
  },

  componentWillReceiveProps(newProps) {
    if (newProps.value !== undefined) {
      this.setState({
        value: newProps.value,
        textValue: formatDate(newProps.value),
      });
    }
  },

  handleChange(event) {
    const value = event.target.value.replace(/[^\d\.]/g, '');
    this.setState({
      textValue: value,
    });
  },

  handleBlur() {
    const date = parseDate(this.state.textValue);
    if (this.props.value === undefined) {
      this.setState({
        value: date,
        textValue: formatDate(date),
      });
    } else {
      this.setState({
        textValue: formatDate(this.props.value),
        value : null,
      });
    }

    if (this.props.onChange && +this.state.value !== +date) {
      this.props.onChange({target: {value: date}});
    }

    if (this.props.onBlur) {
      this.props.onBlur();
    }
  },

  handlePickerKey(event) {
    if (event.key === 'Escape') {
      this.close(true);
    }
  },

  handlePick(date) {
    if (this.props.value === undefined) {
      this.setState({
        value: date,
        textValue: formatDate(date),
      });
    }
    if (this.props.onChange) {
      this.props.onChange({target: {value: date}});
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
  if (!date) {
    return '';
  }

  const day = formatNumber(date.getDate());
  const month = formatNumber(date.getMonth() + 1);
  return `${day}.${month}.${date.getFullYear()}`;
}

function parseDate(str) {
  str = str || '';
  const match = str.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);
  if (match) {
    const date = new Date(0);
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

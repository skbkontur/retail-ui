import classNames from 'classnames';
import React, {PropTypes} from 'react';

import filterProps from '../filterProps';
import Icon from '../Icon';
import Input from '../Input';
import Picker from './Picker';

import styles from './DatePicker.less';

const INPUT_PASS_PROPS = {
  disabled: true,
  error: true,

  onInput: true,
  onKeyDown: true,
  onKeyPress: true,
  onKeyUp: true,
};

class DatePicker extends React.Component {
  static propTypes = {
    disabled: PropTypes.bool,

    error: PropTypes.bool,

    /**
     * Максимальный год в селекте для года.
     */
    maxYear: PropTypes.number,

    /**
     * Минимальный год в селекте для года.
     */
    minYear: PropTypes.number,

    value: PropTypes.instanceOf(Date),

    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    onBlur: PropTypes.func,

    onChange: PropTypes.func,

    onFocus: PropTypes.func,

    onInput: PropTypes.func,

    onKeyDown: PropTypes.func,

    onKeyPress: PropTypes.func,

    onKeyUp: PropTypes.func,
  };

  static defaultProps = {
    minYear: 1900,
    maxYear: 2100,
    width: 120,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      textValue: formatDate(props.value),
      opened: false,
    };

    this._focused = false;
  }

  render() {
    let picker = null;
    if (this.state.opened) {
      picker = (
        <div className={styles.picker} onKeyDown={this.handlePickerKey}>
          <Picker value={this.props.value}
            minYear={this.props.minYear} maxYear={this.props.maxYear}
            onPick={this.handlePick} onClose={this.handlePickerClose}
          />
        </div>
      );
    }
    const className = classNames({
      [styles.root]: true,
      [this.props.className || '']: true,
    });
    const openClassName = classNames({
      [styles.openButton]: true,
      [styles.openButtonDisabled]: this.props.disabled,
    });
    return (
      <span className={className} style={{width: this.props.width}}>
        <Input
          ref="input"
          {...filterProps(this.props, INPUT_PASS_PROPS)}
          value={this.state.textValue}
          maxLength="10"
          width="100%"
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
        />
        <div className={openClassName} onClick={this.open}>
          <Icon name="calendar" />
        </div>
        {picker}
      </span>
    );
  }

  componentWillReceiveProps(newProps) {
    if (!this._focused) {
      this.setState({textValue: formatDate(newProps.value)});
    }
  }

  handleChange = event => {
    const value = event.target.value.replace(/[^\d\.]/g, '');
    this.setState({
      textValue: value,
    });
  };

  handleFocus = () => {
    this._focused = true;

    if (this.props.onFocus) {
      this.props.onFocus();
    }
  };

  handleBlur = () => {
    this._focused = false;

    const date = parseDate(this.state.textValue);

    this.setState({
      textValue: formatDate(this.props.value),
    });

    if (this.props.onChange && +this.props.value !== +date) {
      this.props.onChange({target: {value: date}}, date);
    }

    if (this.props.onBlur) {
      this.props.onBlur();
    }
  };

  handlePickerKey = event => {
    if (event.key === 'Escape') {
      this.close(true);
    }
  };

  handlePick = date => {
    if (this.props.onChange) {
      this.props.onChange({target: {value: date}}, date);
    }
    this.close(true);
  };

  handlePickerClose = () => {
    this.close(false);
  };

  open = () => {
    if (!this.props.disabled) {
      this.setState({opened: true});
    }
  };

  close(focus) {
    this.setState({opened: false});
    if (focus) {
      setTimeout(() => this.refs.input.focus(), 0);
    }
  }
}

function checkDate(date) {
  if (date instanceof Date && !isNaN(date.getTime())) {
    return date;
  }
  return null;
}

function formatDate(date) {
  if (!checkDate(date)) {
    return '';
  }

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  return `${day}.${month}.${date.getFullYear()}`;
}

function parseDate(str) {
  str = str || '';
  const match = str.match(/^(\d{1,2})\.(\d{1,2})\.(\d{2,4})$/);
  if (match) {
    let [, date, month, year] = match;
    year = parseInt(year, 10);
    month = parseInt(month, 10) - 1;
    date = parseInt(date, 10);

    // Handle short year version
    if (year < 50) { // 20xx
      year += 2000;
    } else if (year < 100) { // 19xx
      year += 1900;
    }

    // IE8 does't support `Date('yyyy-mm-dd')` constructor.
    const dateObj = new Date(Date.UTC(year, month, date));
    if (
      dateObj.getFullYear() === year &&
      dateObj.getMonth() === month &&
      dateObj.getDate() === date
    ) {
      return checkDate(dateObj);
    }
  }
  return null;
}

export default DatePicker;

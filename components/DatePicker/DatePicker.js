// @flow

import classNames from 'classnames';
import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';

import filterProps from '../filterProps';
import Icon from '../Icon';
import Input from '../Input';
import Picker from './Picker';
import dateParser from './dateParser';

import styles from './DatePicker.less';

const INPUT_PASS_PROPS = {
  disabled: true,
  error: true,
  warning: true,

  onInput: true,
  onKeyDown: true,
  onKeyPress: true,
  onKeyUp: true,
};

type Props = {
  className?: string, // legacy
  disabled?: bool,
  error?: bool,
  warning?: bool,
  withMask?: bool,
  maxYear?: number,
  minYear?: number,
  value: ?Date,
  width?: number | string,
  onBlur?: () => void,
  onChange?: (e: { target: { value: ?Date } }, v: ?Date) => void,
  onFocus?: () => void,
  onInput?: (e: SyntheticInputEvent) => void,
  onKeyDown?: (e: SyntheticKeyboardEvent) => void,
  onKeyPress?: (e: SyntheticKeyboardEvent) => void,
  onKeyUp?: (e: SyntheticKeyboardEvent) => void,
};

type State = {
  opened: bool,
  textValue: string,
  error: bool,
};

export default class DatePicker extends React.Component {
  static propTypes = {
    disabled: PropTypes.bool,

    error: PropTypes.bool,

    warning: PropTypes.bool,

    /**
     * Маска ввода 99.99.9999
     */
    withMask: PropTypes.bool,

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
    withMask: false,
  };

  props: Props;
  state: State;

  _focused = false;
  _cursorPosition = 0;

  constructor(props: Props, context: mixed) {
    super(props, context);

    this.state = {
      textValue: formatDate(props.value),
      opened: false,
      error: false,
    };
  }

  render() {
    const value = checkDate(this.props.value);
    let picker = null;
    if (this.state.opened) {
      picker = (
        <div className={styles.picker} onKeyDown={this.handlePickerKey}>
          <Picker value={value}
                  minYear={this.props.minYear} maxYear={this.props.maxYear}
                  onPick={this.handlePick} onClose={this.handlePickerClose}
          />
        </div>
      );
    }
    const mask = this.props.withMask ? '99.99.9999' : null;
    const className = classNames({
      [styles.root]: true,
      [this.props.className || '']: true,
    });
    const openClassName = classNames({
      [styles.openButton]: true,
      [styles.openButtonDisabled]: this.props.disabled,
    });
    const outlineStyle = {
      display: this.state.opened ? 'block' : 'none',
    };
    return (
      <span className={className}
            style={{width: this.props.width}}
            onMouseDown={this.preventSelection}
            onClick={this.getCursorPosition}
            onDoubleClick={this.createSelection}>
        <div className={styles.inputOutline} style={outlineStyle}/>
        <Input
          ref="input"
          {...filterProps(this.props, INPUT_PASS_PROPS)}
          value={this.state.textValue}
          error={this.state.error}
          mask={mask}
          maxLength="10"
          width="100%"
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          onKeyDown={this.handleDateComponentChange}
        />
        <div className={openClassName} onClick={this.open}>
          <Icon name="calendar"/>
        </div>
        {picker}
      </span>
    );
  }

  componentWillReceiveProps(newProps: Props) {
    //if (!this._focused) {
    const newTextValue = formatDate(newProps.value);

    if (this.state.textValue !== newTextValue && !this.state.error) {
      this.setState({textValue: newTextValue});
    }
    //}
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.textValue !== this.state.textValue && this._cursorPosition && this._focused) {
      this.refs.input.setSelectionRange(this._cursorPosition, this._cursorPosition);
    }
  }

  handleChange = (event: any) => {
    let value: string = event.target.value;
    if (!this.props.withMask) {
      value = value.replace(/[^\d\.]/g, '');
    }
    this.setState({
      textValue: value,
    });
  };

  handleDateComponentChange = (event: SyntheticKeyboardEvent) => {
    const dateValue = event.target.value;

    if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') return;
    if (!dateValue || dateValue.match(/_/)) return;
    if (event.target.selectionStart !== event.target.selectionEnd) return;

    const cursorPosition = event.target.selectionStart;
    if (cursorPosition === 0 || cursorPosition === 10) return;

    event.preventDefault();

    let [day, month, year] = dateValue.split('.');
    day = Number(day);
    month = Number(month);
    year = Number(year);

    let step = 0;
    if (event.key === 'ArrowUp') {
      step = 1;
    }
    if (event.key === 'ArrowDown') {
      step = -1;
    }

    let newDate;

    if (cursorPosition === 1) { // day
      newDate = parseDate(dateValue);
      newDate.setUTCDate(day + step);

    } else if (cursorPosition === 4) { // month
      let newMonth = month + step;
      let newYear = (newMonth > 12 || newMonth < 1) ? year + step : year;
      newMonth %= 12;
      const newMonthDaysAmount = getDaysAmount(newYear, newMonth);
      let newDay = Math.min(day, newMonthDaysAmount);
      newDate = new Date(Date.UTC(newYear, newMonth - 1, newDay));

    } else if (this._cursorPosition > 6 && this._cursorPosition < 10) { // year
      let newYear = year + step;
      const newMonthDaysAmount = getDaysAmount(newYear, month);
      let newDay = Math.min(day, newMonthDaysAmount);
      newDate = new Date(Date.UTC(newYear, month - 1, newDay));
    }

    this.setState({
      textValue: formatDate(newDate),
    });
    this._cursorPosition = cursorPosition;
  };

  preventSelection = (event: SyntheticMouseEvent) => {
    if (event.detail !== 1) {
      event.preventDefault();
    }
  };

  getCursorPosition = (event: any) => {
    const start = event.target.selectionStart;
    const end = event.target.selectionEnd;
    if (start !== end) return;
    this._cursorPosition = start;
  };

  createSelection = (event: SyntheticMouseEvent) => {
    let start, end;
    if (this._cursorPosition === 1) {
      start = 0;
      end = 2;
    } else if (this._cursorPosition === 4) {
      start = 3;
      end = 5;
    } else if (this._cursorPosition > 6 && this._cursorPosition < 10) {
      start = 6;
      end = 10;
    } else {
      start = end = this._cursorPosition;
    }
    this.refs.input.setSelectionRange(start, end);
  };

  handleFocus = () => {
    this._focused = true;

    if (this.props.onFocus) {
      this.props.onFocus();
    }
  };

  handleBlur = () => {
    this._focused = false;
    this._cursorPosition = 0;

    const {textValue} = this.state;

    const date = parseDate(textValue);

    if (!isEmptyStr(textValue) && !date) {
      this.setState({
        error: true,
      })
    } else {
      this.setState({
        textValue: formatDate(this.props.value),
        error: false,
      });

      if (this.props.onChange && +this.props.value !== +date) {
        this.props.onChange({target: {value: date}}, date);
      }
    }

    if (this.props.onBlur) {
      this.props.onBlur();
    }
  };

  handlePickerKey = (event: SyntheticKeyboardEvent) => {
    if (event.key === 'Escape') {
      this.close(true);
    }
  };

  handlePick = (date: Date) => {
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

  close(focus: bool) {
    this.setState({opened: false});
    if (focus) {
      setTimeout(() => this.refs.input.focus(), 0);
    }
  }

  focus() {
    this._focused = true;
    this.refs.input.focus();
  }
}

function checkDate(date) {
  if (date instanceof Date && !isNaN(date.getTime())) {
    return date;
  }
  return null;
}

function formatDate(date) {
  if (!date || !checkDate(date)) {
    return '';
  }

  const day = date.getUTCDate().toString().padStart(2, '0');
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  return `${day}.${month}.${date.getUTCFullYear()}`;
}

function parseDate(str) {
  const date = dateParser(str);
  if (!date) {
    return null;
  }
  return checkDate(date);
}

function getDaysAmount(year, month) {
  const date = new Date(Date.UTC(year, month, 0));
  return date.getUTCDate();
}

function isEmptyStr(str) {
  return (str === '__.__.____' || str === '');
}

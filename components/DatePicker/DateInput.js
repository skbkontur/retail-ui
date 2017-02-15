import React, {Component, PropTypes} from 'react';
import Input from '../Input';
import filterProps from '../filterProps';
import styles from './DateInput.less';

const INPUT_PASS_PROPS = {
  autoFocus: true,
  disabled: true,
  warning: true,
  error: true,

  onInput: true,
  onKeyPress: true,
  onKeyUp: true,
};

type Props = {
  disabled?: bool,
  value: string,
  getRef?: (ref: any) => void,
  onFocus?: () => void,
  onBlur?: () => void,
  onChange: () => void,
  opened: bool,
};

export default class DateInput extends Component {
  static propTypes = {
    getRef: PropTypes.func,
    opened: PropTypes.bool.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    onBlur: PropTypes.func,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func,
  };

  props: Props;

  _cursorPosition = 0;

  render() {
    const outlineStyle = {
      display: this.props.opened ? 'block' : 'none',
    };
    const mask = this.props.withMask ? '99.99.9999' : null;

    return (
      <div
        onMouseDown={this.preventSelection}
        onClick={this.getCursorPosition}
        onDoubleClick={this.createSelection}
      >
        <div className={styles.inputOutline} style={outlineStyle} />
        <Input
          {...filterProps(this.props, INPUT_PASS_PROPS)}
          mask={mask}
          maxLength={10}
          value={this.props.value}
          width="100%"
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          onChange={this.handleDateChange}
          onKeyDown={this.handleDateComponentChange}
          ref={this.getInputRef}
        />
      </div>
    );
  }

  componentDidMount() {
    if (this.props.getRef && this._input) {
      this.props.getRef(this._input);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value && this._cursorPosition) {
      this._input.setSelectionRange(this._cursorPosition, this._cursorPosition);
    }
  }

  preventSelection = (event: SyntheticMouseEvent) => {
    if (event.detail !== 1) {
      event.preventDefault();
    }
  };

  getCursorPosition = (event: any) => {
    event.stopPropagation();
    const start = event.target.selectionStart;
    const end = event.target.selectionEnd;
    if (start !== end) {
      return;
    }
    this._cursorPosition = start;
  };

  createSelection = () => {
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
    setTimeout(() => this._input.setSelectionRange(start, end), 0);
  };

  handleDateComponentChange = (event: SyntheticKeyboardEvent) => {
    if (this.checkIfBadKeyDownEvent(event)) {
      return;
    }
    this._cursorPosition = event.target.selectionStart;
    const newDate = this.createNewDate(event);
    this.props.onChange(newDate);
  };

  checkIfBadKeyDownEvent = (event: SyntheticKeyboardEvent) => {
    return (
      event.target.value.match(/_/) ||
      event.key !== 'ArrowUp' && event.key !== 'ArrowDown' ||
      event.target.selectionStart !== event.target.selectionEnd ||
      event.target.selectionStart === 0 ||
      event.target.selectionStart === 10
    );
  };

  handleDateChange = (event: any) => {
    let value: string = event.target.value;
    if (!this.props.withMask) {
      value = value.replace(/[^\d\.]/g, '');
    }
    this.props.onChange(value);
  };

  createNewDate = (event: SyntheticKeyboardEvent) => {
    event.preventDefault();

    const dateValue = event.target.value;
    const cursorPosition = event.target.selectionStart;

    let step = 0;
    if (event.key === 'ArrowUp') {
      step = 1;
    }
    if (event.key === 'ArrowDown') {
      step = -1;
    }

    let [day, month, year] = dateValue.split('.');
    day = Number(day);
    month = Number(month);
    year = Number(year);

    let newDate;

    if (cursorPosition === 1) { // day
      newDate = new Date(Date.UTC(year, month - 1, day + step));

    } else if (cursorPosition === 4) { // month
      let newMonth = month + step;
      let newYear = (newMonth > 12 || newMonth < 1) ? year + step : year;
      if (newMonth > 12) {
        newMonth -= 12;
      }
      if (newMonth < 1) {
        newMonth += 12;
      }
      const newMonthDaysAmount = getDaysAmount(newYear, newMonth);
      let newDay = Math.min(day, newMonthDaysAmount);
      newDate = new Date(Date.UTC(newYear, newMonth - 1, newDay));

    } else if (cursorPosition > 6 && cursorPosition < 10) { // year
      let newYear = year + step;
      const newMonthDaysAmount = getDaysAmount(newYear, month);
      let newDay = Math.min(day, newMonthDaysAmount);
      newDate = new Date(Date.UTC(newYear, month - 1, newDay));
    }

    return newDate;
  };

  handleFocus = () => {
    if (this.props.onFocus) {
      this.props.onFocus();
    }
  };

  handleBlur = e => {
    this._cursorPosition = 0;

    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  };

  getInputRef = (ref: any) => {
    this._input = ref;
  }
}

function getDaysAmount(year, month) {
  const date = new Date(Date.UTC(year, month, 0));
  return date.getUTCDate();
}

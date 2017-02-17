// @flow

import classNames from 'classnames';
import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

import filterProps from '../filterProps';
import Input from '../Input';
import Picker from './Picker';
import DateInput from './DateInput';
import dateParser from './dateParser';
import DropdownContainer from '../DropdownContainer/DropdownContainer';

import styles from './DatePicker.less';

const INPUT_PASS_PROPS = {
  autoFocus: true,
  disabled: true,
  warning: true,
  error: true,
  withMask: true,
  placeholder: true,
  size: true,

  onInput: true,
  onKeyDown: true,
  onKeyPress: true,
  onKeyUp: true,

  onMouseEnter: true,
  onMouseLeave: true,
  onMouseOver: true
};

type Props = {
  className?: string, // legacy
  disabled?: bool,
  error?: bool,
  warning?: bool,
  withMask?: bool,
  maxYear?: number,
  minYear?: number,
  placeholder?: string,
  size?: 'small' | 'medium' | 'large',
  value?: ?Date,
  width?: number | string,
  onBlur?: () => void,
  onChange?: (e: {target: {value: ?Date}}, v: ?Date) => void,
  onFocus?: () => void,
  onInput?: (e: SyntheticInputEvent) => void,
  onKeyDown?: (e: SyntheticKeyboardEvent) => void,
  onKeyPress?: (e: SyntheticKeyboardEvent) => void,
  onKeyUp?: (e: SyntheticKeyboardEvent) => void,
  onMouseEnter?: (e: SyntheticMouseEvent) => void,
  onMouseLeave?: (e: SyntheticMouseEvent) => void,
  onMouseOver?: (e: SyntheticMouseEvent) => void,
  onUnexpectedInput?: (value: string) => string | null,
};

type State = {
  opened: bool,
  textValue: string,
};

export default class DatePicker extends React.Component {
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

    value: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),

    warning: PropTypes.bool,

    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /**
     * Маска ввода 99.99.9999
     */
    withMask: PropTypes.bool,

    onBlur: PropTypes.func,

    onChange: PropTypes.func,

    onFocus: PropTypes.func,

    onInput: PropTypes.func,

    onKeyDown: PropTypes.func,

    onKeyPress: PropTypes.func,

    onKeyUp: PropTypes.func,

    onMouseEnter: PropTypes.func,

    onMouseLeave: PropTypes.func,

    onMouseOver: PropTypes.func,

    /**
     * Если не получилось распарсить дату,
     * можно получить содержимое инпута
     * (например, для валидации снаружи)
     */
    onUnexpectedInput: PropTypes.func
  };

  static defaultProps = {
    minYear: 1900,
    maxYear: 2100,
    width: 120,
    withMask: false,
    onUnexpectedInput: () => null
  };

  props: Props;
  state: State;

  input: Input;

  constructor(props: Props, context: mixed) {
    super(props, context);

    this.state = {
      opened: false
    };
  }

  render() {
    const { opened } = this.state;

    const value = checkDate(this.props.value);
    let picker = null;
    if (opened) {
      picker = (
        <DropdownContainer
          getParent={() => findDOMNode(this)}
          offsetY={1}
        >
          <Picker
            value={value}
            minYear={this.props.minYear}
            maxYear={this.props.maxYear}
            onPick={this.handlePick}
            onClose={this.handlePickerClose}
            iconRef={this.icon}
          />
        </DropdownContainer>
      );
    }

    const className = classNames({
      [styles.root]: true,
      [this.props.className || '']: true
    });
    return (
      <span className={className} style={{ width: this.props.width }}>
        <DateInput
          {...filterProps(this.props, INPUT_PASS_PROPS)}
          getIconRef={this.getIconRef}
          getInputRef={this.getInputRef}
          opened={opened}
          value={this.getValue()}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          onChange={this.handleChange}
          onIconClick={this.toggleCalendar}
        />
        {picker}
      </span>
    );
  }

  getValue = () => {
    const value = this.props.value
    if (value instanceof Date) {
      return formatDate(value);
    }
    if (typeof value === 'string') {
      return value;
    }
    return '';
  };

  handleChange = (value: Date | string) => {
    if (value === undefined) { return; }
    const { onChange, onUnexpectedInput } = this.props;
    if (!onChange) { return; }
    const newDate = getDateValue(value, onUnexpectedInput);
    onChange({ target: { value: newDate } }, newDate);
  };

  handleFocus = () => {
    if (this.props.onFocus) {
      this.props.onFocus();
    }
  };

  handleBlur = () => {
    const value = this.props.value;
    const date = parseDate(value);

    if (this.props.onChange) {
      const newDate = date === null ? getDateValue(value, this.props.onUnexpectedInput) : date;
      this.props.onChange({ target: { value: newDate } }, newDate);
    }

    if (this.props.onBlur) {
      this.props.onBlur();
    }
  };

  handlePick = (date: Date) => {
    if (this.props.onChange) {
      this.props.onChange({ target: { value: date } }, date);
    }
    this.close(true);
  };

  handlePickerClose = () => {
    this.close(false);
  };

  toggleCalendar = e => {
    if (this.props.disabled) {
      return;
    }
    if (this.state.opened) {
      e.preventDefault()
      this.close(false);
    } else {
      this.setState({ opened: true });
    }
  };

  close(focus: bool) {
    this.setState({ opened: false }, () => {
      if (focus) {
        this.input.focus();
      }
    });
  }

  getInputRef = (ref: Input) => {
    this.input = ref;
  };

  getIconRef = (ref: Span) => {
    this.icon = ref;
  };
}

const getDateValue = (value, onUnexpectedInput) => {
  if (value instanceof Date) {
    return value;
  }
  if (typeof value === 'string') {
    const newDate = parseDate(value, false);
    if (newDate) {
      return newDate;
    } else {
      return onUnexpectedInput(value);
    }
  }
  return null;
};

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

function parseDate(str, withCorrection) {
  const date = dateParser(str, withCorrection);
  if (!date) {
    return null;
  }
  return checkDate(date);
}

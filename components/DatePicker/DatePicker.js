// @flow

import classNames from 'classnames';
import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

import filterProps from '../filterProps';
import Icon from '../Icon';
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
  value: ?Date,
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

    validationMsg: PropTypes.string,

    validationType: PropTypes.oneOf(['text', 'balloon']),

    value: PropTypes.instanceOf(Date),

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

    onMouseOver: PropTypes.func
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
      opened: false
    };
  }

  render() {
    const {opened} = this.state;

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
          />
        </DropdownContainer>
      );
    }

    const className = classNames({
      [styles.root]: true,
      [this.props.className || '']: true
    });
    const openClassName = classNames({
      [styles.openButton]: true,
      [styles.openButtonDisabled]: this.props.disabled
    });
    const iconSize = this.props.size === 'large' ? 16 : 14;
    return (
      <span className={className} style={{width: this.props.width}}>
        <DateInput
          {...filterProps(this.props, INPUT_PASS_PROPS)}
          getRef={this.getInputRef}
          opened={opened}
          value={this.state.textValue}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          onChange={this.handleChange}
        />
        {picker}
      </span>
    );
  }

  componentWillReceiveProps(newProps: Props) {
    const newTextValue = formatDate(newProps.value);
    if (
      !this._focused &&
      !newProps.error &&
      this.state.textValue !== newTextValue
    ) {
      this.setState({textValue: newTextValue});
    }
  }

  handleChange = (newDate: Date | string) => {
    if (newDate === undefined) { return; }
    this.setState({
      textValue: newDate instanceof Date ? formatDate(newDate) : newDate,
    });
  };

  handleFocus = () => {
    if (this.props.onFocus) {
      this.props.onFocus();
    }
  };

  handleBlur = () => {
    this._focused = false;
    this._cursorPosition = 0;

    const {textValue} =  this.state;
    const date = parseDate(textValue);

    if (this.props.onChange && textValue !== formatDate(this.props.value) ) {
      this.props.onChange({target: {value: date}}, date);
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
      this.props.onChange({ target: { value: date } }, date);
    }
    this.close(true);
  };

  handlePickerClose = () => {
    this.close(false);
  };

  open = () => {
    if (!this.props.disabled) {
      this.setState({ opened: true });
    }
  };

  close(focus: bool) {
    this.setState({ opened: false });
    if (focus) {
      setTimeout(() => this.input.focus(), 0);
    }
  }

  focus() {
    this._focused = true;
    this.input.focus();
  }

  getInputRef = (ref) => {
    this.input = ref;
  };
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

// @flow

import events from 'add-event-listener';
import classNames from 'classnames';
import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

import listenFocusOutside, {
  containsTargetOrRenderContainer
} from '../../lib/listenFocusOutside';

import filterProps from '../filterProps';
import Input from '../Input';
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
  disabled?: boolean,
  error?: boolean,
  warning?: boolean,
  withMask?: boolean,
  maxYear?: number,
  minYear?: number,
  placeholder?: string,
  size?: 'small' | 'medium' | 'large',
  value?: ?(Date | string),
  width?: number | string,
  onBlur?: () => void,
  onChange?: (
    e: { target: { value: Date | string | null } },
    v: Date | string | null
  ) => void,
  onFocus?: () => void,
  onInput?: (e: SyntheticInputEvent) => void,
  onKeyDown?: (e: SyntheticKeyboardEvent) => void,
  onKeyPress?: (e: SyntheticKeyboardEvent) => void,
  onKeyUp?: (e: SyntheticKeyboardEvent) => void,
  onMouseEnter?: (e: SyntheticMouseEvent) => void,
  onMouseLeave?: (e: SyntheticMouseEvent) => void,
  onMouseOver?: (e: SyntheticMouseEvent) => void,
  onUnexpectedInput: (value: string) => any
};

type State = {
  opened: boolean,
  textValue: string
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

    // Flow type inheritance problem
    onUnexpectedInput: ((() => null): (x: string) => any)
  };

  props: Props;
  state: State;
  icon: Icon;
  input: Input;

  _focusSubscription: any;
  _focused: boolean;
  _ignoreBlur: boolean;

  constructor(props: Props, context: mixed) {
    super(props, context);

    const textValue = typeof props.value === 'string'
      ? props.value
      : formatDate(props.value);

    this.state = {
      opened: false,
      textValue
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
          offsetY={0}
        >
          <Picker
            value={value}
            minYear={this.props.minYear}
            maxYear={this.props.maxYear}
            onPick={this.handlePick}
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
      <label
        className={className}
        style={{ width: this.props.width }}
        ref={this._ref}
      >
        <DateInput
          {...filterProps(this.props, INPUT_PASS_PROPS)}
          getIconRef={this.getIconRef}
          getInputRef={this.getInputRef}
          opened={opened}
          value={this.state.textValue}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          onIconClick={this.toggleCalendar}
        />
        {picker}
      </label>
    );
  }

  componentDidUpdate({ value: oldValue }: Props) {
    const { value: newValue } = this.props;
    if (newValue !== oldValue) {
      const textValue = typeof newValue === 'string'
        ? newValue
        : formatDate(newValue);

      this.setState({ textValue });
    }
  }

  _ref = (el: HTMLElement) => {
    if (this._focusSubscription) {
      this._focusSubscription.remove();
      this._focusSubscription = null;

      events.removeEventListener(
        document,
        'mousedown',
        this._handleNativeDocClick
      );
    }

    if (el) {
      this._focusSubscription = listenFocusOutside(
        [findDOMNode(this)],
        this.handleBlur
      );
      events.addEventListener(
        document,
        'mousedown',
        this._handleNativeDocClick
      );
    }
  };

  _handleNativeDocClick = (e) => {
    const containsTarget = containsTargetOrRenderContainer(e.target);

    if (!containsTarget(findDOMNode(this))) {
      this.handleBlur();
    }
  };

  getValue = () => {
    const value = this.props.value;
    if (value instanceof Date) {
      return formatDate(value);
    }
    if (typeof value === 'string') {
      return value;
    }
    return '';
  };

  handleChange = (value: string) => {
    this.setState({ textValue: value });
  };

  handleFocus = () => {
    if (this._focused) {
      return;
    }

    this._focused = true;
    if (this.props.onFocus) {
      this.props.onFocus();
    }
  };

  handleBlur = () => {
    if (this._ignoreBlur) {
      this._ignoreBlur = false;
      return;
    }

    if (!this._focused) {
      return;
    }

    this._focused = false;

    this.close(false);

    const value = this.state.textValue;
    const date = parseDate(value);
    const newDate = date === null
      ? getDateValue(value, this.props.onUnexpectedInput)
      : date;

    this.setState({ textValue: formatDate(newDate) });

    if (this.props.onChange) {
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
    this._focused = false;
    this.close(false);
  };

  handlePickerClose = () => {
    this.close(false);
  };

  toggleCalendar = (e: Event) => {
    if (this.props.disabled) {
      return;
    }

    this._ignoreBlur = true;

    if (this.state.opened) {
      this.close(false);
    } else {
      this.setState({ opened: true });
    }
  };

  close(focus: boolean) {
    this.setState({ opened: false }, () => {
      if (focus) {
        this.input.focus();
      }
    });
  }

  getInputRef = (ref: Input) => {
    this.input = ref;
  };

  getIconRef = (ref: Icon) => {
    this.icon = ref;
  };
}

const getDateValue = (value, onUnexpectedInput) => {
  if (value == null) {
    return null;
  }
  if (value instanceof Date) {
    return value;
  }
  const newDate = parseDate(value, false);
  if (newDate) {
    return newDate;
  }
  if (onUnexpectedInput) {
    return onUnexpectedInput(value);
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

// @flow

import classNames from 'classnames';
import PropTypes from 'prop-types';
import * as React from 'react';
import { findDOMNode } from 'react-dom';
import warning from 'warning';

import filterProps from '../filterProps';
import Input from '../Input';
import Picker from './Picker';
import DateInput from './DateInput';
import dateParser from './dateParser';
import DropdownContainer from '../DropdownContainer/DropdownContainer';
import RenderLayer from '../RenderLayer';
import Icon from '../Icon';
import Center from '../Center';

import * as dateTransformers from './dateTransformers';
import type { DateTransformer } from './dateTransformers';
import { dateFormat } from './dateFormat';
import type { CalendarDateShape } from '../Calendar';
import { type DateShape, tryGetValidDateShape, isValidDate } from './DateShape';

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

type Props<T> = {|
  // @ignore
  className?: string, // legacy
  dateTransformer: DateTransformer<T>,
  disabled?: boolean,
  enableTodayLink?: boolean,
  error?: boolean,
  minDate?: T,
  maxDate?: T,
  /** @ignore */
  maxYear?: number,
  /** @ignore */
  minYear?: number,
  menuAlign?: 'left' | 'right',
  placeholder?: string,
  size?: 'small' | 'medium' | 'large',
  value?: T | null,
  warning?: boolean,
  width?: number | string,
  withMask?: boolean,
  onBlur?: () => void,
  onChange?: (e: { target: { value: T | null } }, v: T | null) => void,
  onFocus?: () => void,
  onInput?: (e: SyntheticInputEvent<>) => void,
  onKeyDown?: (e: SyntheticKeyboardEvent<>) => void,
  onKeyPress?: (e: SyntheticKeyboardEvent<>) => void,
  onKeyUp?: (e: SyntheticKeyboardEvent<>) => void,
  onMouseEnter?: (e: SyntheticMouseEvent<>) => void,
  onMouseLeave?: (e: SyntheticMouseEvent<>) => void,
  onMouseOver?: (e: SyntheticMouseEvent<>) => void
|};

type State = {
  opened: boolean,
  textValue: string
};

// eslint-disable-next-line flowtype/no-weak-types
class DatePicker<T: any> extends React.Component<Props<T>, State> {
  static propTypes = {
    /**
     * Объект с двумя методами: `to`, `from`.
     *
     * Метод `to` принимает на вход объект типа `{date: number, month: number, year: number}`,
     * и возвразает объект даты который будет приходить в `onChange`
     *
     * Метод `from` принимает на вход объект даты,
     * и возвразает объект типа `{date: number, month: number, year: number}`
     *
     * В `DatePicker.dateTransformers` содрежится два трансформера:
     *
     * `utcDateTransformer` - возвращает дату в UTC
     *
     * `localDateTransformer` - возвращает дату в локальном часовом поясе
     */
    dateTransformer: PropTypes.shape({
      from: PropTypes.func,
      to: PropTypes.func
    }),

    disabled: PropTypes.bool,

    /**
     * Включает кнопку сегодня в календаре
     */
    enableTodayLink: PropTypes.bool,

    error: PropTypes.bool,

    /**
     * Максимальная дата в календаре.
     */
    maxDate: PropTypes.object,

    menuAlign: PropTypes.oneOf(['left', 'right']),

    /**
     * Минимальная дата в календаре.
     */
    minDate: PropTypes.object,

    /**
     * Объект даты или `null`
     */
    value: PropTypes.object,

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
    dateTransformer: dateTransformers.defaultTransformer,
    width: 120,
    withMask: true
  };

  static dateTransformers = dateTransformers;

  static isValidDate = isValidDate;

  input: Input;

  _focusSubscription: *;
  _focused: boolean;

  constructor(props: Props<T>, context: mixed) {
    super(props, context);

    this.state = {
      opened: false,
      textValue: this._getFormattedValue()
    };
  }

  /**
   * @public
   */
  blur() {
    this.input.blur();
    this.handleBlur();
  }

  /**
   * @public
   */
  focus() {
    this.input.focus();
    this.handleFocus();
  }

  render() {
    const { opened } = this.state;
    const { value, menuAlign, dateTransformer } = this.props;

    const dateShape: DateShape | null =
      value != null ? dateTransformer.from(value) : null;
    const date = dateShape && tryGetValidDateShape(dateShape);
    let picker = null;
    if (opened) {
      picker = (
        <DropdownContainer
          getParent={() => findDOMNode(this)}
          offsetY={2}
          align={menuAlign}
        >
          <Picker
            value={date}
            minDate={this._getMinDate()}
            maxDate={this._getMaxDate()}
            onPick={this.handlePick}
            onSelect={this._handleSelect}
            enableTodayLink={this.props.enableTodayLink}
          />
        </DropdownContainer>
      );
    }

    const className = classNames({
      [styles.root]: true,
      [this.props.className || '']: true
    });
    const iconSize = this.props.size === 'large' ? 16 : 14;
    const openClassName = classNames({
      [styles.openButton]: true,
      [styles.openButtonDisabled]: this.props.disabled
    });
    return (
      <RenderLayer
        onClickOutside={this.handleBlur}
        onFocusOutside={this.handleBlur}
        active={opened}
      >
        <label className={className} style={{ width: this.props.width }}>
          <DateInput
            {...filterProps(this.props, INPUT_PASS_PROPS)}
            getInputRef={this.getInputRef}
            opened={opened}
            value={this.state.textValue}
            onFocus={this.handleFocus}
            onChange={this.handleChange}
            onSubmit={this._handleSubmit}
          />
          {picker}
          <Center
            className={openClassName}
            onMouseDown={e => e.preventDefault()}
          >
            <Icon name="calendar" size={iconSize} />
          </Center>
        </label>
      </RenderLayer>
    );
  }

  componentWillReceiveProps({ value: newValue }: Props<T>) {
    const { value: oldValue } = this.props;
    if (newValue !== oldValue) {
      const textValue = newValue
        ? formatDate(newValue, this.props.dateTransformer)
        : '';

      this.setState({ textValue });
    }
  }

  _getMinDate = () => {
    const { minDate, minYear, dateTransformer } = this.props;
    if (minDate) {
      let date = tryGetValidDateShape(dateTransformer.from(minDate));
      return date || undefined;
    }
    if (minYear) {
      warning(
        minYear,
        'Property minYear is obsolete, please use minDate instead'
      );
      return { date: 1, month: 0, year: minYear };
    }
    return undefined;
  };

  _getMaxDate = () => {
    const { maxDate, maxYear, dateTransformer } = this.props;
    if (maxDate) {
      let date = tryGetValidDateShape(dateTransformer.from(maxDate));
      return date || undefined;
    }
    if (maxYear) {
      warning(
        maxYear,
        'Property minYear is obsolete, please use minDate instead'
      );
      return { date: 31, month: 12, year: maxYear };
    }
    return undefined;
  };

  _getFormattedValue = () => {
    return this.props.value
      ? formatDate(this.props.value, this.props.dateTransformer)
      : '';
  };

  handleChange = (value: string) => {
    this.setState({ textValue: value });
  };

  handleFocus = () => {
    if (this._focused) {
      return;
    }

    this._focused = true;

    this.setState({ opened: true });

    if (this.props.onFocus) {
      this.props.onFocus();
    }
  };

  handleBlur = () => {
    if (!this._focused) {
      return;
    }

    this._focused = false;

    this.close(false);

    this._handleSubmit();

    if (this.props.onBlur) {
      this.props.onBlur();
    }
  };

  _handleSubmit = () => {
    const newDate = parseTextValue(this.state.textValue);
    if (this.props.onChange) {
      const date = newDate && this.props.dateTransformer.to(newDate);
      this.props.onChange({ target: { value: date } }, date);
    }
    this.blur();
  };

  handlePick = (dateShape: CalendarDateShape) => {
    const date = this.props.dateTransformer.to(dateShape);
    if (this.props.onChange) {
      this.props.onChange({ target: { value: date } }, date);
    }
    this._focused = false;
    this.close(false);
    this.blur();
  };

  _handleSelect = dateShape => {
    const date = this.props.dateTransformer.to(dateShape);
    if (this.props.onChange) {
      this.props.onChange({ target: { value: date } }, date);
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
}

function parseTextValue(input) {
  return dateParser(trimMask(input));
}

function trimMask(input) {
  return input
    .replace(/_/g, '')
    .split('.')
    .filter(Boolean)
    .join('.');
}

function formatDate(date, dateTransformer) {
  const dateShape = dateTransformer.from(date);
  return dateFormat(dateShape);
}

export default DatePicker;

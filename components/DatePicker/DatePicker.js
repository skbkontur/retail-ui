// @flow

import PropTypes from 'prop-types';
import * as React from 'react';
import { findDOMNode } from 'react-dom';
import warning from 'warning';

import { isLess, isGreater } from '../Calendar/CalendarDateShape';
import filterProps from '../filterProps';
import Picker from './Picker';
import DateInput from '../DateInput';
import DropdownContainer from '../DropdownContainer/DropdownContainer';

import {
  formatDate,
  parseDateString,
  fillEmptyParts,
  isEmptyOrNullValue
} from './DatePickerHelpers';
import type { CalendarDateShape } from '../Calendar';
import { tryGetValidDateShape, isValidDate } from './DateShape';

import styles from './DatePicker.less';

const INPUT_PASS_PROPS = {
  autoFocus: true,
  disabled: true,
  warning: true,
  error: true,
  size: true,
  onKeyDown: true
};

type Props<T> = {
  autoFocus?: boolean,
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
  size?: 'small' | 'medium' | 'large',
  value: T | null,
  warning?: boolean,
  width?: number | string,
  onBlur?: () => void,
  onChange: (e: { target: { value: T } }, v: T) => void,
  onFocus?: () => void,
  onKeyDown?: (e: SyntheticKeyboardEvent<>) => void,
  onMouseEnter?: (e: SyntheticMouseEvent<>) => void,
  onMouseLeave?: (e: SyntheticMouseEvent<>) => void,
  onMouseOver?: (e: SyntheticMouseEvent<>) => void
};

type State = {
  opened: boolean
};

// eslint-disable-next-line flowtype/no-weak-types
class DatePicker extends React.Component<Props<string>, State> {
  static propTypes = {
    autoFocus: PropTypes.bool,

    disabled: PropTypes.bool,

    /**
     * Включает кнопку сегодня в календаре
     */
    enableTodayLink: PropTypes.bool,

    error: PropTypes.bool,

    /**
     * Максимальная дата в календаре.
     */
    maxDate: PropTypes.string,

    menuAlign: PropTypes.oneOf(['left', 'right']),

    /**
     * Минимальная дата в календаре.
     */
    minDate: PropTypes.string,

    /**
     * Строка даты или `null`
     */
    value: PropTypes.string.isRequired,

    warning: PropTypes.bool,

    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    onBlur: PropTypes.func,

    onChange: PropTypes.func.isRequired,

    onFocus: PropTypes.func,

    onKeyDown: PropTypes.func,

    onMouseEnter: PropTypes.func,

    onMouseLeave: PropTypes.func,

    onMouseOver: PropTypes.func
  };

  static defaultProps = {
    width: 120,
    minDate: '01.01.1900',
    maxDate: '31.12.2099'
  };

  static validate = (value: string) => isValidDate(parseDateString(value));

  input: DateInput | null;

  _focused: boolean;

  constructor(props: Props<string>) {
    super(props);

    this.state = {
      opened: false
    };
  }

  /**
   * @public
   */
  blur() {
    this.input && this.input.blur();
    this._handleBlur();
  }

  /**
   * @public
   */
  focus() {
    this.input && this.input.focus();
    this._handleFocus();
  }

  close() {
    this.setState({ opened: false });
  }

  render() {
    let picker = null;
    if (this.state.opened) {
      picker = (
        <DropdownContainer
          getParent={() => findDOMNode(this)}
          offsetY={2}
          align={this.props.menuAlign}
        >
          <Picker
            value={this._getDate()}
            minDate={this._getMinDate()}
            maxDate={this._getMaxDate()}
            onPick={this._handlePick}
            onSelect={this._handleSelect}
            enableTodayLink={this.props.enableTodayLink}
          />
        </DropdownContainer>
      );
    }

    return (
      <div>
        <label
          className={styles.root}
          style={{ width: this.props.width }}
          onMouseEnter={this.props.onMouseEnter}
          onMouseLeave={this.props.onMouseLeave}
          onMouseOver={this.props.onMouseOver}
        >
          <DateInput
            {...filterProps(this.props, INPUT_PASS_PROPS)}
            ref={this._getInputRef}
            value={this.props.value || ''}
            width="100%"
            withIcon
            minDate={this.props.minDate}
            maxDate={this.props.maxDate}
            onBlur={this._handleBlur}
            onFocus={this._handleFocus}
            onChange={this.props.onChange}
          />
          {picker}
        </label>
      </div>
    );
  }

  _getInputRef = ref => {
    this.input = ref;
  };

  _getDate() {
    const { value } = this.props;
    let date = null;
    if (value != null) {
      date = tryGetValidDateShape(parseDateString(value));
    }
    if (date) {
      const minDate = this._getMinDate();
      const maxDate = this._getMaxDate();
      if (
        (minDate && isLess(date, minDate)) ||
        (maxDate && isGreater(date, maxDate))
      ) {
        date = null;
      }
    }
    return date;
  }

  _getMinDate = () => {
    const { minDate, minYear } = this.props;
    if (minDate) {
      let date = tryGetValidDateShape(parseDateString(minDate));
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
    const { maxDate, maxYear } = this.props;
    if (maxDate) {
      let date = tryGetValidDateShape(parseDateString(maxDate));
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

  _handleFocus = () => {
    if (this._focused) {
      return;
    }

    this._focused = true;

    this.setState({ opened: true });

    if (this.props.onFocus) {
      this.props.onFocus();
    }
  };

  _handleBlur = () => {
    if (!this._focused) {
      return;
    }

    const { value, onChange, onBlur } = this.props;
    if (!isEmptyOrNullValue(value)) {
      const filledDate = fillEmptyParts(value);
      if (filledDate !== value) {
        onChange({ target: { value: filledDate } }, filledDate);
      }
    }

    this._focused = false;
    this.close();

    if (onBlur) {
      onBlur();
    }
  };

  _handlePick = (dateShape: CalendarDateShape) => {
    this._handleSelect(dateShape);
    this.blur();
  };

  _handleSelect = dateShape => {
    const date = formatDate(dateShape);
    if (this.props.onChange) {
      this.props.onChange({ target: { value: date } }, date);
    }
  };
}

export default DatePicker;

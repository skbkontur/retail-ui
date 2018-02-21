// @flow

import PropTypes from 'prop-types';
import * as React from 'react';
import { findDOMNode } from 'react-dom';
import warning from 'warning';

import filterProps from '../filterProps';
import Input from '../Input';
import Picker from './Picker';
import DateInput from '../DateInput';
import DropdownContainer from '../DropdownContainer/DropdownContainer';
import RenderLayer from '../RenderLayer';

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

type Props<T> = {|
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
  onChange: (e: { target: { value: T | null } }, v: T | null) => void,
  onFocus?: () => void,
  onKeyDown?: (e: SyntheticKeyboardEvent<>) => void,
  onMouseEnter?: (e: SyntheticMouseEvent<>) => void,
  onMouseLeave?: (e: SyntheticMouseEvent<>) => void,
  onMouseOver?: (e: SyntheticMouseEvent<>) => void
|};

type State = {
  opened: boolean
};

// eslint-disable-next-line flowtype/no-weak-types
class DatePicker extends React.Component<Props<string>, State> {
  static propTypes = {
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
    width: 120
  };

  static isValidDate = isValidDate;

  input: Input;

  _focusSubscription: *;
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
    this.input.blur();
    this._handleBlur();
  }

  /**
   * @public
   */
  focus() {
    this.input.focus();
    this._handleFocus();
  }

  render() {
    const { opened } = this.state;
    const { value, menuAlign } = this.props;

    const date =
      value != null ? tryGetValidDateShape(parseDateString(value)) : null;
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
            onPick={this._handlePick}
            onSelect={this._handleSelect}
            enableTodayLink={this.props.enableTodayLink}
          />
        </DropdownContainer>
      );
    }

    return (
      <RenderLayer
        onClickOutside={this._handleBlur}
        onFocusOutside={this._handleBlur}
        active={opened}
      >
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
            onFocus={this._handleFocus}
            onChange={this.props.onChange}
            onKeyDown={this._handleKeyDown}
          />
          {picker}
        </label>
      </RenderLayer>
    );
  }

  _getInputRef = (ref: Input) => {
    this.input = ref;
  };

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

  _handleKeyDown = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.blur();
    }
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
    this.close(false);

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

  close(focus: boolean) {
    this.setState({ opened: false }, () => {
      if (focus) {
        this.input.focus();
      }
    });
  }
}

export default DatePicker;

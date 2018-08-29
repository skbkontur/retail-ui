import * as PropTypes from 'prop-types';
import * as React from 'react';
import { findDOMNode } from 'react-dom';

import { isLess, isGreater } from '../Calendar/CalendarDateShape';
import filterProps from '../filterProps';
import Picker from './Picker';
import DateInput from '../DateInput';
import DropdownContainer from '../DropdownContainer/DropdownContainer';

import { formatDate, parseDateString } from './DatePickerHelpers';
import { CalendarDateShape } from '../Calendar';
import { tryGetValidDateShape, isValidDate } from './DateShape';

import styles = require('./DatePicker.less');
import { Nullable } from '../../typings/utility-types';

const INPUT_PASS_PROPS = {
  autoFocus: true,
  disabled: true,
  warning: true,
  error: true,
  size: true,
  onKeyDown: true
};

export interface DatePickerProps<T> {
  autoFocus?: boolean;
  disabled?: boolean;
  enableTodayLink?: boolean;
  error?: boolean;
  minDate?: T;
  maxDate?: T;
  menuAlign?: 'left' | 'right';
  size?: 'small' | 'medium' | 'large';
  value: T | null;
  warning?: boolean;
  width?: number | string;
  onBlur?: () => void;
  onChange: (e: { target: { value: T } }, v: T) => void;
  onFocus?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<any>) => void;
  onMouseEnter?: (e: React.MouseEvent<any>) => void;
  onMouseLeave?: (e: React.MouseEvent<any>) => void;
  onMouseOver?: (e: React.MouseEvent<any>) => void;
}

export interface DatePickerState {
  opened: boolean;
}

// eslint-disable-next-line flowtype/no-weak-types
class DatePicker extends React.Component<
  DatePickerProps<string>,
  DatePickerState
> {
  public static propTypes = {
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
     * Строка формата `dd.mm.yyyy`
     */
    value: PropTypes.string,

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

  public static defaultProps = {
    width: 120,
    minDate: '01.01.1900',
    maxDate: '31.12.2099'
  };

  public static validate = (value: Nullable<string>) => {
    if (!value) {
      return false;
    }

    return isValidDate(parseDateString(value));
  };

  private input: DateInput | null = null;

  private _focused: boolean = false;

  constructor(props: DatePickerProps<string>) {
    super(props);

    this.state = {
      opened: false
    };
  }

  /**
   * @public
   */
  public blur() {
    if (this.input) {
      this.input.blur();
    }
    this._handleBlur();
  }

  /**
   * @public
   */
  public focus() {
    if (this.input) {
      this.input.focus();
    }
    this._handleFocus();
  }

  public close() {
    this.setState({ opened: false });
  }

  public render(): JSX.Element {
    let picker = null;
    if (this.state.opened) {
      picker = (
        <DropdownContainer
          // tslint:disable-next-line:jsx-no-lambda
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
    );
  }

  private _getInputRef = (ref: DateInput | null) => {
    this.input = ref;
  };

  private _getDate() {
    const { value } = this.props;
    let date = value ? tryGetValidDateShape(parseDateString(value)) : null;
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

  private _getMinDate = () => {
    const { minDate } = this.props;
    const date = minDate && tryGetValidDateShape(parseDateString(minDate));
    return date || undefined;
  };

  private _getMaxDate = () => {
    const { maxDate } = this.props;
    const date = maxDate && tryGetValidDateShape(parseDateString(maxDate));
    return date || undefined;
  };

  private _handleFocus = () => {
    if (this._focused) {
      return;
    }

    this._focused = true;

    this.setState({ opened: true });

    if (this.props.onFocus) {
      this.props.onFocus();
    }
  };

  private _handleBlur = () => {
    if (!this._focused) {
      return;
    }

    this._focused = false;
    this.close();

    if (this.props.onBlur) {
      this.props.onBlur();
    }
  };

  private _handlePick = (dateShape: CalendarDateShape) => {
    this._handleSelect(dateShape);
    this.blur();
  };

  private _handleSelect = (dateShape: CalendarDateShape) => {
    const date = formatDate(dateShape);
    if (this.props.onChange) {
      this.props.onChange({ target: { value: date } }, date);
    }
  };
}

export default DatePicker;

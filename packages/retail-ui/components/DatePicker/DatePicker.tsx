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

import styles from './DatePicker.less';
import { Nullable } from '../../typings/utility-types';

const INPUT_PASS_PROPS = {
  autoFocus: true,
  disabled: true,
  warning: true,
  error: true,
  size: true,
  onKeyDown: true,
};

export interface DatePickerProps<T> {
  autoFocus?: boolean;
  disabled?: boolean;
  enableTodayLink?: boolean;
  error?: boolean;
  minDate: T;
  maxDate: T;
  menuAlign?: 'left' | 'right';
  size?: 'small' | 'medium' | 'large';
  value?: T | null;
  warning?: boolean;
  width: number | string;
  onBlur?: () => void;
  onChange: (e: { target: { value: T } }, v: T) => void;
  onFocus?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<any>) => void;
  onMouseEnter?: (e: React.MouseEvent<any>) => void;
  onMouseLeave?: (e: React.MouseEvent<any>) => void;
  onMouseOver?: (e: React.MouseEvent<any>) => void;

  /**
   * Функция для определения праздничных дней
   * @default (_day, isWeekend) => isWeekend
   * @param {T} day - строка в формате `dd.mm.yyyy`
   * @param {boolean} isWeekend - флаг выходного (суббота или воскресенье)
   * @returns {boolean} `true` для выходного или `false` для рабочего дня
   */
  isHoliday: (day: T, isWeekend: boolean) => boolean;
}

export interface DatePickerState {
  opened: boolean;
}

type DatePickerValue = string;

// eslint-disable-next-line flowtype/no-weak-types
class DatePicker extends React.Component<DatePickerProps<DatePickerValue>, DatePickerState> {
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
    maxDate: PropTypes.string.isRequired,

    menuAlign: PropTypes.oneOf(['left', 'right'] as Array<'left' | 'right'>),

    /**
     * Минимальная дата в календаре.
     */
    minDate: PropTypes.string.isRequired,

    /**
     * Строка формата `dd.mm.yyyy`
     */
    value: PropTypes.string,

    warning: PropTypes.bool,

    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,

    onBlur: PropTypes.func,

    onChange: PropTypes.func.isRequired,

    onFocus: PropTypes.func,

    onKeyDown: PropTypes.func,

    onMouseEnter: PropTypes.func,

    onMouseLeave: PropTypes.func,

    onMouseOver: PropTypes.func,

    isHoliday: PropTypes.func.isRequired,
  };

  public static defaultProps = {
    width: 120,
    minDate: '01.01.1900',
    maxDate: '31.12.2099',
    isHoliday: (_day: DatePickerValue, isWeekend: boolean) => isWeekend,
  };

  public static validate = (value: Nullable<string>) => {
    if (!value) {
      return false;
    }

    return isValidDate(parseDateString(value));
  };

  public state: DatePickerState = {
    opened: false,
  };

  private input: DateInput | null = null;

  private focused: boolean = false;

  public componentWillReceiveProps(nextProps: DatePickerProps<DatePickerValue>) {
    const { disabled } = nextProps;
    const { opened } = this.state;
    if (disabled && opened) {
      this.close();
    }
  }

  /**
   * @public
   */
  public blur() {
    if (this.input) {
      this.input.blur();
    }
    this.handleBlur();
  }

  /**
   * @public
   */
  public focus() {
    if (this.props.disabled) {
      return;
    }
    if (this.input) {
      this.input.focus();
    }
    this.handleFocus();
  }

  /**
   * Закрывает выпадашку выбора дня
   * @public
   */
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
            value={this.getDate()}
            minDate={this.getMinDate()}
            maxDate={this.getMaxDate()}
            onPick={this.handlePick}
            onSelect={this.handleSelect}
            enableTodayLink={this.props.enableTodayLink}
            isHoliday={this.isHoliday}
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
          ref={this.getInputRef}
          value={this.props.value || ''}
          width="100%"
          withIcon
          minDate={this.props.minDate}
          maxDate={this.props.maxDate}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          onChange={this.props.onChange}
        />
        {picker}
      </label>
    );
  }

  private getInputRef = (ref: DateInput | null) => {
    this.input = ref;
  };

  private getDate() {
    const { value } = this.props;
    let date = value ? tryGetValidDateShape(parseDateString(value)) : null;
    if (date) {
      const minDate = this.getMinDate();
      const maxDate = this.getMaxDate();
      if ((minDate && isLess(date, minDate)) || (maxDate && isGreater(date, maxDate))) {
        date = null;
      }
    }
    return date;
  }

  private getMinDate = () => {
    const { minDate } = this.props;
    const date = minDate && tryGetValidDateShape(parseDateString(minDate));
    return date || undefined;
  };

  private getMaxDate = () => {
    const { maxDate } = this.props;
    const date = maxDate && tryGetValidDateShape(parseDateString(maxDate));
    return date || undefined;
  };

  private handleFocus = () => {
    if (this.focused) {
      return;
    }

    this.focused = true;

    this.setState({ opened: true });

    if (this.props.onFocus) {
      this.props.onFocus();
    }
  };

  private handleBlur = () => {
    if (!this.focused) {
      return;
    }

    this.focused = false;
    this.close();

    if (this.props.onBlur) {
      this.props.onBlur();
    }
  };

  private handlePick = (dateShape: CalendarDateShape) => {
    this.handleSelect(dateShape);
    this.blur();
  };

  private handleSelect = (dateShape: CalendarDateShape) => {
    const date = formatDate(dateShape);
    if (this.props.onChange) {
      this.props.onChange({ target: { value: date } }, date);
    }
  };

  private isHoliday = ({ date, month, year, isWeekend }: CalendarDateShape & { isWeekend: boolean }) => {
    const dateString = formatDate({ date, month, year });
    return this.props.isHoliday(dateString, isWeekend);
  };
}

export default DatePicker;

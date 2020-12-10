import PropTypes from 'prop-types';
import React from 'react';
import { findDOMNode } from 'react-dom';
import cn from 'classnames';

import { InternalDate } from '../../lib/date/InternalDate';
import { InternalDateTransformer } from '../../lib/date/InternalDateTransformer';
import { MAX_FULLDATE, MIN_FULLDATE } from '../../lib/date/constants';
import { InternalDateOrder, InternalDateSeparator, InternalDateValidateCheck } from '../../lib/date/types';
import { Nullable, Override } from '../../typings/utility-types';
import { CalendarDateShape } from '../../internal/Calendar';
import { DateInput, DateInputProps } from '../DateInput';
import { DropdownContainer } from '../../internal/DropdownContainer';

import { Picker } from './Picker';
import { jsStyles } from './DatePicker.styles';

export type DatePickerProps<T> = Override<
  DateInputProps,
  {
    enableTodayLink?: boolean;
    minDate: T;
    maxDate: T;
    menuAlign?: 'left' | 'right';
    value?: T | null;
    onBlur?: () => void;
    /**
     * Вызывается при изменении `value`
     *
     * @param value - строка в формате `dd.mm.yyyy`.
     */
    onValueChange: (value: T) => void;
    onFocus?: () => void;

    /**
     * Функция для определения праздничных дней
     * @default (_day, isWeekend) => isWeekend
     * @param {T} day - строка в формате `dd.mm.yyyy`
     * @param {boolean} isWeekend - флаг выходного (суббота или воскресенье)
     *
     * @returns {boolean} `true` для выходного или `false` для рабочего дня
     */
    isHoliday: (day: T, isWeekend: boolean) => boolean;
  }
>;

export interface DatePickerState {
  opened: boolean;
}

type DatePickerValue = string;

export class DatePicker extends React.Component<DatePickerProps<DatePickerValue>, DatePickerState> {
  public static __KONTUR_REACT_UI__ = 'DatePicker';

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

    onValueChange: PropTypes.func.isRequired,

    onFocus: PropTypes.func,

    onKeyDown: PropTypes.func,

    onMouseEnter: PropTypes.func,

    onMouseLeave: PropTypes.func,

    onMouseOver: PropTypes.func,

    isHoliday: PropTypes.func.isRequired,
  };

  public static defaultProps = {
    width: 120,
    minDate: MIN_FULLDATE,
    maxDate: MAX_FULLDATE,
    isHoliday: (_day: DatePickerValue, isWeekend: boolean) => isWeekend,
  };

  public static validate = (value: Nullable<string>, range: { minDate?: string; maxDate?: string } = {}) => {
    if (!value) {
      return false;
    }

    const { minDate = MIN_FULLDATE, maxDate = MAX_FULLDATE } = range;
    const internalDate = new InternalDate({
      order: InternalDateOrder.DMY,
      separator: InternalDateSeparator.Dot,
    })
      .setRangeStart(new InternalDate({ value: minDate }))
      .setRangeEnd(new InternalDate({ value: maxDate }))
      .parseValue(value);

    return internalDate.validate({
      checks: [
        InternalDateValidateCheck.NotNull,
        InternalDateValidateCheck.Number,
        InternalDateValidateCheck.Native,
        InternalDateValidateCheck.Limits,
        InternalDateValidateCheck.Range,
      ],
    });
  };

  public state: DatePickerState = { opened: false };

  private input: DateInput | null = null;
  private focused = false;
  private internalDate?: InternalDate = this.parseValueToDate(this.props.value);
  private minDate?: InternalDate = this.parseValueToDate(this.props.minDate);
  private maxDate?: InternalDate = this.parseValueToDate(this.props.maxDate);

  public componentDidMount() {
    // if (this.props.autoFocus) {
    //   this.focus();
    // }
  }

  public UNSAFE_componentWillReceiveProps(nextProps: DatePickerProps<DatePickerValue>) {
    const { disabled } = nextProps;
    const { opened } = this.state;
    if (disabled && opened) {
      this.close();
    }
    this.internalDate = this.parseValueToDate(nextProps.value);
    this.minDate = this.parseValueToDate(nextProps.minDate);
    this.maxDate = this.parseValueToDate(nextProps.maxDate);
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
    const {
      menuAlign,
      enableTodayLink,
      isHoliday,
      width,
      className,
      style,
      'data-tid': datatid,
      'data-testid': datatestid,
      onMouseEnter,
      onMouseLeave,
      onMouseOver,
      ...inputProps
    } = this.props;

    let picker = null;
    const date = this.internalDate ? this.internalDate.toNativeFormat() : null;
    if (this.state.opened) {
      picker = (
        <DropdownContainer getParent={() => findDOMNode(this)} offsetY={2} align={menuAlign}>
          <Picker
            value={date}
            minDate={(this.minDate && this.minDate.toNativeFormat()) || undefined}
            maxDate={(this.maxDate && this.maxDate.toNativeFormat()) || undefined}
            onPick={this.handlePick}
            onSelect={this.handleSelect}
            enableTodayLink={enableTodayLink}
            isHoliday={this.isHoliday}
          />
        </DropdownContainer>
      );
    }

    const wrapperProps = {
      className: cn(className, jsStyles.root()),
      style: { width, ...style },
      onMouseEnter,
      onMouseLeave,
      onMouseOver,
      'data-tid': datatid,
      'data-testid': datatestid,
    };

    return (
      <label {...wrapperProps}>
        <DateInput
          {...inputProps}
          ref={this.getInputRef}
          value={this.props.value || ''}
          width="100%"
          withIcon
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
        />
        {picker}
      </label>
    );
  }

  private getInputRef = (ref: DateInput | null) => {
    this.input = ref;
  };

  private parseValueToDate(value?: Nullable<string>): InternalDate | undefined {
    if (value === undefined || value === null) {
      return undefined;
    }
    const date = new InternalDate({ value });
    if (date.validate({ checks: [InternalDateValidateCheck.NotNull, InternalDateValidateCheck.Native] })) {
      return date;
    }
    return undefined;
  }

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

  private handleSelect = ({ date, month, year }: CalendarDateShape) => {
    const value = InternalDateTransformer.dateToInternalString({ date, month: month + 1, year });
    if (this.props.onValueChange) {
      this.props.onValueChange(value);
    }
  };

  private isHoliday = ({ date, month, year, isWeekend }: CalendarDateShape & { isWeekend: boolean }) => {
    const dateString = InternalDateTransformer.dateToInternalString({ date, month: month + 1, year });
    return this.props.isHoliday(dateString, isWeekend);
  };
}

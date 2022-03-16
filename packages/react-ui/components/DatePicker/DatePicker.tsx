import PropTypes from 'prop-types';
import React from 'react';

import { InternalDate } from '../../lib/date/InternalDate';
import { InternalDateTransformer } from '../../lib/date/InternalDateTransformer';
import { MAX_FULLDATE, MIN_FULLDATE } from '../../lib/date/constants';
import { InternalDateOrder, InternalDateSeparator, InternalDateValidateCheck } from '../../lib/date/types';
import { Nullable } from '../../typings/utility-types';
import { CalendarDateShape } from '../../internal/Calendar';
import { DateInput } from '../DateInput';
import { DropdownContainer } from '../../internal/DropdownContainer';
import { filterProps } from '../../lib/filterProps';
import { CommonWrapper, CommonProps, CommonWrapperRestProps } from '../../internal/CommonWrapper';
import { isMobile } from '../../lib/client';
import { NativeDateInput } from '../../internal/NativeDateInput';
import { getRootNode, rootNode, TSetRootNode } from '../../lib/rootNode';
import { isNonNullable } from '../../lib/utils';

import { Picker } from './Picker';
import { styles } from './DatePicker.styles';

const INPUT_PASS_PROPS = {
  autoFocus: true,
  disabled: true,
  warning: true,
  error: true,
  size: true,
  onKeyDown: true,
};

export const MIN_WIDTH = 120;

export interface DatePickerProps<T> extends CommonProps {
  autoFocus?: boolean;
  disabled?: boolean;
  enableTodayLink?: boolean;
  /**
   * Cостояние валидации при ошибке.
   */
  error?: boolean;
  minDate: T;
  maxDate: T;
  menuAlign?: 'left' | 'right';
  size?: 'small' | 'medium' | 'large';
  value?: T | null;
  /**
   * Cостояние валидации при предупреждении.
   */
  warning?: boolean;
  width?: number | string;
  onBlur?: () => void;
  /**
   * Вызывается при изменении `value`
   *
   * @param value - строка в формате `dd.mm.yyyy`.
   */
  onValueChange: (value: T) => void;
  onFocus?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<any>) => void;
  onMouseEnter?: (e: React.MouseEvent<any>) => void;
  onMouseLeave?: (e: React.MouseEvent<any>) => void;
  onMouseOver?: (e: React.MouseEvent<any>) => void;
  /**
   * Использовать на мобильных устройствах нативный календарь для выбора дат.
   *
   * - На iOS нативный календарь не умеет работать с minDate и maxDate
   */
  useMobileNativeDatePicker?: boolean;

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

export interface DatePickerState {
  opened: boolean;
  canUseMobileNativeDatePicker: boolean;
}

type DatePickerValue = string;

@rootNode
export class DatePicker extends React.PureComponent<DatePickerProps<DatePickerValue>, DatePickerState> {
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

  public state: DatePickerState = { opened: false, canUseMobileNativeDatePicker: false };

  private input: DateInput | null = null;
  private focused = false;
  private minDate?: InternalDate = this.parseValueToDate(this.props.minDate);
  private maxDate?: InternalDate = this.parseValueToDate(this.props.maxDate);
  private setRootNode!: TSetRootNode;

  public componentDidMount() {
    if (this.props.useMobileNativeDatePicker && isMobile) {
      this.setState({
        canUseMobileNativeDatePicker: true,
      });
    }
    if (this.props.autoFocus) {
      this.focus();
    }
  }

  public componentDidUpdate() {
    const { disabled, minDate, maxDate } = this.props;
    const { opened } = this.state;
    if (disabled && opened) {
      this.close();
    }
    this.minDate = this.parseValueToDate(minDate);
    this.maxDate = this.parseValueToDate(maxDate);
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

  public render() {
    return (
      <CommonWrapper rootNodeRef={this.setRootNode} {...this.props}>
        {this.renderMain}
      </CommonWrapper>
    );
  }

  public renderMain = (props: CommonWrapperRestProps<DatePickerProps<DatePickerValue>>) => {
    let picker = null;
    const internalDate = this.parseValueToDate(this.props.value);
    const date = internalDate ? internalDate.toNativeFormat() : null;
    if (this.state.opened) {
      picker = (
        <DropdownContainer getParent={this.getParent} offsetY={2} align={this.props.menuAlign}>
          <Picker
            value={date}
            minDate={(this.minDate && this.minDate.toNativeFormat()) || undefined}
            maxDate={(this.maxDate && this.maxDate.toNativeFormat()) || undefined}
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
        className={styles.root()}
        style={this.getRootStyle()}
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}
        onMouseOver={this.props.onMouseOver}
      >
        <DateInput
          {...filterProps(props, INPUT_PASS_PROPS)}
          ref={this.getInputRef}
          value={this.props.value || ''}
          width="100%"
          withIcon
          minDate={this.props.minDate}
          maxDate={this.props.maxDate}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          onValueChange={this.props.onValueChange}
        />
        {this.state.canUseMobileNativeDatePicker && (
          <NativeDateInput
            onValueChange={this.props.onValueChange}
            value={this.props.value || ''}
            minDate={this.props.minDate}
            maxDate={this.props.maxDate}
            disabled={this.props.disabled}
          />
        )}
        {!this.state.canUseMobileNativeDatePicker && picker}
      </label>
    );
  };

  public getParent = () => {
    return getRootNode(this);
  };

  private getRootStyle = () => {
    const { width } = this.props;
    return isNonNullable(width) ? { width } : { minWidth: MIN_WIDTH };
  };

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

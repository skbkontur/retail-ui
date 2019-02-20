import * as React from 'react';
import {CSSProperties, HTMLProps} from 'react';
import DatePicker from "../DatePicker/DatePicker";

export interface DatePickerRangeValues {
  startValue: string;
  endValue: string;
}

interface DatePickerRangeUIProps {
  separator?: string | React.ReactNode;
  vertical?: boolean;
  horizontalMargin?: number;
  verticalMargin?: number;
  startWidth?: number;
  endWidth?: number;
  disableDefaultSeparator?: boolean;
}

interface DatePickerRangeValidationProps {
  error?: boolean;
  warning?: boolean;
  useFocusOnStartDatePicker?: boolean;
}

interface DatePickerRangeHandleEvents {
  onBlur?: (...args: any[]) => any;
  onChange?: (...args: any[]) => any;
  onFocus?: (...args: any[]) => any;
  onKeyDown?: (...args: any[]) => any;
  onMouseEnter?: (...args: any[]) => any;
  onMouseLeave?: (...args: any[]) => any;
  onMouseOver?: (...args: any[]) => any;
}

export interface DatePickerRangeProps
  extends DatePickerRangeValues, DatePickerRangeUIProps, DatePickerRangeValidationProps, DatePickerRangeHandleEvents {
  onStartChange: (e: { target: { value: string } }, v: string) => void;
  onEndChange: (e: { target: { value: string } }, v: string) => void;
  disableRange?: boolean;
}

export class DatePickerRange extends React.Component<DatePickerRangeProps> {
  private readonly _defaultSeparatorStyles: CSSProperties = {
    display: 'flex',
    width: 30,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: 0
  };

  private _datePickerRange: React.RefObject<HTMLDivElement> = React.createRef();
  private _startDatePicker: React.RefObject<DatePicker> = React.createRef();
  private _endDatePicker: React.RefObject<DatePicker> = React.createRef();

  private readonly _defaultSeparator = <span style={this._defaultSeparatorStyles}>—</span>;

  focus = () => {
    this.props.useFocusOnStartDatePicker
      ? this._startDatePicker && this._startDatePicker.current && this._startDatePicker.current.focus()
      : this._endDatePicker && this._endDatePicker.current && this._endDatePicker.current.focus();
  };

  blur = () => {
    this.props.useFocusOnStartDatePicker
      ? this._startDatePicker && this._startDatePicker.current && this._startDatePicker.current.blur()
      : this._endDatePicker && this._endDatePicker.current && this._endDatePicker.current.blur();
  };

  render(): JSX.Element {
    const {
      startValue,
      endValue,
      separator,
      disableDefaultSeparator,
      startWidth,
      endWidth,
      disableRange,
      vertical,
      verticalMargin,
      horizontalMargin,
      error,
      warning,
      onBlur,
      onFocus,
      onKeyDown,
      onMouseEnter,
      onMouseLeave,
      onMouseOver
    } = this.props;

    const commonDatePickerProps = {error, warning, onBlur, onFocus, onKeyDown, onMouseEnter, onMouseLeave, onMouseOver};

    const separatorProps: HTMLProps<HTMLSpanElement> = {
      style: {display: 'flex', alignItems: 'center'},
      onMouseEnter,
      onMouseLeave,
      onMouseOver
    };

    const wrapperStyle: CSSProperties = {
      display: 'flex',
      flexDirection: vertical ? 'column' : 'row'
    }

    const startWrapperStyles: CSSProperties = {
      marginBottom: (!separator && vertical && verticalMargin) || 'unset',
      marginRight: (!separator && !vertical && disableDefaultSeparator && horizontalMargin) || 'unset'
    }

    return (
      <div ref={this._datePickerRange} style={wrapperStyle}>
        <span style={startWrapperStyles}
              onFocus={this._onStartWrapperFocus}
              onBlur={this._onStartWrapperBlur}>
          <DatePicker ref={this._startDatePicker}
                      value={startValue}
                      onChange={this._onStartChange}
                      maxDate={!disableRange ? this.props.endValue : ''}
                      width={startWidth}
                      {...commonDatePickerProps}
          />
        </span>

        {!disableDefaultSeparator && (
          <span {...separatorProps}>
            {separator || (vertical ? null : this._defaultSeparator)}
          </span>
        )}

        <span onFocus={this._onEndWrapperFocus}
              onBlur={this._onEndWrapperBlur}>
          <DatePicker ref={this._endDatePicker}
                      error={error}
                      value={endValue}
                      onChange={this._onEndChange}
                      minDate={!disableRange ? this.props.startValue : ''}
                      width={endWidth}
                      {...commonDatePickerProps}
          />
         </span>
      </div>
    );
  }

  private _onStartChange = (e: { target: { value: string } }, v: string) => {
    const {disableRange, onStartChange, onChange} = this.props;
    !disableRange && this.setState({minDate: v});
    onStartChange(e, v);
    onChange && onChange(e, v);
  }

  private _onEndChange = (e: { target: { value: string } }, v: string) => {
    const {disableRange, onEndChange, onChange} = this.props;
    !disableRange && this.setState({maxDate: v});
    onEndChange(e, v);
    onChange && onChange(e, v);
  }

  private _onStartWrapperFocus = () => {
    if (this._startDatePicker && this._startDatePicker.current && this.props.error) {
      this._startDatePicker.current.focus();
    }
  }

  private _onStartWrapperBlur = () => {
    if (this._startDatePicker && this._startDatePicker.current && this.props.error) {
      this._startDatePicker.current.blur();
    }
  }

  private _onEndWrapperFocus = () => {
    if (this._endDatePicker && this._endDatePicker.current) {
      this._endDatePicker.current.focus();
    }
  }

  private _onEndWrapperBlur = () => {
    if (this._endDatePicker && this._endDatePicker.current) {
      this._endDatePicker.current.blur();
    }
  }
}

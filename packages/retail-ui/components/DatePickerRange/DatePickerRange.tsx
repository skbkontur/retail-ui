import * as React from 'react';
import {CSSProperties, HTMLProps} from 'react';
import DatePicker from "../DatePicker/DatePicker";

export interface PeriodValues {
  startValue: string;
  endValue: string;
}

interface PeriodUIProps {
  separator?: string | JSX.Element;
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

interface HandleEvents {
  onBlur?: (...args: any[]) => any;
  onChange?: (...args: any[]) => any;
  onFocus?: (...args: any[]) => any;
  onKeyDown?: (...args: any[]) => any;
  onMouseEnter?: (...args: any[]) => any;
  onMouseLeave?: (...args: any[]) => any;
  onMouseOver?: (...args: any[]) => any;
}

export interface DatePickerRangeProps extends PeriodValues, PeriodUIProps, DatePickerRangeValidationProps, HandleEvents {
  onStartChange: (e: { target: { value: string } }, v: string) => void;
  onEndChange: (e: { target: { value: string } }, v: string) => void;
  disableRange?: boolean;
}

export class DatePickerRange extends React.Component<DatePickerRangeProps> {
  private readonly defaultSeparatorStyles: CSSProperties = {
    display: 'flex',
    width: 30,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: 0
  };

  private DatePickerRange: React.RefObject<HTMLDivElement> = React.createRef();
  private StartDatePicker: React.RefObject<DatePicker> = React.createRef();
  private EndDatePicker: React.RefObject<DatePicker> = React.createRef();

  private readonly defaultSeparator = <span style={this.defaultSeparatorStyles}>—</span>;

  focus = () => {
    this.props.useFocusOnStartDatePicker
      ? this.StartDatePicker && this.StartDatePicker.current && this.StartDatePicker.current.focus()
      : this.EndDatePicker && this.EndDatePicker.current && this.EndDatePicker.current.focus();
  };

  blur = () => {
    this.props.useFocusOnStartDatePicker
      ? this.StartDatePicker && this.StartDatePicker.current && this.StartDatePicker.current.blur()
      : this.EndDatePicker && this.EndDatePicker.current && this.EndDatePicker.current.blur();
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
      <div ref={this.DatePickerRange} style={wrapperStyle}>
        <span style={startWrapperStyles}
              onFocus={this._onStartWrapperFocus}
              onBlur={this._onStartWrapperBlur}>
          <DatePicker ref={this.StartDatePicker}
                      value={startValue}
                      onChange={this._onStartChange}
                      maxDate={!disableRange ? this.props.endValue : ''}
                      width={startWidth}
                      {...commonDatePickerProps}
          />
        </span>

        {!disableDefaultSeparator && (
          <span {...separatorProps}>
            {separator || (vertical ? null : this.defaultSeparator)}
          </span>
        )}

        <span onFocus={this._onEndWrapperFocus}
              onBlur={this._onEndWrapperBlur}>
          <DatePicker ref={this.EndDatePicker}
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
    if (this.StartDatePicker && this.StartDatePicker.current && this.props.error) {
      this.StartDatePicker.current.focus();
    }
  }

  private _onStartWrapperBlur = () => {
    if (this.StartDatePicker && this.StartDatePicker.current && this.props.error) {
      this.StartDatePicker.current.blur();
    }
  }

  private _onEndWrapperFocus = () => {
    if (this.EndDatePicker && this.EndDatePicker.current) {
      this.EndDatePicker.current.focus();
    }
  }

  private _onEndWrapperBlur = () => {
    if (this.EndDatePicker && this.EndDatePicker.current) {
      this.EndDatePicker.current.blur();
    }
  }
}

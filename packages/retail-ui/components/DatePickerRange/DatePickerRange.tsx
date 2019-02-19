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
      error,
      warning,
      onBlur,
      onChange,
      onFocus,
      onKeyDown,
      onMouseEnter,
      onMouseLeave,
      onMouseOver
    } = this.props;

    const commonDatePickerProps = {
      error, warning, onBlur, onFocus, onKeyDown, onMouseEnter, onMouseLeave, onMouseOver
    };

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

    return (
      <div ref={this.DatePickerRange} style={wrapperStyle}>
        <span style={this.getStartWrapperStyles()}
              onFocus={this.onStartWrapperFocus}
              onBlur={this.onStartWrapperBlur}>
          <DatePicker ref={this.StartDatePicker}
                      value={startValue}
                      onChange={(e, v) => {
                        this.onStartChange(e, v);
                        onChange && onChange(e, v)
                      }}
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

        <span style={this.getEndWrapperStyles()}
              onFocus={this.onEndWrapperFocus}
              onBlur={this.onEndWrapperBlur}>
          <DatePicker ref={this.EndDatePicker}
                      error={error}
                      value={endValue}
                      onChange={(e, v) => {
                        this.onEndChange(e, v);
                        onChange && onChange(e, v);
                      }}
                      minDate={!disableRange ? this.props.startValue : ''}
                      width={endWidth}
                      {...commonDatePickerProps}
          />
         </span>
      </div>
    );
  }

  private onStartChange = (e: { target: { value: string } }, v: string) => {
    !this.props.disableRange && this.setState({minDate: v});
    this.props.onStartChange && this.props.onStartChange(e, v);
  }

  private onEndChange = (e: { target: { value: string } }, v: string) => {
    !this.props.disableRange && this.setState({maxDate: v});
    this.props.onEndChange && this.props.onEndChange(e, v);
  }

  private onStartWrapperFocus = () => {
    if (this.StartDatePicker && this.StartDatePicker.current && this.props.error) {
      this.StartDatePicker.current.focus();
    }
  }

  private onStartWrapperBlur = () => {
    if (this.StartDatePicker && this.StartDatePicker.current && this.props.error) {
      this.StartDatePicker.current.blur();
    }
  }

  private onEndWrapperFocus = () => {
    if (this.EndDatePicker && this.EndDatePicker.current) {
      this.EndDatePicker.current.focus();
    }
  }

  private onEndWrapperBlur = () => {
    if (this.EndDatePicker && this.EndDatePicker.current) {
      this.EndDatePicker.current.blur();
    }
  }

  private getStartWrapperStyles = (): CSSProperties => {
    const {separator, vertical, horizontalMargin, verticalMargin, disableDefaultSeparator} = this.props;

    return {
      marginBottom: (!separator && vertical && verticalMargin) || 'unset',
      marginRight: (!separator && !vertical && disableDefaultSeparator && horizontalMargin) || 'unset'
    }
  }

  private getEndWrapperStyles = (): CSSProperties => {
    return {};
  }
}

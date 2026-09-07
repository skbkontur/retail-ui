import React from 'react';

import { DatePicker } from '../../components/DatePicker/index.js';
import type { DatePickerProps } from '../../components/DatePicker/index.js';
import { DateRangePicker } from '../../components/DateRangePicker/index.js';
import { Tooltip } from '../../components/Tooltip/index.js';
import type { Nullable } from '../../typings/utility-types.js';

interface DatePickerPlaygroundState {
  value: Nullable<string>;
  error: boolean;
  tooltip: boolean;
}
type DatePickerPlaygroundProps = Partial<DatePickerProps>;
export class DatePickerPlayground extends React.Component<DatePickerPlaygroundProps> {
  public state: DatePickerPlaygroundState = {
    value: '17.06.2019',
    error: false,
    tooltip: false,
  };

  public render() {
    return (
      <Tooltip
        trigger={this.state.tooltip ? 'opened' : 'closed'}
        render={() => 'Такой даты не существует'}
        onCloseClick={this.removeTooltip}
      >
        <DatePicker
          {...this.props}
          disabled={this.props.disabled}
          size={this.props.size}
          error={this.state.error}
          value={this.state.value}
          onValueChange={this.handleChange}
          onFocus={this.invalidate}
          onBlur={this.validate}
          enableTodayLink
        />
      </Tooltip>
    );
  }

  private handleChange = (value: string) => {
    this.setState({
      value,
    });
  };

  private invalidate = () => {
    this.setState({ error: false, tooltip: false });
  };

  private validate = () => {
    const currentValue = this.state.value;
    this.setState(() => {
      const error = !!currentValue && !DatePicker.validate(currentValue);
      return {
        error,
        tooltip: error,
      };
    });
  };

  private removeTooltip = () => {
    this.setState({
      tooltip: false,
    });
  };
}

interface DateRangePickerPlaygroundState {
  valueStart: string;
  valueEnd: string;
}

export class DateRangePickerPlayground extends React.Component {
  public state: DateRangePickerPlaygroundState = {
    valueStart: '01.06.2019',
    valueEnd: '17.06.2019',
  };

  public render() {
    return (
      <DateRangePicker enableTodayLink width={320}>
        <DateRangePicker.Start value={this.state.valueStart} onValueChange={this.handleStartChange} />
        <DateRangePicker.Separator />
        <DateRangePicker.End value={this.state.valueEnd} onValueChange={this.handleEndChange} />
      </DateRangePicker>
    );
  }

  private handleStartChange = (value: string) => {
    this.setState({ valueStart: value });
  };

  private handleEndChange = (value: string) => {
    this.setState({ valueEnd: value });
  };
}

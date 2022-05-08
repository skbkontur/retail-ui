import React from 'react';

import { Tooltip } from '../../components/Tooltip';
import { DatePicker, DatePickerProps } from '../../components/DatePicker';

type DatePickerPlaygroundState = { tooltip: boolean } & Pick<DatePickerProps<any>, 'value' | 'error'>;
type DatePickerPlaygroundProps = Partial<DatePickerProps<any>>;
export class DatePickerPlayground extends React.Component<DatePickerPlaygroundProps, DatePickerPlaygroundState> {
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

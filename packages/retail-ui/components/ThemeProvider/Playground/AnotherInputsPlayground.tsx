/* tslint:disable jsx-no-lambda */
import * as React from 'react';
import Gapped from '../../Gapped/index';
import Tooltip from '../../Tooltip/index';
import DatePicker from '../../DatePicker/index';

export class DatePickerPlayground extends React.Component<any, any> {
  public state = {
    value: '17.06.2019',
    error: false,
    tooltip: false,
  };

  public render() {
    return (
      <Gapped>
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
            onChange={this.handleChange}
            onFocus={this.invalidate}
            onBlur={this.validate}
            enableTodayLink
          />
        </Tooltip>
      </Gapped>
    );
  }

  private handleChange = (_: any, value: string) => {
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

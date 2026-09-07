import React from 'react';

import { DateInput } from '../../components/DateInput/index.js';
import type { DateInputProps } from '../../components/DateInput/index.js';

interface DateInputPlaygroundState {
  value: string;
}

export class DateInputPlayground extends React.Component<Partial<DateInputProps>> {
  public state: DateInputPlaygroundState = { value: '17.06.2019' };

  public render() {
    return <DateInput {...this.props} value={this.state.value} onValueChange={this.handleChange} />;
  }

  private handleChange = (value: string) => {
    this.setState({ value });
  };
}

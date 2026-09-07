import React from 'react';

import { TimePicker } from '../../components/TimePicker/index.js';
import type { TimePickerProps } from '../../components/TimePicker/index.js';

const items = ['08:00', '09:00', '10:00', '11:00'];

interface TimePickerPlaygroundState {
  value: string;
}

export class TimePickerPlayground extends React.Component<Partial<TimePickerProps>> {
  public state: TimePickerPlaygroundState = { value: '09:00' };

  public render() {
    return <TimePicker {...this.props} source={items} value={this.state.value} onValueChange={this.handleChange} />;
  }

  private handleChange = (value: string) => {
    this.setState({ value });
  };
}

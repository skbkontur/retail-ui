import React, { ChangeEvent } from 'react';
import { InputProps } from '../Input';
import Input from '../Input/Input';

export class ControlledInput extends React.Component<InputProps, { value: string }> {
  public state = {
    value: '',
  };

  public render() {
    return <Input {...this.props} value={this.props.value || this.state.value} onChange={this.handleChange} />;
  }

  private handleChange = (e: ChangeEvent<HTMLInputElement>, value: string) => {
    if (this.props.onChange) {
      this.props.onChange(e, value);
    } else {
      this.setState({ value });
    }
  };
}

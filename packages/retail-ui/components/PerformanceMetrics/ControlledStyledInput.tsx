import React, { ChangeEvent } from 'react';
import { StyledInputProps } from '../StyledInput';
import StyledInput from '../StyledInput/StyledInput';

export class ControlledStyledInput extends React.Component<StyledInputProps, { value: string }> {
  public state = {
    value: '',
  };

  public render() {
    return <StyledInput {...this.props} value={this.props.value || this.state.value} onChange={this.handleChange} />;
  }

  private handleChange = (e: ChangeEvent<HTMLInputElement>, value: string) => {
    if (this.props.onChange) {
      this.props.onChange(e, value);
    } else {
      this.setState({ value });
    }
  };
}

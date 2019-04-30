import * as React from 'react';
import Input, { InputProps } from '../Input';
import Gapped from '../Gapped';

export interface BlinkingComponentProps {
  inputProps: InputProps;
}
export default class BlinkingComponent extends React.Component<
  BlinkingComponentProps,
  {
    inputProps: InputProps;
  }
  > {
  private input: Input | null = null;

  public render() {
    const { inputProps } = this.props;
    return (
      <Gapped>
        <Input ref={this.refInput} {...inputProps} />
        <button onClick={this.handleClick}>Blink!</button>
      </Gapped>
    );
  }

  private handleClick = () => {
    if (this.input) {
      this.input.blink();
    }
  };

  private refInput = (element: Input | null) => {
    this.input = element;
  };
}

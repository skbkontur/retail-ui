import * as React from 'react';
import InputMask from 'inputmask-core';
import { InputProps } from '../../Input';

export type MaskedInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  mask: string;
  maskChar: InputProps['maskChar'];
  alwaysShowMask: InputProps['alwaysShowMask'];
};

export interface MaskedInputState {
  value: MaskedInputProps['value'];
  maskedValue: string;
}

export default class MaskedInput extends React.Component<
  MaskedInputProps,
  MaskedInputState
> {
  public state: MaskedInputState = {
    value: this.props.value || '',
    maskedValue: ''
  };

  private mask: any = new InputMask({
    pattern: this.props.mask.replace(/9/g, '1'),
    placeholderChar: this.props.maskChar || ''
  });

  public render() {
    return (
      <div>
        <input onChange={this.handleChange} value={this.state.value} />
        <div>
          <strong>{this.mask.getValue()}</strong>
        </div>
      </div>
    );
  }

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    this.mask.setValue(value);
    this.setState({
      value: this.getTrimedValue(),
      maskedValue: this.mask.getValue()
    });
  };

  private getTrimedValue = () => {
    const rawValue = this.mask.getRawValue();

    return rawValue.replace(
      new RegExp(this.mask.pattern.placeholderChar, 'g'),
      ''
    );
  };

  private findFirstNoMaskChar = (
    position: number,
    direction: 'left' | 'right'
  ) => {
    let firstPosition = direction === 'left' ? position - 1 : position + 1;

    if (direction === 'left' && firstPosition < 0) {
      return 0;
    }

    if (direction === 'right' && firstPosition > this.mask.emptyValue.length) {
      return this.mask.emptyValue.length;
    }

    if (
      this.mask.emptyValue[firstPosition] &&
      this.mask.emptyValue[firstPosition] !== this.mask.pattern.placeholderChar
    ) {
      firstPosition = this.findFirstNoMaskChar(firstPosition, direction);
    }

    return firstPosition;
  };
}

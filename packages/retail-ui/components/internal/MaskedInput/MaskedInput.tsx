import * as React from 'react';
import InputMask from 'inputmask-core';
import Input, { InputProps } from '../../Input';
import styles = require('./MaskedInput.less');

export type MaskedInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  mask: string;
  maskChar: InputProps['maskChar'];
  alwaysShowMask: InputProps['alwaysShowMask'];
};

export interface MaskedInputState {
  value: MaskedInputProps['value'];
  maskedValue: string;
  focus: boolean;
}

export default class MaskedInput extends React.Component<
  MaskedInputProps,
  MaskedInputState
> {
  public state: MaskedInputState = {
    value: this.props.value || '',
    maskedValue: '',
    focus: false
  };

  private input: Nullable<HTMLInputElement>;

  private mask: any = new InputMask({
    pattern: this.props.mask.replace(/9/g, '1'),
    placeholderChar: this.props.maskChar || ''
  });

  public render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', padding: '4px' }}>
        <input
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          value={this.state.value}
          ref={element => {
            this.input = element;
          }}
          style={{
            position: 'absolute',
            width: 0,
            height: 0,
            padding: 0,
            outline: 'none',
            opacity: 0
          }}
        />
        <span
          tabIndex={1}
          onFocus={this.handleFocus}
          style={{
            display: 'inline-block',
            border: '1px solid #d9d9d9',
            borderTopColor: '#b2b2b2',
            fontSize: '14px',
            lineHeight: '20px',
            padding: '6px 10px',
            background: '#fff'
          }}
        >
          {this.mask.getValue()}
        </span>
        <p>{this.getFormatedValue()}</p>
        <div
          className={styles.inputContainer}
          style={{ padding: '10px', position: 'relative' }}
        >
          <Input value={this.getFormatedValue()} />
          <span
            style={{
              position: 'absolute',
              width: '100%',
              top: 9,
              left: 9,
              padding: '8px 12px',
              lineHeight: '20px',
              pointerEvents: 'none',
              opacity: 0.7
            }}
          >
            {this.mask.emptyValue}
          </span>
        </div>
      </div>
    );
  }

  private getFormatedValue = () => {
    const formatedInput: string = this.mask.getValue();
    const { placeholderChar } = this.mask.pattern;

    return formatedInput
      .split('')
      .map((char, index) => {
        if (char === placeholderChar) {
          return ' ';
        }

        return char;
      })
      .join('');
  };

  private handleFocus = () => {
    if (this.input) {
      this.setState({ focus: true }, () => {
        if (this.input) {
          this.input.focus();
        }
      });
    }
  };

  private handleBlur = () => {
    this.setState({ focus: false });
  };

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

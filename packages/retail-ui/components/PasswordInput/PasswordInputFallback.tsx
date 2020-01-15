import React from 'react';

import { Input, InputProps } from '../Input';
import { Nullable } from '../../typings/utility-types';

export type PasswordInputFallbackProps = {
  visible?: boolean;
  size?: string;
  refInput: (element: Input) => void;
} & InputProps;

export class PasswordInputFallback extends React.Component<PasswordInputFallbackProps> {
  public static defaultProps = {
    size: 'small',
  };

  private _passwordInput: Nullable<Input> = null;
  private _textInput: Nullable<Input> = null;

  public componentDidMount() {
    if (this._passwordInput) {
      this.props.refInput(this._passwordInput);
    }
  }

  public componentDidUpdate(prevProps: PasswordInputFallbackProps) {
    if (prevProps.visible === this.props.visible) {
      return;
    }

    const { visible, refInput } = this.props;
    const currentInput = visible ? this._textInput : this._passwordInput;

    if (currentInput) {
      refInput(currentInput);
    }
  }

  public render() {
    const { visible } = this.props;

    return (
      <div>
        <span style={{ display: !visible ? 'block' : 'none' }}>
          <Input
            type="password"
            onFocus={this._handleFocus}
            ref={ref => {
              this._passwordInput = ref;
            }}
            {...this.props}
          />
        </span>
        <span style={{ display: visible ? 'block' : 'none' }}>
          <Input
            type="text"
            onFocus={this._handleFocus}
            ref={ref => {
              this._textInput = ref;
            }}
            {...this.props}
          />
        </span>
      </div>
    );
  }

  // sad ie8 hack that move caret position to the end
  private _handleFocus = ({ target }: React.FocusEvent<HTMLInputElement>) => {
    const val = target.value;

    target.value = '';
    target.value = val;
  };
}

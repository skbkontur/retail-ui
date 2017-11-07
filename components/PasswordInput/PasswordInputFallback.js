import React from 'react';
import Input from '../Input';

export default class PasswordInputFallback extends React.Component {
  static defaultProps = {
    size: 'small'
  };

  _passwordInput = null;
  _textInput = null;

  componentDidMount() {
    this.props.refInput(this._passwordInput);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.visible === this.props.visible) {
      return;
    }

    const { visible, refInput } = this.props;
    const currentInput = visible ? this._textInput : this._passwordInput;

    refInput(currentInput, 'focus');
  }

  // sad ie8 hack that move caret position to the end
  _handleFocus = ({ target }) => {
    const val = target.value;

    target.value = '';
    target.value = val;
  };

  render() {
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
}

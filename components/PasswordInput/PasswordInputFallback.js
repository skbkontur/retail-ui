import React from 'react';
import Input from '../Input';

export default class PasswordInputFallback extends React.Component {
  static defaultProps = {
    size: 'small'
  };

  _passwordInput = null;
  _textInput = null;

  componentDidUpdate(prevProps) {
    if (prevProps.visible === this.props.visible) {
      return;
    }

    if (this.props.visible) {
      this._textInput.focus();
    } else {
      this._passwordInput.focus();
    }
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
            ref={ref => (this._passwordInput = ref)}
            {...this.props}
          />
        </span>
        <span style={{ display: visible ? 'block' : 'none' }}>
          <Input
            type="text"
            onFocus={this._handleFocus}
            ref={ref => (this._textInput = ref)}
            {...this.props}
          />
        </span>
      </div>
    );
  }
}

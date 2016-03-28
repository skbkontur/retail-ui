/* @flow */

import Button from './Button.js';

class ButtonAdapter {
  _button: Button;

  constructor(button) {
    this._button = button;
  }

  click() {
    if (this._button.props.onClick) {
      this._button.props.onClick();
    }
  }

  isDisabled() {
    return !!this._button.props.disabled;
  }
}

Button.__ADAPTER__ = ButtonAdapter;

export default Button;

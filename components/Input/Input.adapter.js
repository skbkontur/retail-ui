/* @flow */

import Input from './Input.js';

class InputAdapter {
  _input: Input;

  constructor(input) {
    this._input = input;
  }

  getValue() {
    return this._input.state.value;
  }

  setValue(value) {
    this._input.handleChange({target: {value}});
  }
}

Input.__ADAPTER__ = InputAdapter;

export default Input;

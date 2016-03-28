/* @flow */

import Checkbox from './Checkbox.js';

class CheckboxAdapter {
  _checkbox: Checkbox;

  constructor(checkbox: Checkbox) {
    this._checkbox = checkbox;
  }

  isChecked() {
    return this._checkbox.state.checked;
  }

  setChecked(checked) {
    this._checkbox.handleChange({target: {checked}});
  }
}

Checkbox.__ADAPTER__ = CheckboxAdapter;

export default Checkbox;

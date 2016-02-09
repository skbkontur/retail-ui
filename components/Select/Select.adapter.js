/* @flow */

import Select from './Select.js';

class SelectAdapter {
  _select: Select;

  constructor(select: Select) {
    this._select = select;
  }

  getValue() {
    return this._select;
  }

  setValue(value) {
    const select = this._select;
    if (select.props.onChange) {
      select.props.onChange({target: {value}}, value);
    }
  }
}

Select.__ADAPTER__ = SelectAdapter;

export default Select;

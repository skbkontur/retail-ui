/* @flow */

import Select from './Select.js';

class SelectAdapter {
  _select: Select;

  constructor(select: Select) {
    this._select = select;
  }

  getValue() {
    return this._select.getValue_();
  }

  setValue(value) {
    const select = this._select;
    if (select.props.onChange) {
      select.props.onChange({target: {value}}, value);
    }
  }

  getItemValues() {
    this._select.open_();
    this._select.close_();
    return this._select.mapItems((value) => value);
  }
}

Select.__ADAPTER__ = SelectAdapter;

export default Select;

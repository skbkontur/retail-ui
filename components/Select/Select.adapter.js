/* @flow */

import Select from './Select.js';

const SelectAdapter = {
  getValue(inst) {
    return inst.component._getValue();
  },

  setValue(inst, value) {
    if (inst.props.onChange) {
      inst.props.onChange({ target: { value } }, value);
    }
  },

  getItemValues(inst) {
    inst.component._open();
    inst.component._close();
    return inst.component.mapItems((value) => value);
  }
};

Select.__ADAPTER__ = SelectAdapter;

export default Select;

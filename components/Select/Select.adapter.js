/* @flow */

import Select from './Select.js';

const SelectAdapter = {
  getValue(inst) {
    return inst.getValue_();
  },

  setValue(inst, value) {
    if (inst.props.onChange) {
      inst.props.onChange({target: {value}}, value);
    }
  },

  getItemValues(inst) {
    inst.open_();
    inst.close_();
    return inst.mapItems((value) => value);
  },
};

Select.__ADAPTER__ = SelectAdapter;

export default Select;

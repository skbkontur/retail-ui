// @flow

import RadioGroup from './RadioGroup.js';

const RadioGroupAdapter = {
  getValue(inst: RadioGroup) {
    return inst.props.value;
  },

  setValue(inst, value) {
    if (inst.props.onChange) {
      inst.props.onChange({target: {value}}, value);
    }
  },

  getItemValues(inst) {
    return inst.mapItems((value) => value);
  },
};

(RadioGroup: any).__ADAPTER__ = RadioGroupAdapter;

export default RadioGroup;

/* @flow */

import Input from './Input.js';

const InputAdapter = {
  getValue(inst) {
    return inst.state.value;
  },

  setValue(inst, value) {
    inst.handleChange({target: {value}});
  },
};

Input.__ADAPTER__ = InputAdapter;

export default Input;

// @flow

import Input from './Input.js';

const InputAdapter = {
  getValue(inst: Input) {
    return inst.state.value;
  },

  setValue(inst: Input, value: string) {
    inst.handleChange({target: {value}});
  },
};

Input.__ADAPTER__ = InputAdapter;

export {InputAdapter};
export default Input;

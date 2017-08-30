// @flow

import Input from './Input.js';

const InputAdapter = {
  getValue(inst: Input) {
    return inst.props.value;
  },

  setValue(inst: Input, value: string) {
    inst._handleChange({ target: { value } });
  }
};
// eslint-disable-next-line flowtype/no-weak-types
(Input: any).__ADAPTER__ = InputAdapter;

export { InputAdapter };
export default Input;

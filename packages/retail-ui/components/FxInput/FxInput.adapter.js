

import { InputAdapter } from '../Input/Input.adapter';

import FxInput from './FxInput.js';

const FxInputAdapter = {
  getValue(inst: FxInput) {
    return InputAdapter.getValue(inst._input);
  },

  getAutoFlag(inst: FxInput) {
    return inst.props.auto;
  },

  restore(inst: FxInput) {
    if (inst.props.onRestore) {
      inst.props.onRestore();
    }
  },

  setValue(inst: FxInput, value: string) {
    InputAdapter.setValue(inst._input, value);
  }
};

FxInput.__ADAPTER__ = FxInputAdapter;

export default FxInput;

// @flow

import {InputAdapter} from '../Input/Input.adapter';

import FxInput from './FxInput.js';

const FxInputAdapter = {
  getValue(inst: FxInput) {
    return InputAdapter.getValue(inst._input);
  },

  setValue(inst: FxInput, value: string) {
    InputAdapter.setValue(inst._input, value);
  },
};

FxInput.__ADAPTER__ = FxInputAdapter;

export default FxInput;

import FxInput from './FxInput.js';
import Input from '../Input/Input.js';
import { InputAdapter } from '../Input/Input.adapter.js';
import CurrencyInput from '../CurrencyInput/CurrencyInput.js';
import { ChangeEvent } from 'react';

const FxInputAdapter = {
  getValue(inst: FxInput) {
    return inst.props.value;
  },

  getAutoFlag(inst: FxInput) {
    return inst.props.auto;
  },

  restore(inst: FxInput) {
    if (inst.props.onRestore) {
      inst.props.onRestore();
    }
  },

  setValue(inst: FxInput, value: any) {
    if (inst instanceof Input) {
      InputAdapter.setValue(inst, value);
    }
    if (inst instanceof CurrencyInput) {
      // tslint:disable-next-line:no-string-literal
      inst['_handleChange'](
        { target: { value } } as ChangeEvent<HTMLInputElement>,
        value
      );
    }
  }
};

(FxInput as any).__ADAPTER__ = FxInputAdapter;

export default FxInput;

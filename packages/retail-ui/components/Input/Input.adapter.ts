import { ChangeEvent } from 'react';
import Input from './Input.js';

const InputAdapter = {
  getValue(inst: Input) {
    return inst.props.value;
  },

  setValue(inst: Input, value: string) {
    // tslint:disable-next-line:no-string-literal
    inst['handleChange']({
      target: { value }
    } as ChangeEvent<HTMLInputElement>);
  }
};

(Input as any).__ADAPTER__ = InputAdapter;

export { InputAdapter };
export default Input;

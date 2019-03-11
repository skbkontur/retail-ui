import { ChangeEvent } from 'react';
import Checkbox from './Checkbox.js';

const CheckboxAdapter = {
  isChecked(inst: Checkbox) {
    return inst.props.checked;
  },

  setChecked(inst: Checkbox, checked: boolean) {
    // tslint:disable-next-line:no-string-literal
    inst['_handleChange']({
      currentTarget: { checked },
    } as ChangeEvent<HTMLInputElement>);
  },
};

(Checkbox as any).__ADAPTER__ = CheckboxAdapter;

export default Checkbox;

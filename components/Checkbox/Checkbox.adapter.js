/* @flow */

import Checkbox from './Checkbox.js';

const CheckboxAdapter = {
  isChecked(inst) {
    return inst.state.checked;
  },

  setChecked(inst, checked) {
    inst.handleChange({target: {checked}});
  },
};

(Checkbox: any).__ADAPTER__ = CheckboxAdapter;

export default Checkbox;

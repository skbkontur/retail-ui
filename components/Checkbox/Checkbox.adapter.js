/* @flow */

import Checkbox from './Checkbox.js';

const CheckboxAdapter = {
  isChecked(inst: Checkbox) {
    return inst.props.checked;
  },

  setChecked(inst: Checkbox, checked) {
    inst.handleChange({ target: { checked } });
  }
};

(Checkbox: any).__ADAPTER__ = CheckboxAdapter;

export default Checkbox;

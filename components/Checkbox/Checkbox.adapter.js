/* @flow */

import Checkbox from './Checkbox.js';

const CheckboxAdapter = {
  isChecked(inst: Checkbox) {
    return inst.props.checked;
  },

  setChecked(inst: Checkbox, checked) {
    inst._handleChange({ target: { checked } });
  }
};

// eslint-disable-next-line flowtype/no-weak-types
(Checkbox: any).__ADAPTER__ = CheckboxAdapter;

export default Checkbox;

import Checkbox from './Checkbox.js';

const CheckboxAdapter = {
  isChecked(inst) {
    return inst.props.checked;
  },

  setChecked(inst, checked) {
    inst._handleChange({ target: { checked } });
  }
};

Checkbox.__ADAPTER__ = CheckboxAdapter;

export default Checkbox;

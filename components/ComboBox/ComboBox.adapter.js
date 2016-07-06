// @flow

import ComboBox from './ComboBox.js';

const ComboBoxAdapter = {
  getValue(inst) {
    return inst.state.value;
  },

  setValue(inst, value) {
    inst._change(value);
  },

  search(inst, searchString: string) {
    inst._handleValueClick();
    inst._handleInputChange({target: {value: searchString}});
  },

  getResult(inst) {
    const {result} = inst.state;
    return result && result.values;
  },
};

(ComboBox: Object).__ADAPTER__ = ComboBoxAdapter;

export default ComboBox;

// @flow

import ComboBox from './EnhancedComboBox.js';

const ComboBoxAdapter = {
  getValue(inst) {
    return inst.props.value;
  },

  setValue({renderer}, value) {
    renderer._change(value);
  },

  search({renderer}, searchString: string) {
    renderer._handleValueClick();
    renderer._handleInputChange({target: {value: searchString}});
  },

  getResult({renderer}) {
    const {result} = renderer.state;
    return result && result.values;
  },
};

(ComboBox: Object).__ADAPTER__ = ComboBoxAdapter;

export default ComboBox;

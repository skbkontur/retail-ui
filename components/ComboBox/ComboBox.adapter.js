// @flow

import ComboBox from './ComboBox.js';

const ComboBoxAdapter = {
  getValue(inst) {
    return inst.props.value;
  },

  setValue({renderer}, value) {
    renderer._handleInputChange({target: {value: ''}});
    renderer._change(value);
    renderer._close();
  },

  getInfo({renderer}) {
    return renderer.props.info;
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

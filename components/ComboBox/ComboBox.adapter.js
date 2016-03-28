// @flow

import ComboBox from './ComboBox.js';

class ComboBoxAdapter {
  _instance: ComboBox;

  constructor(instance: ComboBox) {
    this._instance = instance;
  }

  getValue() {
    return this._instance.state.value;
  }

  setValue(value) {
    this._instance._change(value);
  }

  search(searchString: string) {
    this._instance._handleOpenClick();
    this._instance._handleInputChange({target: {value: searchString}});
  }

  getResult() {
    const {result} = this._instance.state;
    return result && result.values;
  }
}

ComboBox.__ADAPTER__ = ComboBoxAdapter;

export default ComboBox;
export * from './ComboBox.js';

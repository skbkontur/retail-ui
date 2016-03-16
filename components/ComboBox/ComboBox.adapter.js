// @flow

import ComboBox from './ComboBox.js';

class ComboBoxAdapter {
  _instance: ComboBox;

  constructor(instance: ComboBox) {
    this._instance = instance;
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

export default from './ComboBox.js';
export * from './ComboBox.js';

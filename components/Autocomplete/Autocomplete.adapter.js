// @flow

import Autocomplete from './Autocomplete.js';

class AutocompleteAdapter {
  _instance: Autocomplete;

  constructor(instance: Autocomplete) {
    this._instance = instance;
  }

  getValue() {
    return this._instance.state.value;
  }

  setValue(value: string) {
    this._instance.handleChange({target: {value}});
  }

  getSuggestions() {
    return this._instance.state.items;
  }
}

Autocomplete.__ADAPTER__ = AutocompleteAdapter;

export default Autocomplete;
export * from './Autocomplete.js';

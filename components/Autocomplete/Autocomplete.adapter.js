// @flow

import Autocomplete from './Autocomplete.js';

const AutocompleteAdapter = {
  getValue(inst: Autocomplete) {
    return inst.props.value;
  },

  setValue(inst: Autocomplete, value: string) {
    inst.handleChange({target: {value}});
  },

  getSuggestions(inst: Autocomplete) {
    return inst.state.items;
  },
};

(Autocomplete: any).__ADAPTER__ = AutocompleteAdapter;

export default Autocomplete;

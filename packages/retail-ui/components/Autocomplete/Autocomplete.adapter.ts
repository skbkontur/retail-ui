import Autocomplete from './Autocomplete.js';
import { ChangeEvent } from 'react';

const AutocompleteAdapter = {
  getValue(inst: Autocomplete) {
    return inst.props.value;
  },

  setValue(inst: Autocomplete, value: string) {
    // tslint:disable-next-line:no-string-literal
    inst['_handleChange']({ target: { value } } as ChangeEvent<
      HTMLInputElement
    >);
  },

  getSuggestions(inst: Autocomplete) {
    return inst.state.items;
  },

  setValueByIndex(inst: Autocomplete, index: number) {
    // tslint:disable-next-line:no-string-literal
    inst['_choose'](index);
  }
};

(Autocomplete as any).__ADAPTER__ = AutocompleteAdapter;

export default Autocomplete;

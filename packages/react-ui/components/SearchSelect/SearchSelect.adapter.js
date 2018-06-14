/* @flow weak */
/* eslint-disable flowtype/no-weak-types */
import SearchSelect from './SearchSelect.js';

class SearchSelectAdapter {
  _searchSelect: SearchSelect;

  constructor(searchSelect: SearchSelect) {
    this._searchSelect = searchSelect;
  }

  getValue(): any {
    return this._searchSelect.state.value;
  }

  setValue(value: any) {
    if (this._searchSelect.props.onChange) {
      this._searchSelect.props.onChange({ target: { value } }, value);
    }
  }
}

(SearchSelect: any).__ADAPTER__ = SearchSelectAdapter;

export default SearchSelect;

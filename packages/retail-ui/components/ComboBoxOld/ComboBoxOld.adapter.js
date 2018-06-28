

import isActiveElement from '../Menu/isActiveElement';
import * as React from 'react';

import ComboBoxOld from './ComboBoxOld.js';

const ComboBoxAdapter = {
  getValue(inst) {
    return inst.props.value;
  },

  setValue({ renderer }, value) {
    renderer._handleInputChange({ target: { value: '' } }, '');
    renderer._change(value);
    renderer._close(true);
  },

  getInfo({ renderer }) {
    return renderer.props.info;
  },

  search({ renderer }, searchString: string) {
    renderer._handleValueClick();
    renderer._handleInputChange(
      { target: { value: searchString } },
      searchString
    );
  },

  getResult({ renderer }) {
    const { result } = renderer.state;
    return (
      result &&
      result.values.map(value => {
        let val = typeof value === 'function' ? value() : value;
        if (React.isValidElement(val)) {
          return isActiveElement(val) ? val.props && val.props.value : null;
        }
        return val;
      })
    );
  }
};
// eslint-disable-next-line flowtype/no-weak-types
(ComboBoxOld: Object).__ADAPTER__ = ComboBoxAdapter;

export default ComboBoxOld;

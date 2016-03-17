import {mount} from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';

import ComboBox from '../ComboBox.js';

describe('ComboBox', () => {
  it('autoFocus', () => {
    const wrapper = mount(<ComboBox autoFocus source={() => null} />);
    const focusable = ReactDOM.findDOMNode(wrapper.get(0)._focusable);

    expect(focusable.ownerDocument.activeElement).toBe(focusable);
  });
});

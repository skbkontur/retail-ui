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

  it('fetches items when opened by entering a char', () => {
    const source = jest.fn(() => Promise.resolve({values: []}));
    const wrapper = mount(<ComboBox source={source} />);

    expect(source.mock.calls.length).toBe(0);

    wrapper.find('[tabIndex]').simulate('keypress', {
      charCode: 'a'.charCodeAt(0),
    });

    expect(source.mock.calls.length).toBe(1);
    expect(source.mock.calls[0][0]).toBe('a');
  });
});

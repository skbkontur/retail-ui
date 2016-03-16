import '../../../testing';

import {mount} from 'enzyme';
import React from 'react';

import ComboBox from '../ComboBox.adapter.js';

describe('ComboBox-adapter', () => {
  pit('search and getResult', async () => {
    const source = jest.fn(
      () => Promise.resolve({values: [1, 2, 3]})
    );
    const wrapper = mount(
      <div>
        <ComboBox tid="el" source={source} />
      </div>
    );

    const node = ReactTesting.findDOMNodes('el', wrapper.node)[0];
    ReactTesting.call(node, 'search', ['test']);

    expect(source.mock.calls.length).toBe(1);
    expect(source.mock.calls[0][0]).toBe('test');

    await source.mock.instances[0];

    const result = ReactTesting.call(node, 'getResult');
    expect(result).toEqual([1, 2, 3]);
  });
});

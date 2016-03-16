import '../../../testing';
import {mountTest} from '../../../testing/TestingTestUtils';

import React from 'react';

import Autocomplete from '../Autocomplete.adapter.js';

describe('Autocomplete-adapter', () => {
  it('getValue', () => {
    const {node} = mountTest(<Autocomplete tid="a" value="foo" />);
    expect(ReactTesting.call(node, 'getValue')).toBe('foo');
  });

  it('setValue', () => {
    const source = jest.fn(() => Promise.resolve([]));
    const onChange = jest.fn();
    const {node} = mountTest(
      <Autocomplete tid="a" source={source} onChange={onChange} />
    );

    ReactTesting.call(node, 'setValue', ['foo']);

    expect(source.mock.calls.length).toBe(1);
    expect(source.mock.calls[0][0]).toBe('foo');

    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.calls[0][1]).toBe('foo');
  });

  pit('getSuggestions', async () => {
    const source = jest.fn(() => Promise.resolve([1, 2, 3]));
    const {node} = mountTest(<Autocomplete tid="a" source={source} />);

    ReactTesting.call(node, 'setValue', ['foo']);

    await source.mock.instances[0];

    expect(ReactTesting.call(node, 'getSuggestions')).toEqual([1, 2, 3]);
  });
});

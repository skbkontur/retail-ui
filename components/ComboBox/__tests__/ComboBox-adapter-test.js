import '../../../testing';
import {mountTest} from '../../../testing/TestingTestUtils';

import React from 'react';

import ComboBox from '../ComboBox.adapter.js';

function noop() {}

describe('ComboBox-adapter', () => {
  it('getValue', () => {
    const {node} = mountTest(<ComboBox tid="a" value="foo" source={noop} />);
    expect(ReactTesting.call(node, 'getValue')).toBe('foo');
  });

  it('setValue', () => {
    const onChange = jest.fn();
    const {node} = mountTest(
      <ComboBox tid="a" onChange={onChange} source={noop} />
    );
    ReactTesting.call(node, 'setValue', ['foo']);

    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.calls[0][1]).toBe('foo');
  });

  pit('search and getResult', async () => {
    const source = jest.fn(() => Promise.resolve({values: [1, 2, 3]}));
    const {node} = mountTest(<ComboBox tid="a" source={source} />);

    ReactTesting.call(node, 'search', ['test']);

    expect(source.mock.calls.length).toBe(1);
    expect(source.mock.calls[0][0]).toBe('test');

    await source.mock.instances[0];

    const result = ReactTesting.call(node, 'getResult');
    expect(result).toEqual([1, 2, 3]);
  });
});

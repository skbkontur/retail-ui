import '../../../testing';
import {mountTest} from '../../../testing/TestingTestUtils';

import React from 'react';

import ComboBox from '../EnhancedComboBox.adapter.js';

function noop() {}

describe('ComboBox-adapter', () => {
  it('getValue', () => {
    const {node, unmount} = mountTest(
      <ComboBox tid="a" value="foo" source={noop} />
    );
    expect(ReactTesting.call(node, 'getValue')).toBe('foo');

    unmount();
  });

  it('setValue', () => {
    const onChange = jest.fn();
    const {node, unmount} = mountTest(
      <ComboBox tid="a" onChange={onChange} source={noop} />
    );
    ReactTesting.call(node, 'setValue', ['foo']);

    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.calls[0][1]).toBe('foo');

    unmount();
  });

  pit('search and getResult', async () => {
    const source = jest.fn(() => Promise.resolve({values: [1, 2, 3]}));
    const {node, unmount} = mountTest(<ComboBox tid="a" source={source} />);

    ReactTesting.call(node, 'search', ['test']);

    expect(source.mock.calls.length).toBe(2);
    expect(source.mock.calls[0][0]).toBe('');
    expect(source.mock.calls[1][0]).toBe('test');

    await source.mock.instances[1];

    const result = ReactTesting.call(node, 'getResult');
    expect(result).toEqual([1, 2, 3]);

    unmount();
  });
});

// @flow

import '../../../testing';
import {mountTest} from '../../../testing/TestingTestUtils';

import React from 'react';

import Autocomplete from '../Autocomplete.adapter.js';

describe('Autocomplete-adapter', () => {
  it('getValue', () => {
    const {node, unmount} = mountTest(
      <Autocomplete tid="a" value="foo" source={null} />
    );
    expect(ReactTesting.call(node, 'getValue')).toBe('foo');

    unmount();
  });

  it('setValue', () => {
    const source = jest.fn(() => Promise.resolve([]));
    const onChange = jest.fn();
    const {node, unmount} = mountTest(
      <Autocomplete tid="a" value="" source={source} onChange={onChange} />
    );

    ReactTesting.call(node, 'setValue', ['foo']);

    expect(source.mock.calls.length).toBe(1);
    expect(source.mock.calls[0][0]).toBe('foo');

    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.calls[0][1]).toBe('foo');

    unmount();
  });

  pit('getSuggestions', async () => {
    const source = jest.fn(() => Promise.resolve([1, 2, 3]));
    const {node, unmount, setProps} = mountTest(
      <Autocomplete tid="a" value="" source={source} />
    );

    setProps({value: 'foo'});
    ReactTesting.call(node, 'setValue', ['foo']);

    await (source.mock.instances: any)[0];

    expect(ReactTesting.call(node, 'getSuggestions')).toEqual([1, 2, 3]);

    unmount();
  });

  it('setValueByIndex', () => {
    const source = jest.fn(() => Promise.resolve(['foo']));
    const onChange = jest.fn();
    const {node, unmount} = mountTest(
      <Autocomplete tid="a" value="" source={source} onChange={onChange} />
    );

    ReactTesting.call(node, 'setValueByIndex', [0]);

    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.calls[0][1]).toBe('foo');

    unmount();
  });
});

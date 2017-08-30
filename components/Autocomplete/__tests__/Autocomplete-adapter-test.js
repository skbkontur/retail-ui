/* eslint-disable flowtype/no-weak-types */
import { testAdapter } from '../../../testing/AdapterTestUtils';

import * as React from 'react';

import Autocomplete from '../Autocomplete.adapter.js';

describe('Autocomplete-adapter', () => {
  testAdapter('getValue', mount => {
    const adapter = mount(<Autocomplete value="foo" source={null} />);
    expect(adapter.getValue()).toBe('foo');
  });

  testAdapter('setValue', mount => {
    const source = jest.fn(() => Promise.resolve([]));
    const onChange = jest.fn();
    const adapter = mount(
      <Autocomplete value="" source={source} onChange={onChange} />
    );

    adapter.setValue('foo');

    expect(source.mock.calls.length).toBe(1);
    expect(source.mock.calls[0][0]).toBe('foo');

    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.calls[0][1]).toBe('foo');
  });

  testAdapter('getSuggestions', async mount => {
    const source = jest.fn(() => Promise.resolve([1, 2, 3]));
    const adapter = mount(<Autocomplete value="" source={source} />);

    adapter.setProps({ value: 'foo' });
    adapter.setValue('foo');

    await source.mock.instances[0];

    expect(adapter.getSuggestions()).toEqual([1, 2, 3]);
  });

  testAdapter('setValueByIndex', async mount => {
    const source = jest.fn(() => Promise.resolve(['foo']));
    const onChange = jest.fn((e, value) => adapter.setProps({ value }));
    const adapter = mount(
      <Autocomplete value="" source={source} onChange={onChange} />
    );

    // Fetch suggestions.
    adapter.setValue('bar');
    await source.mock.instances[0];
    adapter.setValueByIndex(0);

    expect(onChange.mock.calls.length).toBe(2);
    expect(onChange.mock.calls[1][1]).toBe('foo');
  });
});

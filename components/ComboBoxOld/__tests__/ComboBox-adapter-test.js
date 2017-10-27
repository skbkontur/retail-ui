import { testAdapter } from '../../../testing/AdapterTestUtils';

import React from 'react';

import ComboBox from '../ComboBox.adapter.js';
import MenuItem from '../../MenuItem/MenuItem';

function noop() {
  return Promise.resolve([]);
}

// Not supporting React 16
xdescribe('ComboBox-adapter', () => {
  testAdapter('getValue', mount => {
    const adapter = mount(<ComboBox value="foo" source={noop} />);
    expect(adapter.getValue()).toBe('foo');
  });

  testAdapter('setValue', mount => {
    const onChange = jest.fn();
    const adapter = mount(<ComboBox onChange={onChange} source={noop} />);
    adapter.setValue('foo');

    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.calls[0][1]).toBe('foo');
  });

  testAdapter('setValue closes the ComboBox', mount => {
    const onChange = jest.fn();
    const source = jest.fn(() => Promise.resolve(['bar']));
    const adapter = mount(<ComboBox onChange={onChange} source={source} />);

    const isOpened = () => adapter.wrapper.find('input').exists();

    adapter.search('whoop');
    expect(isOpened()).toBe(true);

    adapter.setValue('foo');
    expect(isOpened()).toBe(false);

    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.calls[0][1]).toBe('foo');
  });

  testAdapter('setValue calls onClose', mount => {
    const onClose = jest.fn();
    const source = jest.fn(() => Promise.resolve(['bar']));
    const adapter = mount(<ComboBox onClose={onClose} source={source} />);

    const isOpened = () => adapter.wrapper.find('input').exists();

    adapter.search('whoop');
    expect(isOpened()).toBe(true);

    adapter.setValue('foo');
    expect(isOpened()).toBe(false);

    expect(onClose.mock.calls.length).toBe(1);
  });

  testAdapter('getInfo', mount => {
    const adapter = mount(<ComboBox value="foo" info="info" source={noop} />);

    expect(adapter.getInfo()).toBe('info');
  });

  testAdapter('getInfo of promise', async mount => {
    const promise = Promise.resolve('info');
    const adapter = mount(
      <ComboBox value="foo" info={() => promise} source={noop} />
    );

    // Info is null until promise is resolved.
    expect(adapter.getInfo()).toBe(null);

    await promise;
    expect(adapter.getInfo()).toBe('info');
  });

  testAdapter('search and getResult', async mount => {
    const values = [1, <span>2</span>, <MenuItem value={3}>3</MenuItem>];
    const source = jest.fn(() => Promise.resolve({ values }));
    const adapter = mount(<ComboBox source={source} />);

    adapter.search('test');

    expect(source.mock.calls.length).toBe(2);
    expect(source.mock.calls[0][0]).toBe('');
    expect(source.mock.calls[1][0]).toBe('test');

    await source.mock.instances[1];

    const result = adapter.getResult();
    expect(result).toEqual([1, null, 3]);
  });

  testAdapter('get null result of closed', async mount => {
    const values = [1, <span>2</span>, <MenuItem value={3}>3</MenuItem>];
    const source = jest.fn(() => Promise.resolve({ values }));
    const adapter = mount(<ComboBox source={source} />);

    adapter.search('test');

    await source.mock.instances[1];

    adapter.setValue(2);

    const result = adapter.getResult();
    expect(result).toEqual(null);
  });
});

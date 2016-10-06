import '../../../testing';
import {mountTest} from '../../../testing/TestingTestUtils';

import React from 'react';

import ComboBox from '../ComboBox.adapter.js';
import MenuItem from '../../MenuItem/MenuItem';

function noop() {
  return Promise.resolve([]);
}

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

  it('setValue closes the ComboBox', () => {
    const onChange = jest.fn();
    const source = jest.fn(() => Promise.resolve(['bar']));
    const {node, unmount} = mountTest(
      <ComboBox tid="a" onChange={onChange} source={source} />
    );

    const isOpened = () => !!node.querySelector('input');

    ReactTesting.call(node, 'search', ['whoop']);
    expect(isOpened()).toBe(true);

    ReactTesting.call(node, 'setValue', ['foo']);
    expect(isOpened()).toBe(false);

    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.calls[0][1]).toBe('foo');

    unmount();
  });

  it('getInfo', () => {
    const {node, unmount} = mountTest(
      <ComboBox tid="a" value="foo" info="info" source={noop} />
    );

    expect(ReactTesting.call(node, 'getInfo', [])).toBe('info');

    unmount();
  });

  it('getInfo of promise', async () => {
    const promise = Promise.resolve('info');
    const {node, unmount} = mountTest(
      <ComboBox tid="a" value="foo" info={() => promise} source={noop} />
    );

    // Info is null until promise is resolved.
    expect(ReactTesting.call(node, 'getInfo', [])).toBe(null);

    await promise;
    expect(ReactTesting.call(node, 'getInfo', [])).toBe('info');

    unmount();
  });

  pit('search and getResult', async () => {
    const values = [
      1,
      <span>2</span>,
      <MenuItem value={3}>3</MenuItem>,
    ];
    const source = jest.fn(() => Promise.resolve({values}));
    const {node, unmount} = mountTest(<ComboBox tid="a" source={source} />);

    ReactTesting.call(node, 'search', ['test']);

    expect(source.mock.calls.length).toBe(2);
    expect(source.mock.calls[0][0]).toBe('');
    expect(source.mock.calls[1][0]).toBe('test');

    await source.mock.instances[1];

    const result = ReactTesting.call(node, 'getResult');
    expect(result).toEqual([1, null, 3]);

    unmount();
  });
});

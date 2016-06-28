import '../../../testing';
import {mountTest} from '../../../testing/TestingTestUtils';

import React from 'react';

import RadioGroup from '../RadioGroup.adapter.js';

const items = [
  ['one', 'One'],
  ['two', 'Two'],
  ['three', 'Three'],
];

describe('RadioGroup-adapter', () => {
  it('getValue', () => {
    const {
      node,
      unmount,
    } = mountTest(<RadioGroup tid="a" value="two" items={[]} />);

    expect(ReactTesting.call(node, 'getValue')).toBe('two');

    unmount();
  });

  it('setValue', () => {
    const onChange = jest.fn();
    const {
      node,
      unmount,
    } = mountTest(<RadioGroup tid="a" items={[]} onChange={onChange}/>);

    ReactTesting.call(node, 'setValue', ['foo']);

    expect(onChange.mock.calls[0][1]).toBe('foo');

    unmount();
  })

  it('getItemValues', () => {
    const {node, unmount} = mountTest(<RadioGroup tid="a" items={items} />);

    const actual = ReactTesting.call(node, 'getItemValues');

    expect(actual).toEqual(['one', 'two', 'three']);

    unmount();
  });
});

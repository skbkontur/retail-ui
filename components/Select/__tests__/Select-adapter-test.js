import '../../../testing';
import {mountTest} from '../../../testing/TestingTestUtils';

import {mount} from 'enzyme';
import React from 'react';

import Select from '../Select.adapter.js';

const items = [
  ['one', 'One'],
  ['two', 'Two'],
  ['three', 'Three'],
];

describe('Select-adapter', () => {
  it('getValue', () => {
    const {
      node,
      unmount,
    } = mountTest(<Select tid="a" value="two" items={[]} />);

    expect(ReactTesting.call(node, 'getValue')).toBe('two');

    unmount();
  });

  it('getItemValues', () => {
    const {node, unmount} = mountTest(<Select tid="a" items={items} />);

    const actual = ReactTesting.call(node, 'getItemValues');

    expect(actual).toEqual(['one', 'two', 'three']);

    unmount();
  });

  it('getItemValues fails with renderItem', () => {
    function renderItem() {
      throw new Error('Render error');
    }
    const {node, unmount} = mountTest(
      <Select tid="a" items={items} renderItem={renderItem} />
    );

    expect(() => {
      ReactTesting.call(node, 'getItemValues');
    }).toThrow(new Error('Render error'));

    unmount();
  });
});

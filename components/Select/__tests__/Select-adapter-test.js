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
    const {node} = mountTest(<Select tid="a" value="two" items={[]} />);

    expect(ReactTesting.call(node, 'getValue')).toBe('two');
  });

  it('getItemValues', () => {
    const wrapper = mount(
      <div>
        <Select tid="el" items={items} />
      </div>
    );

    const node = ReactTesting.findDOMNodes('el', wrapper.node)[0];
    const actual = ReactTesting.call(node, 'getItemValues');

    expect(actual).toEqual(['one', 'two', 'three']);
  });

  it('getItemValues fails with renderItem', () => {
    function renderItem() {
      throw new Error('Render error');
    }
    const wrapper = mount(
      <div>
        <Select tid="el" items={items} renderItem={renderItem} />
      </div>
    );

    const node = ReactTesting.findDOMNodes('el', wrapper.node)[0];

    expect(() => {
      ReactTesting.call(node, 'getItemValues');
    }).toThrow(new Error('Render error'));
  });
});

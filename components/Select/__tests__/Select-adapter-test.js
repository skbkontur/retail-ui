// @flow

import { testAdapter } from '../../../testing/AdapterTestUtils';

import * as React from 'react';

import Select from '../Select.adapter.js';

const items = [['one', 'One'], ['two', 'Two'], ['three', 'Three']];

describe('Select-adapter', () => {
  testAdapter('getValue', mount => {
    const adapter = mount(<Select value="two" items={[]} />);
    expect(adapter.getValue()).toBe('two');
  });

  testAdapter('getItemValues', mount => {
    const adapter = mount(<Select items={items} />);
    const actual = adapter.getItemValues();
    expect(actual).toEqual(['one', 'two', 'three']);
  });

  testAdapter('getItemValues fails with renderItem', mount => {
    function renderItem() {
      throw new Error('Render error');
    }
    const adapter = mount(<Select items={items} renderItem={renderItem} />);

    expect(() => {
      adapter.getItemValues();
    }).toThrow(new Error('Render error'));
  });
});

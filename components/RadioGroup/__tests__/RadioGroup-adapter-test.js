// @flow

import { testAdapter } from '../../../testing/AdapterTestUtils';

import * as React from 'react';

import RadioGroup from '../RadioGroup.adapter.js';

const items = [['one', 'One'], ['two', 'Two'], ['three', 'Three']];

// Not supporting React 16
xdescribe('RadioGroup-adapter', () => {
  testAdapter('getValue', mount => {
    const adapter = mount(<RadioGroup value="two" items={[]} />);
    expect(adapter.getValue()).toBe('two');
  });

  testAdapter('setValue', mount => {
    const onChange = jest.fn();
    const adapter = mount(
      <RadioGroup value={null} items={[]} onChange={onChange} />
    );

    adapter.setValue('foo');

    expect(onChange.mock.calls[0][1]).toBe('foo');
  });

  testAdapter('getItemValues', mount => {
    const adapter = mount(<RadioGroup value={null} items={items} />);
    const actual = adapter.getItemValues();
    expect(actual).toEqual(['one', 'two', 'three']);
  });
});

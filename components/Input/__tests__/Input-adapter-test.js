// @flow

import { testAdapter } from '../../../testing/AdapterTestUtils';

import * as React from 'react';

import Input from '../Input.adapter';

// Not supporting React 16
xdescribe('Input-adapter', () => {
  testAdapter('getValue', mount => {
    const adapter = mount(<Input value="Kappa" />);
    expect(adapter.getValue()).toBe('Kappa');
  });

  testAdapter('setValue', mount => {
    const onChange = jest.fn();
    const adapter = mount(<Input value="" onChange={onChange} />);

    adapter.setValue('Kappa');

    expect(onChange.mock.calls[0][1]).toBe('Kappa');
  });
});

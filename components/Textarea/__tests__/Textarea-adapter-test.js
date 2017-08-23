// @flow

import { testAdapter } from '../../../testing/AdapterTestUtils';

import * as React from 'react';

import Textarea from '../Textarea.adapter';

describe('Textarea-adapter', () => {
  testAdapter('getValue', mount => {
    const adapter = mount(<Textarea value="Kappa" />);
    expect(adapter.getValue()).toBe('Kappa');
  });

  testAdapter('setValue', mount => {
    const onChange = jest.fn();
    const adapter = mount(<Textarea value="" onChange={onChange} />);

    adapter.setValue('Kappa');

    expect(onChange.mock.calls[0][1]).toBe('Kappa');
  });
});

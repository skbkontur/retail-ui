// @flow

import { testAdapter } from '../../../testing/AdapterTestUtils';

import * as React from 'react';

import Checkbox from '../Checkbox.adapter';

describe('Checkbox-adapter', () => {
  testAdapter('isChecked', mount => {
    const adapter1 = mount(<Checkbox checked={false} />);
    expect(adapter1.isChecked()).toBe(false);

    const adapter2 = mount(<Checkbox checked={true} />);
    expect(adapter2.isChecked()).toBe(true);
  });

  testAdapter('setChecked', mount => {
    const onChange = jest.fn();
    const adapter = mount(<Checkbox checked={false} onChange={onChange} />);

    adapter.setChecked(true);
    adapter.setChecked(false);

    expect(onChange.mock.calls[0][1]).toBe(true);
    expect(onChange.mock.calls[1][1]).toBe(false);
  });
});

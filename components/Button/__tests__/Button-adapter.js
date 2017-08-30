// @flow

import { testAdapter } from '../../../testing/AdapterTestUtils';

import * as React from 'react';

import Button from '../Button.adapter';

describe('Button-adapter', () => {
  testAdapter('click', mount => {
    const onClick = jest.fn();
    const adapter = mount(<Button onClick={onClick} />);

    adapter.click();

    expect(onClick.mock.calls.length).toBe(1);
  });

  testAdapter('isDisabled', mount => {
    const adapter1 = mount(<Button />);
    expect(adapter1.isDisabled()).toBe(false);

    const adapter2 = mount(<Button disabled />);
    expect(adapter2.isDisabled()).toBe(true);
  });
});

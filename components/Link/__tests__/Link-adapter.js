// @flow

import { testAdapter } from '../../../testing/AdapterTestUtils';

import * as React from 'react';

import Link from '../Link.adapter';

// Not supporting React 16
xdescribe('Link-adapter', () => {
  testAdapter('click', mount => {
    const onClick = jest.fn();
    const adapter = mount(<Link onClick={onClick} />);

    adapter.click();

    expect(onClick.mock.calls.length).toBe(1);
  });

  testAdapter('isDisabled', mount => {
    const adapter1 = mount(<Link tid="a" />);
    expect(adapter1.isDisabled()).toBe(false);

    const adapter2 = mount(<Link tid="b" disabled />);
    expect(adapter2.isDisabled()).toBe(true);
  });
});

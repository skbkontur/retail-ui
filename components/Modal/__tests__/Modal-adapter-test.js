// @flow

import { testAdapter } from '../../../testing/AdapterTestUtils';

import * as React from 'react';

import Modal from '../Modal.adapter.js';

// Not supporting React 16
xdescribe('Modal-adapter', () => {
  testAdapter('close', mount => {
    const onClose = jest.fn();
    const adapter = mount(<Modal onClose={onClose} />);

    adapter.close();

    expect(onClose.mock.calls.length).toBe(1);
  });
});

// @flow

import { testAdapter } from '../../../testing/AdapterTestUtils';

import * as React from 'react';

import Modal from '../Modal.adapter.js';

describe('Modal-adapter', () => {
  testAdapter('close', mount => {
    const onClose = jest.fn();
    const adapter = mount(<Modal onClose={onClose} />);

    adapter.close();

    expect(onClose.mock.calls.length).toBe(1);
  });
});

import '../../../testing';
import {mountTest} from '../../../testing/TestingTestUtils';

import React from 'react';

import Modal from '../Modal.adapter.js';

describe('Modal-adapter', () => {
  it('close', () => {
    const onClose = jest.fn();
    const {node} = mountTest(<Modal tid="a" onClose={onClose} />);

    ReactTesting.call(node, 'close', []);

    expect(onClose.mock.calls.length).toBe(1);
  });
});

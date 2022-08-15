import React from 'react';
import { render, cleanup } from '@testing-library/react';

import { Modal } from '../../../components/Modal';
import { SidePage } from '../../../components/SidePage';
import { globalThat } from '../../SSRSafe';

const getStackInfo = () => globalThat.__ReactUIStackInfo;

const getCountListener = (): number => {
  const change = getStackInfo().emitter._events?.change;
  if (typeof change !== 'undefined') {
    if (Array.isArray(change)) {
      return change.length;
    }
    return 1;
  }
  return 0;
};

describe('ModalStack', () => {
  afterEach(cleanup);

  test('should add once listener for each modal', () => {
    render(
      <>
        <Modal />
        <SidePage />
      </>,
    );
    expect(getCountListener()).toBe(2);
  });

  test('should clean listeners after unmount', () => {
    const { unmount } = render(
      <>
        <Modal />
        <SidePage />
      </>,
    );
    unmount();
    expect(getCountListener()).toBe(0);
  });
});

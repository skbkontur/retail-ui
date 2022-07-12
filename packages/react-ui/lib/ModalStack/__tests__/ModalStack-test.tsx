import React from 'react';
import { render, cleanup } from '@testing-library/react';

import { Modal } from '../../../components/Modal';
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
        <Modal />
        <Modal />
      </>,
    );
    expect(getCountListener()).toBe(3);
  });

  test('should clean listeners after unmount', () => {
    const { unmount } = render(
      <>
        <Modal />
        <Modal />
        <Modal />
      </>,
    );
    unmount();
    expect(getCountListener()).toBe(0);
  });

  test('should clean listeners after unmount 1', () => {
    class Modal_1 extends Modal {}
    class Modal_2 extends Modal {}
    render(
      <>
        <Modal_1 />
        <Modal_2 />
      </>,
    );
    const names = getStackInfo().mounted.map(({ constructor: { name } }) => name);
    expect(names).toEqual(expect.arrayContaining(['Modal_1', 'Modal_2']));
  });
});

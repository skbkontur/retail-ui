import React from 'react';
import { render } from '@testing-library/react';

import { Modal } from '../../../components/Modal';
import { SidePage } from '../../../components/SidePage';
import { globalThat } from '../../SSRSafe';

describe('ModalStack', () => {
  test('should add listener once', () => {
    render(
      <>
        <Modal />
        <SidePage />
      </>,
    );
    expect(globalThat.__ReactUIStackInfo.mounted).toHaveLength(2);
  });

  test('should clear listeners after unmount', () => {
    const { unmount } = render(
      <>
        <Modal />
        <SidePage />
      </>,
    );
    unmount();
    expect(globalThat.__ReactUIStackInfo.mounted).toHaveLength(0);
  });
});

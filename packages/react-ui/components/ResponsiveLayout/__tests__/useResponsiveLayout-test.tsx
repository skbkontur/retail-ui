import React from 'react';
import { render } from '@testing-library/react';

import { eventListenersMap } from '../ResponsiveLayoutEvents';
import { useResponsiveLayout } from '../useResponsiveLayout';

describe('useResponsiveLayout', () => {
  it('removes listeners after unmount', () => {
    const WithResponsiveLayoutListener = () => {
      const { isMobile } = useResponsiveLayout();
      return <i>{isMobile}</i>;
    };
    eventListenersMap.clear();

    const { unmount } = render(<WithResponsiveLayoutListener />);
    expect(eventListenersMap.size).toBe(4);

    unmount();
    expect(eventListenersMap.size).toBe(0);
  });
});

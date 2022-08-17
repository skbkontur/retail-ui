import React from 'react';
import { render } from '@testing-library/react';

import { eventListenersMap } from '../ResponsiveLayoutEvents';
import { useResponsiveLayout as useResponsiveLayoutOrigin } from '../useResponsiveLayout';
import {MediaQueriesType, ResponsiveLayoutFlags, ResponsiveLayoutOptions} from '../types';
import { DEFAULT_THEME } from '../../../lib/theming/themes/DefaultTheme';

function getUseResponsiveLayoutResult<T extends MediaQueriesType>(options: ResponsiveLayoutOptions) {
  const useResponsiveLayout = () => {
    return useResponsiveLayoutOrigin<T>(options);
  };
  const result = {};
  function TestComponent() {
    Object.assign(result, useResponsiveLayout());
    return null;
  }
  render(<TestComponent />);
  return result as ResponsiveLayoutFlags<T>;
}
describe('useResponsiveLayoutCustomization', () => {
  const calcMatches = (query: string) => query === DEFAULT_THEME.mobileMediaQuery;

  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: calcMatches(query),
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  it('has added custom media queries', () => {
    const customMediaQueries = {
      isTablet: '(min-width: 577px)',
      isDesktop: '(min-width: 1280px)',
    };
    const result = getUseResponsiveLayoutResult<typeof customMediaQueries>({ customMediaQueries });

    expect(result.isMobile).toBeTruthy();
    expect(result.isTablet).toBeFalsy();
    expect(result.isDesktop).toBeFalsy();
  });

  it('rewrite result custom media queries', () => {
    const customMediaQueries = {
      isMobile: '(min-width: 360px)',
    };
    const result = getUseResponsiveLayoutResult<typeof customMediaQueries>({ customMediaQueries });

    expect(result.isMobile).toBeFalsy();
  });
});

describe('useResponsiveLayoutListeners', () => {
  it('removes listeners after unmount', () => {
    const WithResponsiveLayoutListener = () => {
      const { isMobile } = useResponsiveLayoutOrigin();
      return <i>{isMobile}</i>;
    };
    eventListenersMap.clear();

    const { unmount } = render(<WithResponsiveLayoutListener />);
    expect(eventListenersMap.size).toBe(1);

    unmount();
    expect(eventListenersMap.size).toBe(0);
  });
});

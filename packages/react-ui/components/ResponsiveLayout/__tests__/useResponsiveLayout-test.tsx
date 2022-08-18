import React from 'react';
import { render } from '@testing-library/react';

import { eventListenersMap } from '../ResponsiveLayoutEvents';
import { useResponsiveLayout as useResponsiveLayoutOrigin } from '../useResponsiveLayout';
import { MediaQueriesType, ResponsiveLayoutFlags, ResponsiveLayoutOptions } from '../types';
import { DEFAULT_THEME } from '../../../lib/theming/themes/DefaultTheme';

function getUseResponsiveLayoutResult<T extends MediaQueriesType>(options: ResponsiveLayoutOptions<T>) {
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
  let calcMatches = (query: string) => query === DEFAULT_THEME.mobileMediaQuery;
  const oldMatchMedia = window.matchMedia;
  const matchMediaMock = jest.fn().mockImplementation((query) => {
    return {
      matches: calcMatches(query),
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    };
  });

  beforeEach(() => {
    window.matchMedia = matchMediaMock;
  });

  afterEach(() => {
    window.matchMedia = oldMatchMedia;
  });

  it('has added custom media queries', () => {
    const customMediaQueries = {
      isTablet: '(min-width: 577px)',
    };

    calcMatches = (query: string) => query === customMediaQueries.isTablet;
    const result = getUseResponsiveLayoutResult<typeof customMediaQueries>({ customMediaQueries });

    expect(result.isMobile).toBeFalsy();
    expect(result.isTablet).toBeTruthy();
    expect(matchMediaMock).toBeCalledWith(customMediaQueries.isTablet);
    expect(matchMediaMock).toBeCalledWith(DEFAULT_THEME.mobileMediaQuery);
  });

  it('rewrite result custom media queries', () => {
    const customMediaQueries = {
      isMobile: '(min-width: 360px)',
    };
    const result = getUseResponsiveLayoutResult<typeof customMediaQueries>({ customMediaQueries });

    expect(result.isMobile).toBeFalsy();
    expect(matchMediaMock).toBeCalledWith(customMediaQueries.isMobile);
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

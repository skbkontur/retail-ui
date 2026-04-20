import { render } from '@testing-library/react';
import React from 'react';

import { LIGHT_THEME } from '../../../lib/theming/themes/LightTheme.js';
import { eventListenersMap } from '../ResponsiveLayoutEvents.js';
import type { MediaQueriesType, ResponsiveLayoutFlags, ResponsiveLayoutOptions } from '../types.js';
import { useResponsiveLayout as useResponsiveLayoutOrigin } from '../useResponsiveLayout.js';

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
  let calcMatches = (query: string) => query === LIGHT_THEME.mobileMediaQuery;
  const oldMatchMedia = window.matchMedia;
  const matchMediaMock = vi.fn().mockImplementation((query) => {
    return {
      matches: calcMatches(query),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
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
    const result = getUseResponsiveLayoutResult({ customMediaQueries });

    expect(result.isMobile).toBe(false);
    expect(result.isTablet).toBe(true);
    expect(matchMediaMock).toHaveBeenCalledWith(customMediaQueries.isTablet);
    expect(matchMediaMock).toHaveBeenCalledWith(LIGHT_THEME.mobileMediaQuery);
  });

  it('rewrite result custom media queries', () => {
    const customMediaQueries = {
      isMobile: '(min-width: 360px)',
    };
    const result = getUseResponsiveLayoutResult({ customMediaQueries });

    expect(result.isMobile).toBeFalsy();
    expect(matchMediaMock).toHaveBeenCalledWith(customMediaQueries.isMobile);
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

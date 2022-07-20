import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';

import { ThemeContext } from '../../lib/theming/ThemeContext';

import { ResponsiveLayoutFlags } from './types';
import { addResponsiveLayoutListener, checkMatches } from './ResponsiveLayoutEvents';

export function useResponsiveLayout() {
  const theme = useContext(ThemeContext);

  const getLayoutFromGlobal = (): ResponsiveLayoutFlags => {
    const isMobile = checkMatches(theme.mobileMediaQuery);
    const isTabletV = checkMatches(theme.tabletVMediaQuery);
    const isTabletH = checkMatches(theme.tabletHMediaQuery);
    const isDesktop = checkMatches(theme.desktopMediaQuery);

    return { isMobile: !!isMobile, isTabletV: !!isTabletV, isTabletH: !!isTabletH, isDesktop: !!isDesktop };
  };

  const [state, setState] = useState(getLayoutFromGlobal());

  const mobileListener: React.MutableRefObject<{ remove: () => void } | null> = useRef(null);
  const tabletVListener: React.MutableRefObject<{ remove: () => void } | null> = useRef(null);
  const tabletHListener: React.MutableRefObject<{ remove: () => void } | null> = useRef(null);
  const desktopListener: React.MutableRefObject<{ remove: () => void } | null> = useRef(null);

  const prepareMediaQueries = useCallback(() => {
    if (!theme) {
      return;
    }

    mobileListener.current = addResponsiveLayoutListener(theme.mobileMediaQuery, checkLayoutsMediaQueries);
    tabletVListener.current = addResponsiveLayoutListener(theme.tabletVMediaQuery, checkLayoutsMediaQueries);
    tabletHListener.current = addResponsiveLayoutListener(theme.tabletHMediaQuery, checkLayoutsMediaQueries);
    desktopListener.current = addResponsiveLayoutListener(theme.desktopMediaQuery, checkLayoutsMediaQueries);

    // Checking for SSR use case
    const globalLayout = getLayoutFromGlobal();

    if (
      globalLayout.isMobile !== state.isMobile ||
      globalLayout.isTabletV !== state.isTabletV ||
      globalLayout.isTabletH !== state.isTabletH ||
      globalLayout.isDesktop !== state.isDesktop
    ) {
      setState(globalLayout);
    }
  }, [theme]);

  const checkLayoutsMediaQueries = useCallback(
    (e: MediaQueryListEvent) => {
      if (!theme) {
        return;
      }

      if (e.media === theme.mobileMediaQuery) {
        setState((prevState: ResponsiveLayoutFlags) => ({
          ...prevState,
          isMobile: e.matches,
        }));
      }
      if (e.media === theme.tabletVMediaQuery) {
        setState((prevState: ResponsiveLayoutFlags) => ({
          ...prevState,
          isTabletV: e.matches,
        }));
      }
      if (e.media === theme.tabletHMediaQuery) {
        setState((prevState: ResponsiveLayoutFlags) => ({
          ...prevState,
          isTabletH: e.matches,
        }));
      }
      if (e.media === theme.desktopMediaQuery) {
        setState((prevState: ResponsiveLayoutFlags) => ({
          ...prevState,
          isDesktop: e.matches,
        }));
      }
    },
    [theme],
  );

  useEffect(() => {
    prepareMediaQueries();

    return () => {
      mobileListener.current?.remove();
      tabletVListener.current?.remove();
      tabletHListener.current?.remove();
      desktopListener.current?.remove();
    };
  }, []);

  return state;
}

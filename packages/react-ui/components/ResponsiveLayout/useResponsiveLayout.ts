import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';

import { ThemeContext } from '../../lib/theming/ThemeContext';

import { ResponsiveLayoutFlags } from './types';
import { addResponsiveLayoutListener, checkMatches } from './ResponsiveLayoutEvents';

export function useResponsiveLayout() {
  const theme = useContext(ThemeContext);

  const getLayoutFromGlobal = (): ResponsiveLayoutFlags => {
    const isMobile = checkMatches(theme.mobileMediaQuery);

    return { isMobile: !!isMobile };
  };

  const [state, setState] = useState(getLayoutFromGlobal());

  const mobileListener: React.MutableRefObject<{ remove: () => void } | null> = useRef(null);

  const prepareMediaQueries = useCallback(() => {
    if (!theme) {
      return;
    }

    mobileListener.current = addResponsiveLayoutListener(theme.mobileMediaQuery, checkLayoutsMediaQueries);

    // Checking for SSR use case
    const globalLayout = getLayoutFromGlobal();

    if (globalLayout.isMobile !== state.isMobile) {
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
    },
    [theme],
  );

  useEffect(() => {
    prepareMediaQueries();

    return () => {
      mobileListener.current?.remove();
    };
  }, []);

  return state;
}

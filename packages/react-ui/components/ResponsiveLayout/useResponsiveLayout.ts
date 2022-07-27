import React, { createRef, useCallback, useContext, useEffect, useRef, useState } from 'react';

import { ThemeContext } from '../../lib/theming/ThemeContext';

import { ResponsiveLayoutFlags, ResponsiveLayoutOptions } from './types';
import { addResponsiveLayoutListener, checkMatches } from './ResponsiveLayoutEvents';

export function useResponsiveLayout<T extends Record<string, string>>(options?: ResponsiveLayoutOptions) {
  const theme = useContext(ThemeContext);

  const getLayoutFromGlobal = (): ResponsiveLayoutFlags<T> => {
    const isMobile = checkMatches(theme.mobileMediaQuery);
    const defaultResult = { isMobile: !!isMobile };
    if (!options) {
      return defaultResult as ResponsiveLayoutFlags<T>;
    }
    const customQueries: Record<string, boolean> = Object.entries(options.customMediaQueries).reduce(
      (result, [name, query]) => Object.assign(result, { [name]: checkMatches(query) }),
      {},
    );

    return Object.assign(defaultResult, customQueries) as ResponsiveLayoutFlags<T>;
  };

  const [state, setState] = useState(getLayoutFromGlobal());

  const mobileListener: React.MutableRefObject<{ remove: () => void } | null> = useRef(null);
  const customListeners: React.MutableRefObject<{ remove: () => void } | null>[] = [];
  if (options) {
    Object.entries(options.customMediaQueries).forEach((_) => customListeners.push(createRef()));
  }

  const prepareMediaQueries = useCallback(() => {
    if (!theme) {
      return;
    }

    mobileListener.current = addResponsiveLayoutListener(theme.mobileMediaQuery, checkLayoutsMediaQueries);
    if (options) {
      Object.entries(options.customMediaQueries).forEach(
        ([name, query], i) =>
          (customListeners[i].current = addResponsiveLayoutListener(query, checkLayoutsMediaQueries)),
      );
    }
    // Checking for SSR use case
    const globalLayout = getLayoutFromGlobal();
    const hasChangedCustomQuery = Object.entries(globalLayout).reduce(
      (hasChanges, [key, value]) => state[key] !== value,
      false,
    );

    if (hasChangedCustomQuery) {
      setState(globalLayout);
    }
  }, [theme]);

  const checkLayoutsMediaQueries = useCallback(
    (e: MediaQueryListEvent) => {
      if (!theme) {
        return;
      }

      if (e.media === theme.mobileMediaQuery) {
        setState((prevState: ResponsiveLayoutFlags<T>) => ({
          ...prevState,
          isMobile: e.matches,
        }));
      }
      const customQuery = options
        ? Object.entries(options.customMediaQueries).find(([name, query]) => query === e.media)
        : undefined;
      if (customQuery) {
        setState((prevState: ResponsiveLayoutFlags<T>) => ({
          ...prevState,
          customFlags: Object.assign(prevState.customFlags, customQuery),
        }));
      }
    },
    [theme],
  );

  useEffect(() => {
    prepareMediaQueries();

    return () => {
      mobileListener.current?.remove();
      customListeners.forEach((listener) => listener.current?.remove());
    };
  }, []);

  return state;
}

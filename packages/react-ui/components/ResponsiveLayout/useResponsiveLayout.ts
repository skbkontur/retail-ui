import React, { createRef, useCallback, useContext, useEffect, useState } from 'react';

import { ThemeContext } from '../../lib/theming/ThemeContext';

import { ResponsiveLayoutFlags, ResponsiveLayoutOptions } from './types';
import { addResponsiveLayoutListener, checkMatches } from './ResponsiveLayoutEvents';

export function useResponsiveLayout<T extends Record<string, string>>(options?: ResponsiveLayoutOptions) {
  const theme = useContext(ThemeContext);

  const getLayoutFromGlobal = (): ResponsiveLayoutFlags<T> => {
    const isMobile = checkMatches(theme.mobileMediaQuery);
    const defaultResult = { isMobile: !!isMobile };
    if (!options?.customMediaQueries) {
      return defaultResult as ResponsiveLayoutFlags<T>;
    }
    const customQueries: Record<string, boolean> = Object.entries(options.customMediaQueries).reduce(
      (result, [name, query]) => Object.assign(result, { [name]: checkMatches(query) }),
      {},
    );

    return Object.assign(defaultResult, customQueries) as ResponsiveLayoutFlags<T>;
  };

  const getAllMediaQueries = (): Record<string, string> => {
    const defaultMediaQueries = { isMobile: theme.mobileMediaQuery };
    if (options?.customMediaQueries) {
      return Object.assign(defaultMediaQueries, options.customMediaQueries);
    }
    return defaultMediaQueries;
  };

  const [state, setState] = useState(getLayoutFromGlobal());

  const allMediaQueries = getAllMediaQueries();
  const allMediaListeners: Array<React.MutableRefObject<{ remove: () => void } | null>> = [];
  Object.values(allMediaQueries).forEach((_) => allMediaListeners.push(createRef()));

  const prepareMediaQueries = useCallback(() => {
    if (!theme) {
      return;
    }

    Object.entries(allMediaQueries).forEach(
      ([name, query], i) =>
        (allMediaListeners[i].current = addResponsiveLayoutListener(query, checkLayoutsMediaQueries)),
    );

    // Checking for SSR use case
    const globalLayout = getLayoutFromGlobal();
    const hasChangedQuery = Object.entries(globalLayout).find(([key, value]) => state[key] !== value);

    if (hasChangedQuery) {
      setState(globalLayout);
    }
  }, [theme]);

  const checkLayoutsMediaQueries = useCallback(
    (e: MediaQueryListEvent) => {
      if (!theme) {
        return;
      }

      Object.entries(allMediaQueries).forEach(([name, query]) => {
        if (e.media === query) {
          setState((prevState: ResponsiveLayoutFlags<T>) => ({
            ...prevState,
            [name]: e.matches,
          }));
        }
      });
    },
    [theme],
  );

  useEffect(() => {
    prepareMediaQueries();

    return () => {
      allMediaListeners.forEach((listener) => listener.current?.remove());
    };
  }, []);

  return state;
}

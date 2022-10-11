import React, { createRef, useCallback, useContext, useEffect, useState } from 'react';

import { ThemeContext } from '../../lib/theming/ThemeContext';

import { EmptyObject, MediaQueriesType, ResponsiveLayoutFlags, ResponsiveLayoutOptions } from './types';
import { addResponsiveLayoutListener, checkMatches } from './ResponsiveLayoutEvents';

export function useResponsiveLayout<T extends MediaQueriesType = EmptyObject>({
  customMediaQueries,
}: ResponsiveLayoutOptions<T> = {}) {
  const theme = useContext(ThemeContext);

  const allMediaQueries = Object.entries({
    isMobile: theme.mobileMediaQuery,
    ...customMediaQueries,
  }).map(([key, value]) => ({
    flag: key,
    query: value,
    ref: createRef() as React.MutableRefObject<{ remove: () => void } | null>,
  }));

  const getLayoutFromGlobal = (): ResponsiveLayoutFlags<T> => {
    return allMediaQueries.reduce(
      (result, mediaQuery) => Object.assign(result, { [mediaQuery.flag]: checkMatches(mediaQuery.query) }),
      {},
    ) as ResponsiveLayoutFlags<T>;
  };

  const [state, setState] = useState(getLayoutFromGlobal());

  const prepareMediaQueries = useCallback(() => {
    if (!theme) {
      return;
    }

    allMediaQueries.forEach(
      (mediaQuery) =>
        (mediaQuery.ref.current = addResponsiveLayoutListener(mediaQuery.query, checkLayoutsMediaQueries)),
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

      allMediaQueries.forEach((mediaQuery) => {
        if (e.media === mediaQuery.query) {
          setState((prevState: ResponsiveLayoutFlags<T>) => ({
            ...prevState,
            [mediaQuery.flag]: e.matches,
          }));
        }
      });
    },
    [theme],
  );

  useEffect(() => {
    prepareMediaQueries();

    return () => {
      allMediaQueries.forEach((mediaQuery) => mediaQuery.ref.current?.remove());
    };
  }, []);

  return state;
}

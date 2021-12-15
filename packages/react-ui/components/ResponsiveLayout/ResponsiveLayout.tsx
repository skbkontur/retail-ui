import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';

import { isFunction } from '../../lib/utils';
import { ThemeContext } from '../../lib/theming/ThemeContext';

import { CurrentLayoutFlags } from './types';
import { addResponsiveLayoutListener, checkMatches } from './ResponsiveLayoutEvents';

export function useResponsiveLayout() {
  const theme = useContext(ThemeContext);

  const getLayoutFromGlobal = (): CurrentLayoutFlags => {
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
        setState((prevState: CurrentLayoutFlags) => ({
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
      mobileListener.current?.remove;
    };
  }, []);

  return state;
}

interface ResponsiveLayoutProps {
  onLayoutChange?: (layout: CurrentLayoutFlags) => void;
  children?: React.ReactNode | ((currentLayout: CurrentLayoutFlags) => React.ReactNode);
}

export const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = (props) => {
  const layoutFlags = useResponsiveLayout();

  useEffect(() => {
    if (props.onLayoutChange) {
      props.onLayoutChange(layoutFlags);
    }
  }, [layoutFlags]);

  if (isFunction(props.children)) {
    return (props.children(layoutFlags) ?? null) as React.ReactElement;
  }

  return (props.children ?? null) as React.ReactElement;
};

export function responsiveLayout<T extends new (...args: any[]) => React.Component>(WrappedComp: T) {
  const ComponentWithLayout = class extends WrappedComp {
    public layout!: CurrentLayoutFlags;

    public get currentLayout(): CurrentLayoutFlags {
      return this.layout;
    }

    public set currentLayout(value: CurrentLayoutFlags) {
      //
    }

    public get isMobileLayout(): boolean {
      return this.layout.isMobile;
    }

    public set isMobileLayout(value: boolean) {
      //
    }

    public renderWithLayout = (currentLayout: CurrentLayoutFlags) => {
      this.layout = currentLayout;

      return super.render();
    };

    public render() {
      return <ResponsiveLayout>{this.renderWithLayout}</ResponsiveLayout>;
    }
  };

  const nameDescriptor = Object.getOwnPropertyDescriptor(ComponentWithLayout, 'name');

  if (!nameDescriptor || nameDescriptor.configurable) {
    Object.defineProperty(ComponentWithLayout, 'name', { value: WrappedComp.name });
  }

  return ComponentWithLayout;
}

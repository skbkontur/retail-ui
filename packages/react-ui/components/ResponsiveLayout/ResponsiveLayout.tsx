import React from 'react';
import { isEqual } from 'lodash';

import { ThemeContext } from '../../lib/theming/ThemeContext';
import { isFunction } from '../../lib/utils';
import { Theme } from '../../lib/theming/Theme';

import {
  addResponsiveLayoutListener,
  removeResponsiveLayoutListener,
  eventListenersMap,
  getMatches,
} from './ResponsiveLayoutEvents';

export enum LayoutMode {
  Desktop = 'DESKTOP',
  Mobile = 'MOBILE',
}

const DEFAULT_DESKTOP_MEDIA_QUERY = '(min-width: 1px)';

const LayoutMQThemeKeys: { [key in LayoutMode]: string } = {
  [LayoutMode.Desktop]: '',
  [LayoutMode.Mobile]: 'mobileMediaQuery',
};

type LayoutData = {
  name: LayoutMode;
  mediaQuery: string;
};

interface ResponsiveLayoutProps {
  onLayoutChange?: (layout: LayoutMode) => void;
  children?: React.ReactNode | ((currentLayout: ResponsiveLayoutState) => React.ReactNode);
}

export interface CurrentLayout {
  isDesktop: boolean;
  isMobile: boolean;
}

type ResponsiveLayoutState = CurrentLayout;

const DEFAULT_RESPONSIVE_LAYOUT_STATE: ResponsiveLayoutState = {
  isDesktop: true,
  isMobile: false,
};

export class ResponsiveLayout extends React.Component<ResponsiveLayoutProps, ResponsiveLayoutState> {
  public static __KONTUR_REACT_UI__ = 'ResponsiveLayout';

  public constructor(props: ResponsiveLayoutProps) {
    super(props);

    this.state = DEFAULT_RESPONSIVE_LAYOUT_STATE;
  }

  public theme!: Theme;

  public layoutsMap: { [x: string]: LayoutMode } = {};
  public layouts: LayoutData[] = [];

  componentDidMount() {
    this.prepareMediaQueries();
  }

  componentWillUnmount() {
    this.unsubscribeMediaQueries();
  }

  public prepareMediaQueries = () => {
    if (!this.theme) {
      return;
    }

    this.layouts = this.getLayoutsFromTheme(this.theme);

    this.layouts.forEach((layout) => {
      this.layoutsMap[layout.mediaQuery] = layout.name;
      addResponsiveLayoutListener(layout.mediaQuery, this, this.checkLayoutsMediaQueries);
    });

    const globalLayout = this.getLayoutFromGlobalListener();

    if (!isEqual(globalLayout, this.state)) {
      this.setState(globalLayout);
    }
  };

  public getLayoutFromGlobalListener = (): CurrentLayout => {
    const currentLayout: CurrentLayout = { ...DEFAULT_RESPONSIVE_LAYOUT_STATE };

    this.layouts.forEach((layout) => {
      const layoutFlag = this.getLayoutFlag(layout.name);
      const isMatch = getMatches(layout.mediaQuery);

      if (typeof isMatch !== 'undefined') {
        currentLayout[layoutFlag] = isMatch;
      }
    });

    return currentLayout;
  };

  public getLayoutFlag(layout: LayoutMode): keyof CurrentLayout {
    switch (layout) {
      case LayoutMode.Mobile:
        return 'isMobile';
      default:
        return 'isDesktop';
    }
  }

  public unsubscribeMediaQueries = () => {
    if (!this.theme) {
      return;
    }

    this.layouts.forEach((layout) => {
      removeResponsiveLayoutListener(layout.mediaQuery, this);
    });
  };

  public checkLayoutsMediaQueries = (e: MediaQueryListEvent) => {
    if (!this.theme) {
      return;
    }

    const layout = this.layoutsMap[e.media] || LayoutMode.Desktop;
    const layoutFlag: keyof ResponsiveLayoutState = this.getLayoutFlag(layout);

    this.setState((prevState: ResponsiveLayoutState) => ({
      ...prevState,
      [layoutFlag]: e.matches,
    }));
  };

  public createLayoutData(name: LayoutMode, mediaQuery: string): LayoutData {
    return {
      name,
      mediaQuery,
    };
  }

  public getLayoutsFromTheme(theme: Theme) {
    const layouts: LayoutData[] = [];

    try {
      Object.values(LayoutMode).forEach((layoutKey) => {
        if (layoutKey === LayoutMode.Desktop) {
          layouts.push(this.createLayoutData(layoutKey, DEFAULT_DESKTOP_MEDIA_QUERY));
        }

        if (LayoutMQThemeKeys) {
          //@ts-ignore
          const layoutThemeMediaQuery: string | undefined = theme[LayoutMQThemeKeys[layoutKey]];

          if (layoutThemeMediaQuery) {
            layouts.push(this.createLayoutData(layoutKey, layoutThemeMediaQuery));
          }
        }
      });
    } catch (error) {
      return layouts;
    }

    return layouts;
  }

  public render(): JSX.Element {
    console.log(eventListenersMap);
    console.log(this.state);

    return (
      <ThemeContext.Consumer>
        {(theme) => {
          this.theme = theme;

          return isFunction(this.props.children) ? this.props.children(this.state) : this.props.children;
        }}
      </ThemeContext.Consumer>
    );
  }
}

export function responsiveLayout<T extends new (...args: any[]) => React.Component>(WrappedComp: T) {
  const ComponentWithLayout = class extends WrappedComp {
    public layout: CurrentLayout = DEFAULT_RESPONSIVE_LAYOUT_STATE;

    public get currentLayout(): ResponsiveLayoutState {
      return this.layout;
    }

    public set currentLayout(value: ResponsiveLayoutState) {
      //
    }

    public get isMobileLayout(): boolean {
      return this.layout.isMobile;
    }

    public set isMobileLayout(value: boolean) {
      //
    }

    public get isDesktopLayout(): boolean {
      return this.layout.isDesktop;
    }

    public set isDesktopLayout(value: boolean) {
      //
    }

    public renderWithLayout = (currentLayout: CurrentLayout) => {
      this.layout = currentLayout;

      return super.render();
    };

    public render(): JSX.Element {
      return <ResponsiveLayout>{this.renderWithLayout}</ResponsiveLayout>;
    }
  };

  const nameDescriptor = Object.getOwnPropertyDescriptor(ComponentWithLayout, 'name');

  if (!nameDescriptor || nameDescriptor.configurable) {
    Object.defineProperty(ComponentWithLayout, 'name', { value: WrappedComp.name });
  }

  return ComponentWithLayout;
}

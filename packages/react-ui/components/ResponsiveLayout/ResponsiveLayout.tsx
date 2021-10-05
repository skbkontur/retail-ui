import React from 'react';

import { ThemeContext } from '../../lib/theming/ThemeContext';
import { isFunction } from '../../lib/utils';
import { canUseDOM } from '../../lib/client';
import { Theme } from '../../lib/theming/Theme';

export enum LayoutMode {
  Desktop = 'DESKTOP',
  Mobile = 'MOBILE',
}

const LayoutMQThemeKeys: { [key in LayoutMode]: string } = {
  [LayoutMode.Desktop]: '',
  [LayoutMode.Mobile]: 'mobileMediaQuery',
};

type LayoutData = {
  name: LayoutMode;
  mediaQuery: string;
};

interface CurrentLayout {
  layout: LayoutMode;
  isDesktop: boolean;
  isMobile: boolean;
}

export interface ResponsiveLayoutProps {
  onLayoutChange?: (layout: LayoutMode) => void;
  children?: React.ReactNode | ((currentLayout: CurrentLayout) => React.ReactNode);
}

export interface ResponsiveLayoutState {
  layout: LayoutMode;
}

export class ResponsiveLayout extends React.Component<ResponsiveLayoutProps, ResponsiveLayoutState> {
  public static __KONTUR_REACT_UI__ = 'ResponsiveLayout';

  public constructor(props: ResponsiveLayoutProps) {
    super(props);

    this.state = { layout: LayoutMode.Desktop };
  }

  public theme!: Theme;

  public currentMediaQeries?: MediaQueryList[];
  public layouts: LayoutData[] = [];

  componentDidMount() {
    if (!this.currentMediaQeries) {
      this.prepareMediaQueries();
    }
  }

  componentWillUnmount() {
    this.unsubscribeMediaQueries();
  }

  public prepareMediaQueries = () => {
    if (!this.theme) {
      return;
    }

    this.layouts = this.getCreatedLayouts(this.theme);

    this.currentMediaQeries = this.layouts.map((layout) => window.matchMedia(layout.mediaQuery));
    this.currentMediaQeries.forEach((mql) => {
      if (mql && mql.addEventListener) {
        mql.addEventListener('change', this.checkLayoutsMediaQueries);
      }
    });

    this.checkLayoutsMediaQueries();
  };

  public unsubscribeMediaQueries = () => {
    if (!this.theme) {
      return;
    }

    if (this.currentMediaQeries) {
      this.currentMediaQeries.forEach((mql) => {
        if (mql && mql.removeEventListener) {
          mql.removeEventListener('change', this.checkLayoutsMediaQueries);
        }
      });
    }
  };

  public checkLayoutsMediaQueries = (e?: MediaQueryListEvent) => {
    if (!this.theme) {
      return;
    }

    const matchedLayouts = this.layouts.filter((layout) => this.checkMQ(layout.mediaQuery));
    const firstMatchedLayout: LayoutData | undefined = matchedLayouts[0];

    if (e && e.matches && firstMatchedLayout && firstMatchedLayout.mediaQuery === e.media) {
      if (this.state.layout !== firstMatchedLayout.name) {
        this.setState({
          layout: firstMatchedLayout.name,
        });
      }

      return;
    }

    if (firstMatchedLayout && this.state.layout !== firstMatchedLayout.name) {
      this.setState({
        layout: firstMatchedLayout.name,
      });

      return;
    }

    if (!firstMatchedLayout && this.state.layout !== LayoutMode.Desktop) {
      this.setState({
        layout: LayoutMode.Desktop,
      });
    }
  };

  public createLayoutData(name: LayoutMode, mediaQuery: string): LayoutData {
    return {
      name,
      mediaQuery,
    };
  }

  public getCreatedLayouts(theme: Theme) {
    const layouts: LayoutData[] = [];

    try {
      Object.values(LayoutMode).forEach((layoutKey) => {
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

  public checkMQ(mediaQuery: string) {
    if (canUseDOM) {
      return window.matchMedia(mediaQuery).matches;
    }
  }

  public render(): JSX.Element {
    const currentLayout = {
      layout: this.state.layout,
      isDesktop: this.state.layout === LayoutMode.Desktop,
      isMobile: this.state.layout === LayoutMode.Mobile,
    };

    return (
      <ThemeContext.Consumer>
        {(theme) => {
          this.theme = theme;

          return isFunction(this.props.children) ? this.props.children(currentLayout) : this.props.children;
        }}
      </ThemeContext.Consumer>
    );
  }
}

export function responsiveLayout<T extends new (...args: any[]) => React.Component>(WrappedComp: T) {
  const ComponentWithLayout = class extends WrappedComp {
    public layout: LayoutMode = LayoutMode.Desktop;

    public get responsiveLayout(): LayoutMode {
      return this.layout;
    }

    public get isMobileLayout(): boolean {
      return this.layout === LayoutMode.Mobile;
    }

    public set isMobileLayout(value: boolean) {
      //
    }

    public get isDesktopLayout(): boolean {
      return this.layout === LayoutMode.Desktop;
    }

    public set isDesktopLayout(value: boolean) {
      //
    }

    public render(): JSX.Element {
      return (
        <ResponsiveLayout>
          {({ layout }) => {
            this.layout = layout;

            return super.render();
          }}
        </ResponsiveLayout>
      );
    }
  };

  const nameDescriptor = Object.getOwnPropertyDescriptor(ComponentWithLayout, 'name');

  if (!nameDescriptor || nameDescriptor.configurable) {
    Object.defineProperty(ComponentWithLayout, 'name', { value: WrappedComp.name });
  }

  return ComponentWithLayout;
}

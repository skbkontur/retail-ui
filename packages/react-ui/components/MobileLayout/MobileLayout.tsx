import React from 'react';

import { canUseDOM } from '../../lib/client';
import { Theme } from '../../lib/theming/Theme';

export enum LayoutMode {
  Desktop = 'DESKTOP',
  Mobile = 'MOBILE',
}

export interface MobileLayoutState {
  layout?: LayoutMode;
}

type LayoutData = {
  name: LayoutMode;
  mediaQuery: string;
};

const LayoutMQThemeKeys: { [key in LayoutMode]: string } = {
  [LayoutMode.Desktop]: '',
  [LayoutMode.Mobile]: 'mobileMediaQuery',
};

export function mobileLayout<T extends new (...args: any[]) => React.Component<any, MobileLayoutState>>(
  WrappedComp: T,
) {
  const ComponentWithLayout = class extends WrappedComp {
    public constructor(...args: any[]) {
      super(args[0]);

      this.state = { ...this.state, layout: LayoutMode.Desktop };
    }

    public theme!: Theme;

    public currentMediaQeries?: MediaQueryList[];
    public layouts: LayoutData[] = [];

    componentDidMount() {
      if (!this.currentMediaQeries) {
        this.prepareMediaQueries();
      }

      if (super.componentDidMount) {
        super.componentDidMount();
      }
    }

    componentWillUnmount() {
      this.unsubscribeMediaQueries();

      if (super.componentWillUnmount) {
        super.componentWillUnmount();
      }
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
        Object.values(LayoutMode).forEach((layout) => {
          // @ts-ignore
          const layoutThemeMediaQuery: string | undefined = theme[LayoutMQThemeKeys[layout]];
          if (layoutThemeMediaQuery) {
            layouts.push(this.createLayoutData(layout, layoutThemeMediaQuery));
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
      return <>{super.render()}</>;
    }
  };

  const nameDescriptor = Object.getOwnPropertyDescriptor(ComponentWithLayout, 'name');

  if (!nameDescriptor || nameDescriptor.configurable) {
    Object.defineProperty(ComponentWithLayout, 'name', { value: WrappedComp.name });
  }

  return ComponentWithLayout;
}

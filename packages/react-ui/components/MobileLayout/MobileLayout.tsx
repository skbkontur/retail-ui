import React from 'react';
import throttle from 'lodash.throttle';

import { canUseDOM } from '../../lib/client';
import { Theme } from '../../lib/theming/Theme';

export enum LayoutMode {
  Desktop = 'DESKTOP',
  Mobile = 'MOBILE',
}

export interface MobileLayoutState {
  layout?: LayoutMode;
  windowHeight?: number;
}

type LayoutData = {
  name: LayoutMode;
  mediaQuery: string;
};

const LayoutMQThemeKeys: { [key in LayoutMode]: string } = {
  [LayoutMode.Desktop]: '',
  [LayoutMode.Mobile]: 'mobileMediaQuery',
};

const DESKTOP_DEFAULT_MEDIA_QUERY = '(min-width: 0px)';

export const DEFAULT_LAYOUT = LayoutMode.Desktop;
export const DEFAULT_WINDOW_HEIGHT = canUseDOM ? window.innerHeight : 0;

export function mobileLayout<T extends new (...args: any[]) => React.Component<any, MobileLayoutState>>(
  WrappedComp: T,
) {
  const ComponentWithLayout = class extends WrappedComp {
    public constructor(...args: any[]) {
      super(args[0]);

      this.state = { ...this.state, layout: DEFAULT_LAYOUT, windowHeight: DEFAULT_WINDOW_HEIGHT };
    }

    public theme!: Theme;

    componentDidMount() {
      this.checkLayoutsMediaQueries();
      this.listenResize();

      if (super.componentDidMount) {
        super.componentDidMount();
      }
    }

    componentWillUnmount() {
      this.unlistenResize();

      if (super.componentWillUnmount) {
        super.componentWillUnmount();
      }
    }

    public checkLayoutsMediaQueries = () => {
      if (!this.theme) {
        return;
      }

      const layouts: LayoutData[] = this.getCreatedLayouts(this.theme);

      const matchedLayouts = layouts.filter((layout) => this.checkMQ(layout.mediaQuery));
      const lastMatchedLayout = matchedLayouts[matchedLayouts.length - 1];

      if (lastMatchedLayout && this.state.layout !== lastMatchedLayout.name) {
        this.setState({
          layout: lastMatchedLayout.name,
        });
      }
    };

    public throttledСheckLayoutsMediaQueries = throttle(this.checkLayoutsMediaQueries, 100);

    public updateWindowHeight = () => {
      if (canUseDOM) {
        this.setState({ windowHeight: window.innerHeight });
      }
    };

    public throttledUpdateWindowHeight = throttle(this.updateWindowHeight, 100);

    public listenResize() {
      if (canUseDOM) {
        window.addEventListener('resize', this.throttledСheckLayoutsMediaQueries);
      }
    }

    public unlistenResize() {
      if (canUseDOM) {
        window.removeEventListener('resize', this.throttledСheckLayoutsMediaQueries);
      }
    }

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
          const layoutMediaQuery = layoutThemeMediaQuery ? layoutThemeMediaQuery : DESKTOP_DEFAULT_MEDIA_QUERY;

          layouts.push(this.createLayoutData(layout, layoutMediaQuery));
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

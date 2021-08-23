import React from 'react';
import throttle from 'lodash.throttle';

import { canUseDOM } from '../../lib/client';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Theme } from '../../lib/theming/Theme';

export enum LayoutMode {
  Desktop = 'DESKTOP',
  Mobile = 'MOBILE',
}

export interface MobileLayoutState {
  layout: LayoutMode;
}

type LayoutData = {
  name: LayoutMode;
  mediaQuery: string;
};

const LayoutMQThemeKeys: { [key in LayoutMode]: string } = {
  [LayoutMode.Desktop]: '',
  [LayoutMode.Mobile]: 'mobileMediaQuery',
};

export function mobileLayout<T extends new (...args: any[]) => React.Component<any, MobileLayoutState>>(Comp: T) {
  return class extends Comp {
    public constructor(...args: any[]) {
      super(args[0]);
      this.state = { ...this.state, layout: LayoutMode.Desktop };
    }

    public theme!: Theme;

    public defaultLayout: LayoutData = this.createLayoutData(LayoutMode.Desktop, '');

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
      const layouts: LayoutData[] = this.getCreatedLayouts(this.theme);

      const matchedLayouts = layouts.filter((layoutData) => this.checkMQ(layoutData.mediaQuery));
      const lastMatchedLayout = matchedLayouts[matchedLayouts.length - 1];

      if (lastMatchedLayout && this.state.layout !== lastMatchedLayout.name) {
        this.setState({
          layout: lastMatchedLayout.name,
        });
      }
    };

    public throttledСheckLayoutsMediaQueries = throttle(this.checkLayoutsMediaQueries, 100);

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
          const layoutThemeMediaQuery = theme[LayoutMQThemeKeys[layout]];
          const layoutMediaQuery = layoutThemeMediaQuery ? layoutThemeMediaQuery : '';

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
      return (
        <ThemeContext.Consumer>
          {(theme) => {
            this.theme = theme;

            return super.render();
          }}
        </ThemeContext.Consumer>
      );
    }
  };
}

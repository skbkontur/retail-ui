import throttle from 'lodash.throttle';
import React from 'react';

import { canUseDOM } from '../../lib/client';
import { Theme } from '../../lib/theming/Theme';
import { ThemeContext } from '../../lib/theming/ThemeContext';

import { MobileLayoutContext, LayoutMode } from './MobileLayoutContext';

export interface MobileLayoutState {
  layoutChanged: boolean;
  layout: LayoutData | null;
}

type LayoutData = {
  name: LayoutMode;
  mediaQuery: string;
};

const LayoutMQThemeKeys: { [key in LayoutMode]: string } = {
  [LayoutMode.Desktop]: '',
  [LayoutMode.Mobile]: 'mobileMediaQuery',
};

export class MobileLayout extends React.Component<{}, MobileLayoutState> {
  public static __KONTUR_REACT_UI__ = 'MobileLayout';

  private theme!: Theme;

  private defaultLayout: LayoutData = this.createLayoutData(LayoutMode.Desktop, '');

  public state: MobileLayoutState = {
    layoutChanged: false,
    layout: null,
  };

  componentDidMount() {
    this.checkLayoutsMediaQueries();
    this.listenResize();
  }

  componentWillUnmount() {
    this.unlistenResize();
  }

  private checkLayoutsMediaQueries = () => {
    const layouts: LayoutData[] = this.getLayouts(this.theme);

    const matchedLayouts = layouts.filter((layoutData) => this.checkMQ(layoutData.mediaQuery));
    const lastMatchedLayout = matchedLayouts[matchedLayouts.length - 1];

    if (this.state.layout?.name !== lastMatchedLayout.name) {
      this.setState({
        layout: lastMatchedLayout,
      });
    }
  };

  private throttledСheckLayoutsMediaQueries = throttle(this.checkLayoutsMediaQueries, 100);

  private listenResize() {
    if (canUseDOM) {
      window.addEventListener('resize', this.throttledСheckLayoutsMediaQueries);
    }
  }

  private unlistenResize() {
    if (canUseDOM) {
      window.removeEventListener('resize', this.throttledСheckLayoutsMediaQueries);
    }
  }

  private createLayoutData(name: LayoutMode, mediaQuery: string): LayoutData {
    return {
      name,
      mediaQuery,
    };
  }

  private getLayouts(theme: Theme) {
    const layouts: LayoutData[] = [];

    Object.values(LayoutMode).forEach((layout) => {
      // @ts-ignore
      const themeMQ = theme[LayoutMQThemeKeys[layout]];

      console.log(themeMQ);

      const mediaQuery = themeMQ ? themeMQ : '';
      layouts.push(this.createLayoutData(LayoutMode.Mobile, mediaQuery));
    });

    return layouts;
  }

  private checkMQ(mediaQuery: string) {
    if (canUseDOM) {
      return window.matchMedia(mediaQuery).matches;
    }
  }

  public render(): JSX.Element {
    const { children } = this.props;

    const layout = this.state.layout ? this.state.layout.name : this.defaultLayout.name;

    return (
      <ThemeContext.Consumer>
        {(theme) => {
          this.theme = theme;

          return <MobileLayoutContext.Provider value={{ layout }}>{children}</MobileLayoutContext.Provider>;
        }}
      </ThemeContext.Consumer>
    );
  }
}

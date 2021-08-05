import React from 'react';

import { Theme } from '../../lib/theming/Theme';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { isFunction } from '../../lib/utils';
import { MobileLayoutHelpers } from '../../lib/theming/ThemeHelpers';

export interface MobileLayoutProps {
  onChange: (isMobile: boolean) => void;
}

export interface MobileLayoutState {
  isMobile: boolean;
}

export class MobileLayout extends React.Component<MobileLayoutProps, MobileLayoutState> {
  public static __KONTUR_REACT_UI__ = 'MobileLayout';

  private theme!: Theme;
  private MobileLayout!: MobileLayoutHelpers;

  public state: MobileLayoutState = {
    isMobile: false,
  };

  componentDidMount() {
    this.MobileLayout = new MobileLayoutHelpers(this.theme);

    this.setIsMobileOnMount();

    this.MobileLayout.listenIsMobile(this.setIsMobile);
  }

  componentWillUnmount() {
    this.MobileLayout.unlistenIsMobile();
  }

  public setIsMobileOnMount = () => {
    this.setState({
      isMobile: MobileLayoutHelpers.isMobileLayout(this.theme),
    });

    if (this.props.onChange) {
      this.props.onChange(MobileLayoutHelpers.isMobileLayout(this.theme));
    }
  };

  public setIsMobile = (ev: MediaQueryListEvent) => {
    this.setState({
      isMobile: ev.matches,
    });

    if (this.props.onChange) {
      this.props.onChange(ev.matches);
    }
  };

  public render(): JSX.Element {
    let { children } = this.props;
    const { isMobile } = this.state;

    if (isFunction(children)) {
      children = children(isMobile);
    }

    return (
      <ThemeContext.Consumer>
        {(theme) => {
          this.theme = theme;
          return children;
        }}
      </ThemeContext.Consumer>
    );
  }
}

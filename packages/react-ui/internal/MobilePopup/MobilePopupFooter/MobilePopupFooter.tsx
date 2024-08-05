import React from 'react';

import { Theme } from '../../../lib/theming/Theme';
import { ThemeContext } from '../../../lib/theming/ThemeContext';

import { jsStyles } from './MobilePopupFooter.styles';

export class MobilePopupFooter extends React.Component<React.PropsWithChildren> {
  public static __KONTUR_REACT_UI__ = 'MobileMenuFooter';

  private theme!: Theme;

  public render() {
    return (
      <ThemeContext.Consumer>
        {(theme) => {
          this.theme = theme;
          return this.renderMain();
        }}
      </ThemeContext.Consumer>
    );
  }

  private renderMain() {
    const { children } = this.props;

    if (!children || !React.isValidElement(children)) {
      return null;
    }

    return <div className={jsStyles.root(this.theme)}>{children}</div>;
  }
}

import React from 'react';
import type { Emotion } from '@emotion/css/types/create-instance';

import type { Theme } from '../../../lib/theming/Theme';
import { ThemeContext } from '../../../lib/theming/ThemeContext';
import { withRenderEnvironment } from '../../../lib/renderEnvironment';

import { getJsStyles } from './MobilePopupFooter.styles';

@withRenderEnvironment
export class MobilePopupFooter extends React.Component<React.PropsWithChildren> {
  public static __KONTUR_REACT_UI__ = 'MobileMenuFooter';

  private jsStyles!: ReturnType<typeof getJsStyles>;
  private emotion!: Emotion;
  private theme!: Theme;

  public render() {
    this.jsStyles = getJsStyles(this.emotion);

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

    return <div className={this.jsStyles.root(this.theme)}>{children}</div>;
  }
}

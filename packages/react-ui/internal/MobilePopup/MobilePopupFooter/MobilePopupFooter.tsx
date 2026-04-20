import type { Emotion } from '@emotion/css/create-instance';
import React from 'react';

import { withRenderEnvironment } from '../../../lib/renderEnvironment/index.js';
import type { Theme } from '../../../lib/theming/Theme.js';
import { ThemeContext } from '../../../lib/theming/ThemeContext.js';
import { getJsStyles } from './MobilePopupFooter.styles.js';

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

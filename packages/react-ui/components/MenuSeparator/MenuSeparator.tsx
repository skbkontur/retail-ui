import React from 'react';

import { ThemeConsumer } from '../ThemeConsumer';
import { Theme } from '../../lib/theming/Theme';

import { jsStyles } from './MenuSeparator.styles';

/**
 * Разделитель в меню.
 */
export class MenuSeparator extends React.Component<{}> {
  public static __KONTUR_REACT_UI__ = 'MenuSeparator';

  private theme!: Theme;

  public render() {
    return (
      <ThemeConsumer>
        {theme => {
          this.theme = theme;
          return this.renderMain();
        }}
      </ThemeConsumer>
    );
  }

  private renderMain() {
    return <div className={jsStyles.root(this.theme)} />;
  }
}

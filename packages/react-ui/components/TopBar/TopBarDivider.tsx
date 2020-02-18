import React from 'react';

import { ThemeConsumer } from '../ThemeConsumer';
import { Theme } from '../../lib/theming/Theme';

import { jsStyles } from './TopBar.styles';

/**
 * Разделитель в топбаре
 *
 * @visibleName TopBar.Divider
 */
export class TopBarDivider extends React.Component<{}> {
  public static __KONTUR_REACT_UI__ = 'TopBarDivider';

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
    return <span className={jsStyles.divider(this.theme)} />;
  }
}

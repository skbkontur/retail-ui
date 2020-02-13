import React from 'react';

import { cx } from '../../lib/theming/Emotion';
import { ThemeConsumer } from '../ThemeConsumer';
import { Theme } from '../../lib/theming/Theme';

import styles from './TopBar.module.less';
import { jsStyles } from './TopBar.styles';

/**
 * Разделитель в топбаре
 *
 * @visibleName TopBar.Divider
 */
export class Divider extends React.Component<{}> {
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
    return <span className={cx(styles.divider, jsStyles.divider(this.theme))} />;
  }
}

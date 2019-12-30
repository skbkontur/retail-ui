import * as React from 'react';
import { cx } from '../../lib/theming/Emotion';
import styles from './TopBar.module.less';
import { jsStyles } from './TopBar.styles';
import { ThemeConsumer } from '../ThemeConsumer';
import { Theme } from '../../lib/theming/Theme';

export class Divider extends React.Component<{}> {
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

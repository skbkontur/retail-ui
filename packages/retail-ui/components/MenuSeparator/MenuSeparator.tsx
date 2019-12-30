import * as React from 'react';
import styles from './MenuSeparator.module.less';
import { cx } from '../../lib/theming/Emotion';
import { jsStyles } from './MenuSeparator.styles';
import { ThemeConsumer } from '../ThemeConsumer';
import { Theme } from '../../lib/theming/Theme';

/**
 * Разделитель в меню.
 */
export class MenuSeparator extends React.Component<{}> {
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
    return <div className={cx(styles.root, jsStyles.root(this.theme))} />;
  }
}

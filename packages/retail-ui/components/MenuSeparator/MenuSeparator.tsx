import * as React from 'react';
import styles from './MenuSeparator.less';
import { cx } from 'emotion';
import jsStyles from './MenuSeparator.styles';
import { ThemeConsumer } from '../../lib/theming/ThemeProvider';
import { ITheme } from '../../lib/theming/Theme';

/**
 * Разделитель в меню.
 */
export default class MenuSeparator extends React.Component<{}> {
  private theme!: ITheme;

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

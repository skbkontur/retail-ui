import * as React from 'react';
import styles from './MenuSeparator.module.less';
import { cx } from '../../lib/theming/Emotion';
import jsStyles from './MenuSeparator.styles';
import { ThemeConsumer } from '../ThemeConsumer';
import { ITheme } from '../../lib/theming/Theme';

/**
 * Разделитель в меню.
 */
export default class MenuSeparator extends React.Component<{}> {
  public static __KONTUR_REACT_UI__ = 'MenuSeparator';

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

import * as React from 'react';
import { cx } from '../../lib/theming/Emotion';
import styles from './TopBar.less';
import jsStyles from './TopBar.styles';
import { ThemeConsumer } from '../internal/ThemeContext';
import { ITheme } from '../../lib/theming/Theme';

class Divider extends React.Component<{}> {
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
    return <span className={cx(styles.divider, jsStyles.divider(this.theme))} />;
  }
}

export default Divider;

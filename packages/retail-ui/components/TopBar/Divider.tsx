import * as React from 'react';
import { cx } from 'emotion';
import styles from './TopBar.less';
import jsStyles from './TopBar.styles';
import ThemeFactory from "../../lib/theming/ThemeFactory";

const theme = ThemeFactory.getDefaultTheme();

class Divider extends React.Component<{}> {
  public render() {
    return <span className={cx(styles.divider, jsStyles.divider(theme))} />;
  }
}

export default Divider;

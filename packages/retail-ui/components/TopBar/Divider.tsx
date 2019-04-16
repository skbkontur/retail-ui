import * as React from 'react';
import { cx } from 'emotion';

import styles from './TopBar.less';
import jsStyles from './TopBar.styles';
import ThemeManager from '../../lib/ThemeManager';

const theme = ThemeManager.getTheme();

class Divider extends React.Component<{}> {
  public render() {
    return <span className={cx(styles.divider, jsStyles.divider(theme))} />;
  }
}

export default Divider;

import * as React from 'react';

import styles from './MenuSeparator.less';

import { cx } from 'emotion';
import ThemeManager from '../../../retail-ui/lib/ThemeManager';
import jsStyles from './MenuSeparator.styles';

/**
 * Разделитель в меню.
 */
export default class MenuSeparator extends React.Component<{}> {
  public render() {
    const theme = ThemeManager.getTheme();
    return <div className={cx(styles.root, jsStyles.root(theme))} />;
  }
}

import * as React from 'react';
import styles from './MenuSeparator.less';
import { cx } from 'emotion';
import jsStyles from './MenuSeparator.styles';
import ThemeFactory from "../../lib/theming/ThemeFactory";

const theme = ThemeFactory.getDefaultTheme();

/**
 * Разделитель в меню.
 */
export default class MenuSeparator extends React.Component<{}> {
  public render() {

    return <div className={cx(styles.root, jsStyles.root(theme))} />;
  }
}

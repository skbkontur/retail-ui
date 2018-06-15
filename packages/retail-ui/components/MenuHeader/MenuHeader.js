

import * as React from 'react';
import classNames from 'classnames';

import styles from './MenuHeader.less';

type Props = {
  children: React.Node,
  _enableIconPadding: ?boolean
};

/**
 * Заголовок в меню.
 */
export default class MenuHeader extends React.Component<Props> {
  static __MENU_HEADER__ = true;
  static defaultProps = {
    _enableIconPadding: false
  };

  render() {
    const { children, _enableIconPadding } = this.props;
    const classnames = classNames({
      [styles.root]: true,
      [styles.withLeftPadding]: _enableIconPadding
    });
    return <div className={classnames}>{children}</div>;
  }
}

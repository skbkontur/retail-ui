// @flow

import React from 'react';
import classNames from 'classnames';

import styles from './MenuHeader.less';

type Props = {
  children: mixed,
  _enableIconPadding: ?bool,
};

/**
 * Заголовок в меню.
 */
export default class MenuHeader extends React.Component {
  static __MENU_HEADER__ = true;
  static defaultProps = {
    _enableIconPadding: false,
  }

  props: Props;

  render() {
    const {children, _enableIconPadding} = this.props;
    const classnames = classNames({
      [styles.root]: true,
      [styles.withLeftPadding]: _enableIconPadding,
    });
    return <div className={classnames}>{children}</div>;
  }
}

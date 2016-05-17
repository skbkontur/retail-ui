// @flow

import classNames from 'classnames';
import React from 'react';

import styles from './MenuItem.less';

global.React = React;

export default class MenuItem extends React.Component {
  static __MENU_ITEM__ = true;

  props: {
    state?: 'hover' | 'selected';
    href?: string;
    loose?: bool;
    onClick?: Function;
  };

  render() {
    const {
      loose,
      state,
      ...rest,
    } = this.props;
    const className = classNames({
      [styles.root]: true,
      [styles.hover]: state === 'hover',
      [styles.loose]: loose,
      [styles.selected]: state === 'selected',
    });

    return (
      <a
        {...rest}
        style={{cursor: this.props.href ? 'pointer' : 'default'}}
        className={className}
        tabIndex="-1"
      >
        {(this.props: any).children}
      </a>
    );
  }
}

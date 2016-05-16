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
    onClick?: Function;
  };

  handleClick: mixed = event => {
    const {href, onClick} = this.props;
    if (href) {
      location.href = href;
    }
    if (onClick) {
      onClick(event);
    }
  };

  render() {
    const {
      state,
      ...rest,
    } = this.props;
    const className = classNames({
      [styles.root]: true,
      [styles.hover]: state === 'hover',
      [styles.selected]: state === 'selected',
    });

    return (
      <a
        {...rest}
        className={className}
        tabIndex="-1"
        onClick={this.handleClick}
      >
        {(this.props: any).children}
      </a>
    );
  }
}

// @flow

import classNames from 'classnames';
import React from 'react';

import styles from './MenuItem.less';

export default class MenuItem extends React.Component {
  static __MENU_ITEM__ = true;

  props: {
    comment?: string;
    href?: string;
    loose?: bool;
    state?: 'hover' | 'selected';
    onClick?: Function;
  };

  render() {
    const {
      comment,
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
        className={className}
        tabIndex="-1"
      >
        {(this.props: any).children}
        {this.props.comment && (
          <div
            className={classNames({
              [styles.comment]: true,
              [styles.commentHover]: state === 'hover',
            })}
          >
            {comment}
          </div>
        )}
      </a>
    );
  }
}

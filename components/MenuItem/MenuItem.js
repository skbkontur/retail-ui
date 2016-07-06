// @flow

import classNames from 'classnames';
import React from 'react';

import styles from './MenuItem.less';

export default class MenuItem extends React.Component {
  static __MENU_ITEM__ = true;

  props: {
    comment?: string,
    disabled?: bool,
    href?: string,
    loose?: bool,
    state?: 'hover' | 'selected',
    target?: string,
    onClick?: () => void,
  };

  render() {
    const {
      comment,
      disabled,
      loose,
      state,

      onClick,

      ...rest,
    } = this.props;
    const hover = state === 'hover' && !disabled;
    const className = classNames({
      [styles.root]: true,
      [styles.disabled]: disabled,
      [styles.hover]: hover,
      [styles.loose]: loose,
      [styles.selected]: state === 'selected',
    });

    return (
      <a
        {...rest}
        className={className}
        tabIndex="-1"
        onClick={disabled ? null : onClick}
      >
        {(this.props: any).children}
        {this.props.comment && (
          <div
            className={classNames({
              [styles.comment]: true,
              [styles.commentHover]: hover,
            })}
          >
            {comment}
          </div>
        )}
      </a>
    );
  }
}

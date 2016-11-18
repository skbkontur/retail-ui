// @flow

import classNames from 'classnames';
import React, {PropTypes} from 'react';

import styles from './MenuItem.less';

export type MenuItemState = null | 'hover' | 'selected';

/**
 * Элемент меню.
 */
export default class MenuItem extends React.Component {
  static __MENU_ITEM__ = true;

  static propTypes = {
    alkoLink: PropTypes.bool,

    comment: PropTypes.string,

    disabled: PropTypes.bool,

    href: PropTypes.string,

    /** internal */
    loose: PropTypes.bool,

    /** internal */
    state: PropTypes.string,

    target: PropTypes.string,

    onClick: PropTypes.func,
  }

  props: {
    alkoLink?: bool,
    comment?: string,
    disabled?: bool,
    href?: string,
    loose?: bool,
    state?: MenuItemState,
    target?: string,
    onClick?: (event: Event) => void,
    onMouseDown?: (event: Event) => void,
    children?: any,
  };

  render() {
    const {
      alkoLink,
      comment,
      disabled,
      loose,
      state,

      onClick,

      ...rest
    } = this.props;
    const hover = state === 'hover' && !disabled;
    const className = classNames({
      [styles.root]: true,
      [styles.disabled]: disabled,
      [styles.hover]: hover,
      [styles.loose]: loose,
      [styles.selected]: state === 'selected',
      [styles.link]: alkoLink,
    });

    let {children} = this.props;
    if (typeof children === 'function') {
      children = children(this.props.state);
    }

    return (
      <a
        {...rest}
        className={className}
        tabIndex="-1"
        onMouseDown={disabled ? null : onClick}
      >
        {children}
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

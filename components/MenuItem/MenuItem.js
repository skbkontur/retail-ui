// @flow

import classNames from 'classnames';
import React, {PropTypes} from 'react';
import Icon from '../Icon';

import styles from './MenuItem.less';

export type MenuItemState = null | 'hover' | 'selected';

/**
 * Элемент меню.
 */
export default class MenuItem extends React.Component {
  static __MENU_ITEM__ = true;

  static propTypes = {
    alkoLink: PropTypes.bool,

    comment: PropTypes.node,

    disabled: PropTypes.bool,

    href: PropTypes.string,

    icon: PropTypes.string,

    /** internal */
    loose: PropTypes.bool,

    /** internal */
    state: PropTypes.string,

    target: PropTypes.string,

    onClick: PropTypes.func,
  }

  props: {
    _enableIconPadding?: bool,
    alkoLink?: bool,
    comment?: string,
    disabled?: bool,
    href?: string,
    icon?: string,
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
      icon,
      loose,
      state,

      onClick,

      ...rest
    } = this.props;
    let {
      _enableIconPadding,
      children,
    } = this.props;
    const hover = state === 'hover' && !disabled;
    let $icon = null;
    if (icon){
      _enableIconPadding = true;
      $icon = <div className={styles.icon}>
        <Icon name={icon} />
      </div>;
    }
    const className = classNames({
      [styles.root]: true,
      [styles.disabled]: disabled,
      [styles.hover]: hover,
      [styles.loose]: loose,
      [styles.selected]: state === 'selected',
      [styles.link]: alkoLink,
      [styles.withIcon]: _enableIconPadding,
    });
    if (typeof children === 'function') {
      children = children(this.props.state);
    }

    return (
      <a
        {...rest}
        className={className}
        tabIndex="-1"
        onClick={disabled ? null : onClick}
      >
        {$icon}
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

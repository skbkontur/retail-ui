// @flow

import classNames from 'classnames';
import * as React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';

import styles from './MenuItem.less';

export type MenuItemState = null | 'hover' | 'selected' | void;

const tagName = disabled => (disabled ? 'span' : 'a');

type Props = {
  _enableIconPadding?: boolean,
  alkoLink?: boolean,
  comment?: React.Node,
  disabled?: boolean,
  href?: string,
  icon?: string,
  loose?: boolean,
  state?: MenuItemState,
  target?: string,
  onClick?: (event: SyntheticEvent<*>) => mixed,
  onMouseDown?: (event: SyntheticEvent<*>) => void,
  onMouseEnter?: (SyntheticMouseEvent<'span' | 'a'>) => void,
  onMouseLeave?: (SyntheticMouseEvent<'span' | 'a'>) => void,
  children?: React.Node | ((state: MenuItemState) => React.Node)
};

/**
 * Элемент меню.
 */
export default class MenuItem extends React.Component<Props> {
  static __MENU_ITEM__ = true;
  static __MENU_HEADER__ = false;

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

    onClick: PropTypes.func
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
    let { _enableIconPadding, children } = this.props;
    const hover = state === 'hover' && !disabled;
    let $icon = null;
    if (icon) {
      _enableIconPadding = true;
      $icon = (
        <div className={styles.icon}>
          <Icon name={icon} />
        </div>
      );
    }
    const className = classNames({
      [styles.root]: true,
      [styles.disabled]: disabled,
      [styles.hover]: hover,
      [styles.loose]: loose,
      [styles.selected]: state === 'selected',
      [styles.link]: alkoLink,
      [styles.withIcon]: _enableIconPadding
    });
    if (typeof children === 'function') {
      children = children(this.props.state);
    }

    const Tag = tagName(disabled);

    return (
      <Tag
        {...rest}
        className={className}
        tabIndex="-1"
        onClick={disabled ? null : onClick}
      >
        {$icon}
        {children}
        {this.props.comment &&
          <div
            className={classNames({
              [styles.comment]: true,
              [styles.commentHover]: hover
            })}
          >
            {comment}
          </div>}
      </Tag>
    );
  }
}

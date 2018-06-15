// @flow

import classNames from 'classnames';
import * as React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';

import styles from './MenuItem.less';

export type MenuItemState = null | 'hover' | 'selected' | void;

const tagName = disabled => (disabled ? 'span' : 'a');

type Props = {
  /** @ignore */
  _enableIconPadding?: boolean,

  /** @ignore */
  alkoLink?: boolean,
  comment?: React.Node,
  disabled?: boolean,
  href?: string,
  icon?: string,

  /** @ignore */
  loose?: boolean,

  /** @ignore */
  state?: MenuItemState,
  target?: string,
  onClick?: (event: SyntheticEvent<HTMLElement>) => mixed,
  onMouseDown?: (event: SyntheticEvent<HTMLElement>) => void,
  onMouseEnter?: (event: SyntheticMouseEvent<HTMLElement>) => void,
  onMouseLeave?: (event: SyntheticMouseEvent<HTMLElement>) => void,
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

    loose: PropTypes.bool,

    state: PropTypes.string,

    target: PropTypes.string,

    onClick: PropTypes.func
  };

  render() {
    const {
      alkoLink,
      comment,
      disabled,
      icon: iconName,
      loose,
      state,
      children,
      onClick,
      _enableIconPadding,
      ...rest
    } = this.props;

    const hover = state === 'hover' && !disabled;

    let icon = null;
    if (iconName) {
      icon = (
        <div className={styles.icon}>
          <Icon name={iconName} />
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
      [styles.withIcon]: icon || _enableIconPadding
    });

    let content = children;
    if (typeof children === 'function') {
      content = children(this.props.state);
    }

    const Tag = tagName(disabled);

    return (
      <Tag
        {...rest}
        className={className}
        tabIndex="-1"
        onClick={disabled ? null : onClick}
      >
        {icon}
        {content}
        {this.props.comment && (
          <div
            className={classNames({
              [styles.comment]: true,
              [styles.commentHover]: hover
            })}
          >
            {comment}
          </div>
        )}
      </Tag>
    );
  }
}

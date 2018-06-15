import classNames from 'classnames';
import * as React from 'react';
import PropTypes from 'prop-types';
import Icon, { IconName } from '../Icon';

import styles from './MenuItem.less';

export type MenuItemState = null | 'hover' | 'selected' | void;

const tagName = (disabled: boolean | undefined) => (disabled ? 'span' : 'a');

export interface MenuItemProps {
  /** @ignore */
  _enableIconPadding?: boolean;

  /** @ignore */
  alkoLink?: boolean;
  comment?: React.ReactNode;
  disabled?: boolean;
  href?: string;
  icon?: IconName;

  /** @ignore */
  loose?: boolean;

  /** @ignore */
  state?: MenuItemState;
  target?: string;
  onClick?: (event: React.SyntheticEvent<HTMLElement>) => any;
  onMouseDown?: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseEnter?: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLElement>) => void;
  children?: React.ReactNode | ((state: MenuItemState) => React.ReactNode);
}

/**
 * Элемент меню.
 */
export default class MenuItem extends React.Component<MenuItemProps> {
  public static __MENU_ITEM__ = true;
  public static __MENU_HEADER__ = false;

  public static propTypes = {
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

  public render() {
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
      [styles.withIcon]: Boolean(icon) || _enableIconPadding
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
        tabIndex={-1}
        onClick={disabled ? undefined : onClick}
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

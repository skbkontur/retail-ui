import classNames from 'classnames';
import * as React from 'react';
import * as PropTypes from 'prop-types';
import Icon, { IconName } from '../Icon';

import styles from './MenuItem.less';

export type MenuItemState = null | 'hover' | 'selected' | void;
export type MenuItemElement = HTMLAnchorElement | HTMLSpanElement;

const tagName = (disabled: boolean | undefined) => (disabled ? 'span' : 'a');

export interface MenuItemProps {
  /** @ignore */
  _enableIconPadding?: boolean;

  /** @ignore */
  alkoLink?: boolean;
  comment?: React.ReactNode;
  disabled?: boolean;
  href?: string;
  icon?: IconName | React.ReactElement<any>;

  /** @ignore */
  loose?: boolean;

  /** @ignore */
  state?: MenuItemState;
  target?: string;
  onClick?: (event: React.MouseEvent<MenuItemElement>) => any;
  onMouseDown?: (event: React.MouseEvent<MenuItemElement>) => void;
  onMouseEnter?: (event: React.MouseEvent<MenuItemElement>) => void;
  onMouseLeave?: (event: React.MouseEvent<MenuItemElement>) => void;
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

    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),

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
      icon,
      loose,
      state,
      children,
      onClick,
      _enableIconPadding,
      ...rest
    } = this.props;

    const hover = state === 'hover' && !disabled;

    let iconElement = null;
    if (icon) {
      iconElement = (
        <div className={styles.icon}>
          {typeof icon === 'string' ? <Icon name={icon} /> : icon}
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
      [styles.withIcon]: Boolean(iconElement) || _enableIconPadding
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
        {iconElement}
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

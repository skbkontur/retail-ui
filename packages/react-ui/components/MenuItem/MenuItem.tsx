import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { isFunction } from '../../lib/utils';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Theme } from '../../lib/theming/Theme';
import { CommonProps, CommonWrapper, CommonWrapperRestProps } from '../../internal/CommonWrapper';

import { jsStyles } from './MenuItem.styles';

export type MenuItemState = null | 'hover' | 'selected' | void;

export interface MenuItemProps extends CommonProps {
  /** @ignore */
  _enableIconPadding?: boolean;

  comment?: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactElement<any>;
  link?: boolean;

  /** @ignore */
  loose?: boolean;

  /** @ignore */
  state?: MenuItemState;
  onClick?: (event: React.SyntheticEvent<HTMLElement>) => void;
  children?: React.ReactNode | ((state: MenuItemState) => React.ReactNode);
  target?: React.AnchorHTMLAttributes<HTMLAnchorElement>['target'];
  title?: React.AnchorHTMLAttributes<HTMLAnchorElement>['title'];
  href?: React.AnchorHTMLAttributes<HTMLAnchorElement>['href'];
  onMouseEnter?: React.MouseEventHandler;
  onMouseLeave?: React.MouseEventHandler;

  component?: React.ComponentType<any>;
}

/**
 * Элемент меню.
 */
export class MenuItem extends React.Component<MenuItemProps> {
  public static __KONTUR_REACT_UI__ = 'MenuItem';
  public static __MENU_ITEM__ = true;

  public static propTypes = {
    comment: PropTypes.node,

    disabled: PropTypes.bool,

    href: PropTypes.string,

    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),

    loose: PropTypes.bool,

    state: PropTypes.string,

    target: PropTypes.string,

    onClick: PropTypes.func,
  };

  private theme!: Theme;
  private mouseEntered = false;

  public render() {
    return (
      <ThemeContext.Consumer>
        {theme => {
          this.theme = theme;
          return <CommonWrapper {...this.props}>{this.renderMain}</CommonWrapper>;
        }}
      </ThemeContext.Consumer>
    );
  }

  private renderMain = (props: CommonWrapperRestProps<MenuItemProps>) => {
    const {
      link,
      comment,
      icon,
      loose,
      state,
      _enableIconPadding,
      component,
      onMouseEnter,
      onMouseLeave,
      ...rest
    } = props;

    const hover = state === 'hover' && !this.props.disabled;

    let iconElement = null;
    if (icon) {
      iconElement = <div className={jsStyles.icon()}>{icon}</div>;
    }

    const className = cn({
      [jsStyles.root()]: true,
      [jsStyles.loose()]: !!loose,
      [jsStyles.hover(this.theme)]: hover,
      [jsStyles.selected(this.theme)]: state === 'selected',
      [jsStyles.link(this.theme)]: !!link,
      [jsStyles.withIcon(this.theme)]: Boolean(iconElement) || !!_enableIconPadding,
      [jsStyles.disabled(this.theme)]: !!this.props.disabled,
    });

    const { children } = this.props;

    let content = children;
    if (isFunction(children)) {
      content = children(this.props.state);
    }

    const Component = this.getComponent();

    return (
      <Component
        {...rest}
        state={state}
        onMouseOver={this.handleMouseEnterFix}
        onMouseLeave={this.handleMouseLeave}
        className={className}
        tabIndex={-1}
      >
        {iconElement}
        {content}
        {this.props.comment && (
          <div
            data-tid="MenuItem__comment"
            className={cn({
              [jsStyles.comment()]: true,
              [jsStyles.commentHover()]: hover,
            })}
          >
            {comment}
          </div>
        )}
      </Component>
    );
  };

  // https://github.com/facebook/react/issues/10109
  // Mouseenter event not triggered when cursor moves from disabled button
  private handleMouseEnterFix = (e: React.MouseEvent<HTMLElement>) => {
    if (!this.mouseEntered && this.props.onMouseEnter) {
      this.mouseEntered = true;
      this.props.onMouseEnter(e);
    }
  };

  private handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    this.mouseEntered = false;
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(e);
    }
  };

  private getComponent = () => {
    const { disabled, component, href } = this.props;

    if (disabled) {
      return 'button';
    }

    if (component) {
      return component;
    }

    if (href) {
      return 'a';
    }

    return 'button';
  };
}

export const isMenuItem = (child: React.ReactNode): child is React.ReactElement<MenuItemProps> => {
  return React.isValidElement<MenuItemProps>(child)
    ? Object.prototype.hasOwnProperty.call(child.type, '__MENU_ITEM__')
    : false;
};

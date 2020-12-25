import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Icon, IconProps } from '../../internal/icons/20px';
import { createPropsGetter } from '../../lib/createPropsGetter';
import { CommonProps } from '../../typings/common';

import { jsStyles } from './TopBar.styles';

export interface TopBarItemProps extends CommonProps {
  _onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  _onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  active?: boolean;
  children?: React.ReactNode;
  className?: string;
  icon?: IconProps['name'] | React.ReactElement;
  iconOnly?: boolean;
  minWidth?: string | number;
  use: 'danger' | 'pay' | 'default';
  tabIndex?: number;
}
/**
 * Статичный элемент топбара
 *
 * @visibleName TopBar.ItemStatic
 */

export class TopBarItem extends React.Component<TopBarItemProps> {
  public static __KONTUR_REACT_UI__ = 'TopBarItem';

  public static propTypes = {
    use: PropTypes.oneOf(['danger', 'pay', 'default']),
  };

  public static defaultProps = {
    className: '',
    use: 'default',
  };

  private getProps = createPropsGetter(TopBarItem.defaultProps);

  public render() {
    const { active, children, _onClick, _onKeyDown, iconOnly, icon, minWidth, use, style, ...rest } = this.props;

    const className: string = this.getProps().className;

    const classes = cn({
      [jsStyles.item()]: true,
      [jsStyles.buttonActive()]: !!active,
      [jsStyles.usePay()]: use === 'pay',
      [jsStyles.useDanger()]: use === 'danger',
      [className]: true,
    });

    const iconClasses = cn({
      [jsStyles.icon()]: !!icon,
      [jsStyles.iconOnly()]: !!iconOnly,
    });
    const iconNode = typeof icon === 'string' ? <Icon name={icon} /> : icon;

    const wrapperProps = {
      ...rest,
      className: classes,
      style: {
        ...style,
        minWidth: minWidth ?? style?.width,
      },
      onClick: _onClick,
      onKeyDown: _onKeyDown,
    };

    return (
      <div {...wrapperProps}>
        {icon && <span className={iconClasses}>{iconNode}</span>}
        {icon && iconOnly ? null : children}
      </div>
    );
  }
}

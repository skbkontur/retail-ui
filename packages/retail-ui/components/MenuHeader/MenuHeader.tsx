import * as React from 'react';
import styles from './MenuHeader.less';
import { createPropsGetter } from '../internal/createPropsGetter';
import { Nullable } from '../../typings/utility-types';
import { cx as classNames } from 'emotion';
import jsStyles from './MenuHeader.styles';
import ThemeFactory from '../../lib/theming/ThemeFactory';

const theme = ThemeFactory.getDefaultTheme();

export interface MenuHeaderProps {
  children: React.ReactNode;
  _enableIconPadding?: Nullable<boolean>;
}

/**
 * Заголовок в меню.
 */
export default class MenuHeader extends React.Component<MenuHeaderProps> {
  public static __MENU_HEADER__ = true;
  public static defaultProps = {
    _enableIconPadding: false,
  };

  private getProps = createPropsGetter(MenuHeader.defaultProps);

  public render() {
    const classnames: string = classNames({
      [styles.root]: true,
      [jsStyles.withLeftPadding(theme)]: this.getProps()._enableIconPadding,
    });
    return <div className={classnames}>{this.props.children}</div>;
  }
}

export const isMenuHeader = (child: React.ReactChild): child is React.ReactElement<MenuHeaderProps> => {
  return React.isValidElement<MenuHeaderProps>(child) ? child.type.hasOwnProperty('__MENU_HEADER__') : false;
};

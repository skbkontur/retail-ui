import * as React from 'react';
import classNames from 'classnames';

import styles from './MenuHeader.less';
import { createPropsGetter } from '../internal/createPropsGetter';
import { Nullable } from '../../typings/utility-types';

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
      [styles.withLeftPadding]: this.getProps()._enableIconPadding,
    });
    return <div className={classnames}>{this.props.children}</div>;
  }
}

export const isMenuHeader = (child: React.ReactChild): child is React.ReactElement<MenuHeaderProps> => {
  return React.isValidElement<MenuHeaderProps>(child) ? child.type.hasOwnProperty('__MENU_HEADER__') : false;
};

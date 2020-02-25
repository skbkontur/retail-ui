import React from 'react';

import { createPropsGetter } from '../internal/createPropsGetter';
import { Nullable } from '../../typings/utility-types';
import { cx } from '../../lib/theming/Emotion';
import { ThemeConsumer } from '../ThemeConsumer';
import { Theme } from '../../lib/theming/Theme';

import { jsStyles } from './MenuHeader.styles';
import styles from './MenuHeader.module.less';

export interface MenuHeaderProps {
  _enableIconPadding?: Nullable<boolean>;
}

/**
 * Заголовок в меню.
 */
export class MenuHeader extends React.Component<MenuHeaderProps> {
  public static __KONTUR_REACT_UI__ = 'MenuHeader';
  public static __MENU_HEADER__ = true;

  public static defaultProps = {
    _enableIconPadding: false,
  };

  private theme!: Theme;
  private getProps = createPropsGetter(MenuHeader.defaultProps);

  public render() {
    return (
      <ThemeConsumer>
        {theme => {
          this.theme = theme;
          return this.renderMain();
        }}
      </ThemeConsumer>
    );
  }

  private renderMain() {
    const classnames: string = cx({
      [styles.root]: true,
      [jsStyles.withLeftPadding(this.theme)]: this.getProps()._enableIconPadding,
    });
    return <div className={classnames}>{this.props.children}</div>;
  }
}

export const isMenuHeader = (child: React.ReactNode): child is React.ReactElement<MenuHeaderProps> => {
  return React.isValidElement<MenuHeaderProps>(child)
    ? Object.prototype.hasOwnProperty.call(child.type, '__MENU_HEADER__')
    : false;
};

import * as React from 'react';
import styles from './MenuHeader.module.less';
import { createPropsGetter } from '../internal/createPropsGetter';
import { Nullable } from '../../typings/utility-types';
import { cx } from '../../lib/theming/Emotion';
import { jsStyles } from './MenuHeader.styles';
import { ThemeConsumer } from '../ThemeConsumer';
import { Theme } from '../../lib/theming/Theme';

export interface MenuHeaderProps {
  _enableIconPadding?: Nullable<boolean>;
}

/**
 * Заголовок в меню.
 */
export class MenuHeader extends React.Component<MenuHeaderProps> {
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
  return React.isValidElement<MenuHeaderProps>(child) ? child.type.hasOwnProperty('__MENU_HEADER__') : false;
};

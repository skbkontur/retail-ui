import React from 'react';

import { locale } from '../LocaleProvider/decorators';

import { ButtonItem, ButtonItemProps } from './TopBarButtonItem';
import { TopBarLocale, TopBarLocaleHelper } from './locale';

/**
 * Кнопка выхода
 *
 * @visibleName TopBar.Logout
 */
@locale('TopBar', TopBarLocaleHelper)
export class Logout extends React.Component<ButtonItemProps> {
  public static defaultProps = ButtonItem.defaultProps;
  private readonly locale!: TopBarLocale;

  public render() {
    return <ButtonItem {...this.props}>{this.props.children || this.locale.logout}</ButtonItem>;
  }
}

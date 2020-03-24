import React from 'react';

import { locale } from '../../lib/locale/decorators';

import { TopBarButtonItem, TopBarButtonItemProps } from './TopBarButtonItem';
import { TopBarLocale, TopBarLocaleHelper } from './locale';

/**
 * Кнопка выхода
 *
 * @visibleName TopBar.Logout
 */
@locale('TopBar', TopBarLocaleHelper)
export class TopBarLogout extends React.Component<TopBarButtonItemProps> {
  public static __KONTUR_REACT_UI__ = 'TopBarLogout';

  public static defaultProps = TopBarButtonItem.defaultProps;
  private readonly locale!: TopBarLocale;

  public render() {
    return <TopBarButtonItem {...this.props}>{this.props.children || this.locale.logout}</TopBarButtonItem>;
  }
}

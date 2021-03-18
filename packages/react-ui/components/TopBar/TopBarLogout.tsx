import React from 'react';

import { locale } from '../../lib/locale/decorators';
import { CommonProps, CommonWrapper, CommonWrapperRestProps } from '../../internal/CommonWrapper';

import { TopBarButtonItem, TopBarButtonItemProps } from './TopBarButtonItem';
import { TopBarLocale, TopBarLocaleHelper } from './locale';

export interface TopBarLogoutProps extends CommonProps, TopBarButtonItemProps {}
/**
 * Кнопка выхода
 *
 * @visibleName TopBar.Logout
 */
@locale('TopBar', TopBarLocaleHelper)
export class TopBarLogout extends React.Component<TopBarLogoutProps> {
  public static __KONTUR_REACT_UI__ = 'TopBarLogout';

  public static defaultProps = TopBarButtonItem.defaultProps;
  private readonly locale!: TopBarLocale;

  public render() {
    return <CommonWrapper {...this.props}>{this.renderMain}</CommonWrapper>;
  }

  private renderMain = (props: CommonWrapperRestProps<TopBarLogoutProps>) => {
    return <TopBarButtonItem {...props}>{this.props.children || this.locale.logout}</TopBarButtonItem>;
  };
}

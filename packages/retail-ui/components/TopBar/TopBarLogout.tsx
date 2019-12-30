import * as React from 'react';
import { locale } from '../LocaleProvider/decorators';
import { ButtonItem, ButtonItemProps } from './ButtonItem';
import { TopBarLocale, TopBarLocaleHelper } from './locale';

@locale('TopBar', TopBarLocaleHelper)
export class Logout extends React.Component<ButtonItemProps> {
  public static defaultProps = ButtonItem.defaultProps;
  private readonly locale!: TopBarLocale;

  public render() {
    return <ButtonItem {...this.props}>{this.props.children || this.locale.logout}</ButtonItem>;
  }
}

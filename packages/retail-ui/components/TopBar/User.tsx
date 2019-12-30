import * as React from 'react';
import * as PropTypes from 'prop-types';
import { locale } from '../LocaleProvider/decorators';
import { TopBarLocale, TopBarLocaleHelper } from './locale';

import { TopBarDropdown } from './TopBarDropdown';
import { MenuItem } from '../MenuItem';

export interface UserProps {
  userName: string;
  cabinetUrl?: string;
}

@locale('TopBar', TopBarLocaleHelper)
export class User extends React.Component<UserProps> {
  public static defaultProps = {
    cabinetUrl: 'https://cabinet.kontur.ru',
  };

  public static propTypes = {
    userName: PropTypes.string,

    /**
     * URL для кастомизации ссылок в меню пользователя
     */
    cabinetUrl: PropTypes.string,
  };

  private readonly locale!: TopBarLocale;

  public render(): JSX.Element {
    const { userName, cabinetUrl } = this.props;
    const { cabinetTitle, cabinetSettings, cabinetCertificates, cabinetServices } = this.locale;

    return (
      <TopBarDropdown icon={'user'} label={userName}>
        <div style={{ padding: '6px 18px 7px 15px' }}>
          <b>{cabinetTitle}</b>
        </div>
        <MenuItem loose href={cabinetUrl} target="_blank">
          {cabinetSettings}
        </MenuItem>
        <MenuItem loose href={`${cabinetUrl}/certificates`} target="_blank">
          {cabinetCertificates}
        </MenuItem>
        <MenuItem loose href={`${cabinetUrl}/services`} target="_blank">
          {cabinetServices}
        </MenuItem>
      </TopBarDropdown>
    );
  }
}

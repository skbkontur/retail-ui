import React from 'react';
import PropTypes from 'prop-types';

import { locale } from '../LocaleProvider/decorators';
import { MenuItem } from '../MenuItem';

import { TopBarLocale, TopBarLocaleHelper } from './locale';
import { TopBarDropdown } from './TopBarDropdown';

export interface TopBarUserProps {
  userName: string;
  cabinetUrl?: string;
}
/**
 * Меню работы с кабинетом пользователя
 *
 * @visibleName TopBar.User
 */

@locale('TopBar', TopBarLocaleHelper)
export class TopBarUser extends React.Component<TopBarUserProps> {
  public static __KONTUR_REACT_UI__ = 'TopBarUser';

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

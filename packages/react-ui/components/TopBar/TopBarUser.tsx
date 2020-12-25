import React from 'react';
import PropTypes from 'prop-types';

import { locale } from '../../lib/locale/decorators';
import { MenuItem } from '../MenuItem';
import { CommonProps } from '../../typings/common';

import { TopBarLocale, TopBarLocaleHelper } from './locale';
import { TopBarDropdown } from './TopBarDropdown';

export interface TopBarUserProps extends CommonProps {
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

  public render() {
    const { userName, cabinetUrl, ...rest } = this.props;
    const { cabinetSettings, cabinetCertificates, cabinetServices } = this.locale;

    return (
      <TopBarDropdown icon={'user'} label={userName} {...rest}>
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

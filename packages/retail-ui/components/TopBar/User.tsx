import * as React from 'react';
import * as PropTypes from 'prop-types';

import TopBarDropdown from './TopBarDropdown';
import MenuItem from '../MenuItem';

export interface UserProps {
  userName: string;
  cabinetUrl?: string;
}

class User extends React.Component<UserProps> {
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

  public render(): JSX.Element {
    const { userName, cabinetUrl } = this.props;
    return (
      <TopBarDropdown icon={'user'} label={userName}>
        <div style={{ padding: '6px 18px 7px 15px' }}>
          <b>Личный кабинет Контура</b>
        </div>
        <MenuItem loose href={cabinetUrl} target="_blank">
          Настройка входа в сервисы
        </MenuItem>
        <MenuItem loose href={`${cabinetUrl}/certificates`} target="_blank">
          Сертификаты
        </MenuItem>
        <MenuItem loose href={`${cabinetUrl}/services`} target="_blank">
          Оплата сервисов
        </MenuItem>
      </TopBarDropdown>
    );
  }
}

export default User;

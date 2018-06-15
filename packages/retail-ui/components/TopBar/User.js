

import * as React from 'react';
import TopBarDropdown from './TopBarDropdown';
import MenuItem from '../MenuItem';

class User extends React.Component<{
  userName: string
}> {
  render() {
    const { userName } = this.props;
    return (
      <TopBarDropdown icon="user" caption={userName}>
        <div style={{ padding: '6px 18px 7px 15px' }}>
          <b>Личный кабинет Контура</b>
        </div>
        <MenuItem loose href="https://cabinet.kontur.ru" target="_blank">
          Настройка входа в сервисы
        </MenuItem>
        <MenuItem
          loose
          href="https://cabinet.kontur.ru#certificates"
          target="_blank"
        >
          Сертификаты
        </MenuItem>
        <MenuItem
          loose
          href="https://cabinet.kontur.ru#services"
          target="_blank"
        >
          Оплата сервисов
        </MenuItem>
      </TopBarDropdown>
    );
  }
}

export default User;

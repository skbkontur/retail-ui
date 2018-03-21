import React from 'react';
import { storiesOf } from '@storybook/react';
import Menu from '../Menu';
import MenuItem from '../../MenuItem';
import MenuHeader from '../../MenuHeader';
import MenuSeparator from '../../MenuSeparator';
import DropdownMenu from '../DropdownMenu';
import Button from '../../Button';

storiesOf('Menu', module).add('Simple example', () => {
  const renderButton = props => (
    <div
      style={{
        padding: 30
      }}
    >
      <Button use="primary" {...props}>
        Открыть меню
      </Button>
    </div>
  );

  const renderNativeButton = props => (
    <button {...props}>Нативная кнопка</button>
  );

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap'
      }}
    >
      <div
        style={{
          padding: 30
        }}
      >
        <DropdownMenu
          onItemClick={any => {
            console.log('Клик по айтему:', any);
          }}
          renderAnchor={renderButton}
        >
          <MenuHeader>Заголовок меню</MenuHeader>
          <MenuSeparator />
          <MenuItem>Раз</MenuItem>
          <MenuItem>Два</MenuItem>
          <MenuItem>Три</MenuItem>
        </DropdownMenu>
      </div>
      <div
        style={{
          padding: 30
        }}
      >
        <DropdownMenu
          onItemClick={any => {
            console.log('Клик по айтему:', any);
          }}
          renderAnchor={renderNativeButton}
        >
          <MenuHeader>Заголовок меню</MenuHeader>
          <MenuSeparator />
          <MenuItem>Раз</MenuItem>
          <MenuItem>Два</MenuItem>
          <MenuItem>Три</MenuItem>
        </DropdownMenu>
      </div>
    </div>
  );
});

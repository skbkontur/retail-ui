import React from 'react';
import { storiesOf } from '@storybook/react';
import MenuItem from '../../MenuItem';
import MenuHeader from '../../MenuHeader';
import MenuSeparator from '../../MenuSeparator';
import DropdownMenu from '../DropdownMenu';
import Button from '../../Button';
import Gapped from '../../Gapped';
import Link from '../../Link';
import Icon from '../../Icon';
import Menu from '../../Menu/Menu';

storiesOf('DropdownMenu', module).add('Simple example', () => {
  const renderButton = props => (
    <Button use="primary" {...props}>
      Открыть меню
    </Button>
  );

  const renderLink = props => (
    <Link use="danger" {...props}>
      Ссылкой открыть меню
    </Link>
  );

  const renderMenuItem1 = props => <MenuItem {...props}>Пункт меню 1</MenuItem>;

  const renderMenuItem2 = props => <MenuItem {...props}>Пункт меню 2</MenuItem>;

  const renderMenuItem3 = props => <MenuItem {...props}>Пункт меню 3</MenuItem>;

  return (
    <Gapped>
      <DropdownMenu
        renderCaption={renderButton}
        menuMaxHeight={50}
        menuWidth={350}
      >
        <MenuHeader>Заголовок меню</MenuHeader>
        <MenuSeparator />
        <MenuItem>Раз</MenuItem>
        <MenuItem>Два</MenuItem>
        <MenuItem>Три</MenuItem>
        <MenuSeparator />
        <MenuItem>Раз</MenuItem>
        <MenuItem>Два</MenuItem>
        <MenuItem>Три</MenuItem>
      </DropdownMenu>
      <DropdownMenu
        onItemClick={any => {
          console.log('Клик по айтему:', any);
        }}
        renderCaption={renderLink}
      >
        <MenuHeader>Заголовок меню</MenuHeader>
        <MenuSeparator />
        <MenuItem>Раз</MenuItem>
        <MenuItem>Два</MenuItem>
        <MenuItem>Три</MenuItem>
      </DropdownMenu>
      <Menu>
        <MenuHeader>Заголовок меню</MenuHeader>
        <MenuSeparator />
        <DropdownMenu
          onItemClick={any => {
            console.log('Клик по айтему:', any);
          }}
          renderCaption={renderMenuItem1}
        >
          <MenuHeader>Заголовок меню</MenuHeader>
          <MenuSeparator />
          <MenuItem>Раз</MenuItem>
          <MenuItem>Два</MenuItem>
          <MenuItem>Три</MenuItem>
        </DropdownMenu>
        <DropdownMenu
          onItemClick={any => {
            console.log('Клик по айтему:', any);
          }}
          renderCaption={renderMenuItem2}
        >
          <MenuHeader>Заголовок меню</MenuHeader>
          <MenuSeparator />
          <MenuItem>Раз</MenuItem>
          <MenuItem>Два</MenuItem>
          <MenuItem>Три</MenuItem>
        </DropdownMenu>
        <DropdownMenu
          onItemClick={any => {
            console.log('Клик по айтему:', any);
          }}
          renderCaption={renderMenuItem3}
        >
          <MenuHeader>Заголовок меню</MenuHeader>
          <MenuSeparator />
          <MenuItem>Раз</MenuItem>
          <MenuItem>Два</MenuItem>
          <MenuItem>Три</MenuItem>
        </DropdownMenu>
      </Menu>
      <DropdownMenu renderCaption={props => <Icon name="apple" />}>
        <MenuHeader>Заголовок меню</MenuHeader>
        <MenuSeparator />
        <MenuItem>Раз</MenuItem>
        <MenuItem>Два</MenuItem>
        <MenuItem>Три</MenuItem>
      </DropdownMenu>
    </Gapped>
  );
});

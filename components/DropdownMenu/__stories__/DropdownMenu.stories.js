import React from 'react';
import { storiesOf } from '@storybook/react';
import MenuItem from '../../MenuItem';
import MenuHeader from '../../MenuHeader';
import MenuSeparator from '../../MenuSeparator';
import DropdownMenu from '../DropdownMenu';
import Button from '../../Button';
import Icon from '../../Icon';

storiesOf('DropdownMenu', module)
  .add('Простой пример', () => (
    <DropdownMenu caption={<Button use="primary">Открыть меню</Button>}>
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
  ))
  .add('С указанием ширины меню', () => (
    <DropdownMenu
      caption={<Button use="primary">Открыть меню</Button>}
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
  ))
  .add('С указанием максимальной высоты меню', () => (
    <DropdownMenu
      caption={<Button use="primary">Открыть меню</Button>}
      menuMaxHeight={150}
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
  ))
  .add('В caption можно передать любой элемент', () => (
    <DropdownMenu caption={<Icon name="Menu" size={32} />} menuWidth="300px">
      <MenuItem>Раз</MenuItem>
      <MenuItem>Два</MenuItem>
      <MenuItem>Три</MenuItem>
    </DropdownMenu>
  ));

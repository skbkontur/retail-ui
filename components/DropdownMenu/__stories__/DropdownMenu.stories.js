import React from 'react';
import { storiesOf } from '@storybook/react';
import MenuItem from '../../MenuItem';
import MenuHeader from '../../MenuHeader';
import MenuSeparator from '../../MenuSeparator';
import DropdownMenu from '../DropdownMenu';
import Button from '../../Button';
import Icon from '../../Icon';
import Toast from '../../Toast';

storiesOf('DropdownMenu', module)
  .addDecorator(story => (
    <div
      style={{
        padding: '20px 120px 150px',
        border: '1px solid #dfdede',
        overflow: 'hidden'
      }}
    >
      {story()}
    </div>
  ))
  .add('Simple example', () => (
    <DropdownMenu caption={<Button use="primary">Открыть меню</Button>}>
      <MenuHeader>Заголовок меню</MenuHeader>
      <MenuSeparator />
      <MenuItem onClick={() => Toast.push('Раз')}>Раз</MenuItem>
      <MenuItem onClick={() => Toast.push('Два')}>Два</MenuItem>
      <MenuItem onClick={() => Toast.push('Три')}>Три</MenuItem>
    </DropdownMenu>
  ))
  .add('Example with width of menu', () => (
    <DropdownMenu
      caption={<Button use="primary">Открыть меню</Button>}
      menuWidth={350}
    >
      <MenuHeader>Заголовок меню</MenuHeader>
      <MenuSeparator />
      <MenuItem>Раз</MenuItem>
      <MenuItem>Два</MenuItem>
      <MenuItem>Три</MenuItem>
    </DropdownMenu>
  ))
  .add('Example with maximum height of menu', () => (
    <DropdownMenu
      caption={<Button use="primary">Открыть меню</Button>}
      menuMaxHeight={150}
    >
      <MenuHeader>Заголовок меню</MenuHeader>
      <MenuSeparator />
      <MenuItem>Раз</MenuItem>
      <MenuItem>Два</MenuItem>
      <MenuItem>Три</MenuItem>
    </DropdownMenu>
  ))
  .add('Caption accepts an arbitrary element', () => (
    <DropdownMenu
      menuWidth="300px"
      caption={
        <span tabIndex="0" style={{ display: 'inline-block' }}>
          <Icon name="Menu" size={32} />
        </span>
      }
    >
      <MenuItem>Раз</MenuItem>
      <MenuItem>Два</MenuItem>
      <MenuItem>Три</MenuItem>
    </DropdownMenu>
  ))
  .add('Only static elements', () => (
    <DropdownMenu
      menuWidth="300px"
      caption={
        <span tabIndex="0" style={{ display: 'inline-block' }}>
          <Icon name="Menu" size={32} />
        </span>
      }
    >
      <MenuHeader>Заголовок меню</MenuHeader>
      <MenuSeparator />
      <MenuItem disabled>Недоступен</MenuItem>
    </DropdownMenu>
  ));

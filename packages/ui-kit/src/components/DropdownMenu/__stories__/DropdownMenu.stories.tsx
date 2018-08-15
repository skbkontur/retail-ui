import { storiesOf } from '@storybook/react';
import React from 'react';
import Button from '../../Button';
import MenuItem from '../../MenuItem';
import DropdownMenu from '../DropdownMenu';

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
      <MenuItem.Header>Заголовок меню</MenuItem.Header>
      <MenuItem.Separator />
      <MenuItem>Раз</MenuItem>
      <MenuItem>Два</MenuItem>
      <MenuItem>Три</MenuItem>
    </DropdownMenu>
  ))
  .add('Example with width of menu', () => (
    <DropdownMenu caption={<Button use="primary">Открыть меню</Button>} menuWidth={350}>
      <MenuItem.Header>Заголовок меню</MenuItem.Header>
      <MenuItem.Separator />
      <MenuItem>Раз</MenuItem>
      <MenuItem>Два</MenuItem>
      <MenuItem>Три</MenuItem>
    </DropdownMenu>
  ))
  .add('Example with maximum height of menu', () => (
    <DropdownMenu caption={<Button use="primary">Открыть меню</Button>} menuMaxHeight={150}>
      <MenuItem.Header>Заголовок меню</MenuItem.Header>
      <MenuItem.Separator />
      <MenuItem>Раз</MenuItem>
      <MenuItem>Два</MenuItem>
      <MenuItem>Три</MenuItem>
    </DropdownMenu>
  ))
  .add('Caption accepts an arbitrary element', () => (
    <DropdownMenu
      menuWidth="300px"
      caption={
        <span tabIndex={0} style={{ display: 'inline-block' }}>
          <span style={{ fontSize: 32 }}>🐥</span>
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
        <span tabIndex={0} style={{ display: 'inline-block' }}>
          <span style={{ fontSize: 32 }}>🐥</span>
        </span>
      }
    >
      <MenuItem.Header>Заголовок меню</MenuItem.Header>
      <MenuItem.Separator />
      <MenuItem disabled>Недоступен 1</MenuItem>
      <MenuItem disabled>Недоступен 2</MenuItem>
      <MenuItem disabled>Недоступен 3</MenuItem>
    </DropdownMenu>
  ));

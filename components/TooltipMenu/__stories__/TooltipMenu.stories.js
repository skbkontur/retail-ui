import React from 'react';
import { storiesOf } from '@storybook/react';
import MenuItem from '../../MenuItem';
import MenuHeader from '../../MenuHeader';
import MenuSeparator from '../../MenuSeparator';
import TooltipMenu from '../TooltipMenu';
import Button from '../../Button';
import Icon from '../../Icon';

storiesOf('TooltipMenu', module)
  .addDecorator(story => (
    <div
      style={{
        padding: '120px 120px 150px',
        border: '1px solid #dfdede',
        overflow: 'hidden'
      }}
    >
      {story()}
    </div>
  ))
  .add('Simple example', () => (
    <TooltipMenu caption={<Button use="primary">Открыть меню</Button>}>
      <MenuHeader>Заголовок меню</MenuHeader>
      <MenuSeparator />
      <MenuItem>Раз</MenuItem>
      <MenuItem>Два</MenuItem>
      <MenuItem>Три</MenuItem>
    </TooltipMenu>
  ))
  .add('Example with width of menu', () => (
    <TooltipMenu
      caption={<Button use="primary">Открыть меню</Button>}
      menuWidth={350}
    >
      <MenuHeader>Заголовок меню</MenuHeader>
      <MenuSeparator />
      <MenuItem>Раз</MenuItem>
      <MenuItem>Два</MenuItem>
      <MenuItem>Три</MenuItem>
    </TooltipMenu>
  ))
  .add('Example with maximum height of menu', () => (
    <TooltipMenu
      caption={<Button use="primary">Открыть меню</Button>}
      menuMaxHeight={150}
    >
      <MenuHeader>Заголовок меню</MenuHeader>
      <MenuSeparator />
      <MenuItem>Раз</MenuItem>
      <MenuItem>Два</MenuItem>
      <MenuItem>Три</MenuItem>
    </TooltipMenu>
  ))
  .add('Caption accepts an arbitrary element', () => (
    <TooltipMenu caption={<Icon name="Menu" size={32} />} menuWidth="300px">
      <MenuItem>Раз</MenuItem>
      <MenuItem>Два</MenuItem>
      <MenuItem>Три</MenuItem>
    </TooltipMenu>
  ));

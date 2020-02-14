import React from 'react';
import { storiesOf } from '@storybook/react';
import MenuIcon from '@skbkontur/react-icons/Menu';
import LightbulbIcon from '@skbkontur/react-icons/Lightbulb';

import { MenuItem } from '../../MenuItem';
import { MenuHeader } from '../../MenuHeader';
import { MenuSeparator } from '../../MenuSeparator';
import { TooltipMenu } from '../TooltipMenu';
import { Button } from '../../Button';

storiesOf('TooltipMenu', module)
  .addDecorator(story => (
    <div
      style={{
        padding: 200,
        border: '1px solid #dfdede',
        overflow: 'hidden',
        textAlign: 'center',
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
    <TooltipMenu caption={<Button use="primary">Открыть меню</Button>} menuWidth={300}>
      <MenuHeader>Заголовок меню</MenuHeader>
      <MenuSeparator />
      <MenuItem>Раз</MenuItem>
      <MenuItem>Два</MenuItem>
      <MenuItem>Три</MenuItem>
    </TooltipMenu>
  ))
  .add('Example with maximum height of menu', () => (
    <TooltipMenu caption={<Button use="primary">Открыть меню</Button>} menuMaxHeight={150}>
      <MenuHeader>Заголовок меню</MenuHeader>
      <MenuSeparator />
      <MenuItem>Раз</MenuItem>
      <MenuItem>Два</MenuItem>
      <MenuItem>Три</MenuItem>
    </TooltipMenu>
  ))
  .add('Caption accepts an arbitrary element', () => (
    <TooltipMenu
      caption={
        <span style={{ display: 'inline-block' }} tabIndex={0}>
          <MenuIcon size={32} />
        </span>
      }
      menuWidth="220px"
    >
      <MenuItem>Раз</MenuItem>
      <MenuItem>Два</MenuItem>
      <MenuItem>Три</MenuItem>
    </TooltipMenu>
  ))
  .add('Menu in right position only', () => (
    <TooltipMenu
      caption={
        <span style={{ display: 'inline-block' }} tabIndex={0}>
          <LightbulbIcon size={32} />
        </span>
      }
      menuWidth="160px"
      positions={['right top', 'right middle', 'right bottom']}
    >
      <MenuItem>Раз</MenuItem>
      <MenuItem>Два</MenuItem>
      <MenuItem>Три</MenuItem>
    </TooltipMenu>
  ))
  .add('Menu in top position only, align right', () => (
    <TooltipMenu
      caption={
        <span style={{ display: 'inline-block' }} tabIndex={0}>
          <LightbulbIcon size={32} />
        </span>
      }
      menuWidth="150px"
      positions={['top right']}
    >
      <MenuItem>Раз</MenuItem>
      <MenuItem>Два</MenuItem>
      <MenuItem>Три</MenuItem>
    </TooltipMenu>
  ))
  .add('Menu without animations', () => (
    <TooltipMenu disableAnimations caption={<Button use="primary">Нет анимации</Button>}>
      <MenuHeader>Анимация не пройдет</MenuHeader>
      <MenuSeparator />
      <MenuItem>Я не верю в мультики</MenuItem>
    </TooltipMenu>
  ));

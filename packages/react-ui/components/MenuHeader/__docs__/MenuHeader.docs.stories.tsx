import { Button, DropdownMenu, Gapped, MenuHeader, MenuItem } from '@skbkontur/react-ui';
import React from 'react';

import type { Meta, Story } from '../../../typings/stories.js';

const meta: Meta = {
  title: 'Menu/MenuHeader',
  component: MenuHeader,
  parameters: { creevey: { skip: true } },
};

export default meta;

export const ExampleBasic: Story = () => {
  return (
    <DropdownMenu caption={<Button use="accent">Открыть меню</Button>}>
      <MenuHeader>Заголовок 1</MenuHeader>
      <MenuItem>Пункт 1</MenuItem>
      <MenuItem>Пункт 2</MenuItem>
      <MenuItem>Пункт 3</MenuItem>
      <MenuHeader>Заголовок 2</MenuHeader>
      <MenuItem>Пункт 1</MenuItem>
      <MenuItem>Пункт 2</MenuItem>
      <MenuItem>Пункт 3</MenuItem>
    </DropdownMenu>
  );
};
ExampleBasic.storyName = 'Базовый пример';

/** Проп `size` задаёт размер. По умолчанию: `'small'`. */
export const ExampleSize: Story = () => {
  return (
    <Gapped vertical gap={20}>
      <DropdownMenu
        caption={
          <Button size="small" use="accent">
            Маленький
          </Button>
        }
      >
        <MenuHeader size="small">Размер small</MenuHeader>
        <MenuItem size="small">Пункт 1</MenuItem>
        <MenuItem size="small">Пункт 2</MenuItem>
      </DropdownMenu>

      <DropdownMenu
        caption={
          <Button size="medium" use="accent">
            Средний
          </Button>
        }
      >
        <MenuHeader size="medium">Размер medium</MenuHeader>
        <MenuItem size="medium">Пункт 1</MenuItem>
        <MenuItem size="medium">Пункт 2</MenuItem>
      </DropdownMenu>

      <DropdownMenu
        caption={
          <Button size="large" use="accent">
            Большой
          </Button>
        }
      >
        <MenuHeader size="large">Размер large</MenuHeader>
        <MenuItem size="large">Пункт 1</MenuItem>
        <MenuItem size="large">Пункт 2</MenuItem>
      </DropdownMenu>
    </Gapped>
  );
};
ExampleSize.storyName = 'Размер';

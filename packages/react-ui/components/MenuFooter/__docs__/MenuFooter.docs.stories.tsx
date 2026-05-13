import { Button, DropdownMenu, Gapped, MenuFooter, MenuItem } from '@skbkontur/react-ui';
import React from 'react';

import type { Meta, Story } from '../../../typings/stories.js';

const meta: Meta = {
  title: 'Menu/MenuFooter',
  component: MenuFooter,
  parameters: { creevey: { skip: true } },
};

export default meta;

export const ExampleBasic: Story = () => {
  return (
    <DropdownMenu caption={<Button use="accent">Открыть меню</Button>}>
      <MenuItem>Пункт 1</MenuItem>
      <MenuItem>Пункт 2</MenuItem>
      <MenuItem>Пункт 3</MenuItem>
      <MenuFooter>Всего 3 пункта</MenuFooter>
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
        <MenuItem size="small">Пункт 1</MenuItem>
        <MenuItem size="small">Пункт 2</MenuItem>
        <MenuItem size="small">Пункт 3</MenuItem>
        <MenuFooter size="small">Размер small</MenuFooter>
      </DropdownMenu>

      <DropdownMenu
        caption={
          <Button size="medium" use="accent">
            Средний
          </Button>
        }
      >
        <MenuItem size="medium">Пункт 1</MenuItem>
        <MenuItem size="medium">Пункт 2</MenuItem>
        <MenuItem size="medium">Пункт 3</MenuItem>
        <MenuFooter size="medium">Размер medium</MenuFooter>
      </DropdownMenu>

      <DropdownMenu
        caption={
          <Button size="large" use="accent">
            Большой
          </Button>
        }
      >
        <MenuItem size="large">Пункт 1</MenuItem>
        <MenuItem size="large">Пункт 2</MenuItem>
        <MenuItem size="large">Пункт 3</MenuItem>
        <MenuFooter size="large">Размер large</MenuFooter>
      </DropdownMenu>
    </Gapped>
  );
};
ExampleSize.storyName = 'Размер';

import React from 'react';
import { MenuHeader, Button, MenuItem, DropdownMenu, Gapped } from '@skbkontur/react-ui';

import type { Meta, Story } from '../../../typings/stories';

export default {
  title: 'Menu/MenuHeader',
  component: MenuHeader,
  parameters: { creevey: { skip: true } },
} as Meta;

export const Example1: Story = () => {
  return (
    <DropdownMenu menuMaxHeight="10rem" caption={<Button use="primary">Сотрудники компании</Button>}>
      <MenuHeader>Разработчики</MenuHeader>
      <MenuItem>Вася</MenuItem>
      <MenuItem>Петя</MenuItem>
      <MenuItem>Маша</MenuItem>
      <MenuHeader>Дизайнеры</MenuHeader>
      <MenuItem>Галя</MenuItem>
      <MenuItem>Гриша</MenuItem>
      <MenuItem>Гена</MenuItem>
      <MenuHeader>Продакты</MenuHeader>
      <MenuItem>Валя</MenuItem>
      <MenuItem>Аля</MenuItem>
      <MenuItem>Артём</MenuItem>
    </DropdownMenu>
  );
};
Example1.storyName = 'Базовый пример меню с заголовками';

export const Example2: Story = () => {
  return (
    <Gapped vertical>
      <MenuHeader size={'small'}>Маленький</MenuHeader>
      <MenuHeader size={'medium'}>Средний</MenuHeader>
      <MenuHeader size={'large'}>Большой</MenuHeader>
    </Gapped>
  );
};
Example2.storyName = 'Размер';

import React from 'react';
import { MenuFooter, Button, MenuItem, DropdownMenu, Gapped } from '@skbkontur/react-ui';

import { Meta, Story } from '../../../typings/stories';

export default {
  title: 'Menu/MenuFooter',
  component: MenuFooter,
  parameters: { creevey: { skip: true } },
} as Meta;

export const Example1: Story = () => {
  return (
    <DropdownMenu menuMaxHeight="10rem" caption={<Button use="primary">Сотрудники компании</Button>}>
      <MenuItem>Вася</MenuItem>
      <MenuItem>Петя</MenuItem>
      <MenuItem>Маша</MenuItem>
      <MenuFooter>Всего 3 человека</MenuFooter>
    </DropdownMenu>
  );
};
Example1.storyName = 'Базовый пример меню с заголовками';

export const Example2: Story = () => {
  return (
    <Gapped vertical>
      <MenuFooter size={'small'}>Маленький</MenuFooter>
      <MenuFooter size={'medium'}>Средний</MenuFooter>
      <MenuFooter size={'large'}>Большой</MenuFooter>
    </Gapped>
  );
};
Example2.storyName = 'Размер';

import React from 'react';
import { MenuSeparator, Button, MenuItem, DropdownMenu } from '@skbkontur/react-ui';

import { Meta, Story } from '../../../typings/stories';

export default {
  title: 'Menu/MenuSeparator',
  component: MenuSeparator,
  parameters: { creevey: { skip: true } },
} as Meta;

export const Example1: Story = () => {
  return (
    <DropdownMenu caption={<Button use="primary">Открыть меню с разделителями</Button>}>
      <MenuItem>У меня есть разделитель</MenuItem>
      <MenuSeparator />
      <MenuItem>У меня тоже!</MenuItem>
      <MenuSeparator />
      <MenuItem>А у меня нет :(</MenuItem>
      <MenuItem>Как и у меня :(</MenuItem>
    </DropdownMenu>
  );
};
Example1.storyName = 'Меню с разделителями';

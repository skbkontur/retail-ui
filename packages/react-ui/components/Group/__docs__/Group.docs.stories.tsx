import React from 'react';
import { MathFunctionIcon } from '@skbkontur/icons/icons/MathFunctionIcon';
import { SearchLoupeIcon } from '@skbkontur/icons/icons/SearchLoupeIcon';
import { Group, Button, Input } from '@skbkontur/react-ui';

import { Meta, Story } from '../../../typings/stories';

export default {
  title: 'Layout/Group',
  component: Group,
  parameters: { creevey: { skip: true } },
} as Meta;

export const Example1: Story = () => {
  const [value, setValue] = React.useState('Foo');

  return (
    <Group width={300}>
      <Button>
        <MathFunctionIcon />
      </Button>
      <Input value={value} width="100%" onValueChange={setValue} />
      <Button>
        <SearchLoupeIcon />
      </Button>
      <Button>Bar</Button>
    </Group>
  );
};
Example1.storyName = 'Базовый пример';

import React from 'react';
import FunctionIcon from '@skbkontur/react-icons/Function';
import SearchIcon from '@skbkontur/react-icons/Search';
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
        <FunctionIcon />
      </Button>
      <Input value={value} width="100%" onValueChange={setValue} />
      <Button>
        <SearchIcon />
      </Button>
      <Button>Bar</Button>
    </Group>
  );
};
Example1.storyName = 'Базовый пример';

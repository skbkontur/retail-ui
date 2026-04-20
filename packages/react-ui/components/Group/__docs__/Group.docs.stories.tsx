import { MathFunctionIcon } from '@skbkontur/icons/MathFunctionIcon.js';
import { SearchLoupeIcon } from '@skbkontur/icons/SearchLoupeIcon.js';
import { Button, DateRangePicker, Group, Hint, Input, Tooltip } from '@skbkontur/react-ui';
import React from 'react';

import type { Meta, Story } from '../../../typings/stories.js';

const meta: Meta = {
  title: 'Layout/Group',
  component: Group,
  parameters: { creevey: { skip: true } },
};

export default meta;

export const BasicExample: Story = () => {
  const [value, setValue] = React.useState('Foo');

  return (
    <Group width={350}>
      <Button>
        <MathFunctionIcon />
      </Button>
      <Input value={value} width="100%" onValueChange={setValue} />
      <Button>
        <SearchLoupeIcon />
      </Button>
      <Button>Foo</Button>
    </Group>
  );
};
BasicExample.storyName = 'Базовый пример';

/**
 * Пример с группой полей без разделителя в `DateRangePicker`.
 */
export const UsageInDateRangePicker: Story = () => {
  const [valueStart, setValueStart] = React.useState('');
  const [valueEnd, setValueEnd] = React.useState('');

  return (
    <DateRangePicker>
      <Group>
        <DateRangePicker.Start value={valueStart} onValueChange={setValueStart} />
        <DateRangePicker.End value={valueEnd} onValueChange={setValueEnd} />
      </Group>
    </DateRangePicker>
  );
};
UsageInDateRangePicker.storyName = 'Внутри контрола DateRangePicker';

export const WithHint: Story = () => {
  const [value, setValue] = React.useState('Foo');

  return (
    <Group width={350}>
      <Button>
        <MathFunctionIcon />
      </Button>
      <Input value={value} width="100%" onValueChange={setValue} />
      <Tooltip render={() => 'Hi!'} trigger="opened" pos="bottom">
        <Button>
          <SearchLoupeIcon />
        </Button>
      </Tooltip>
      <Hint text="Hello!">
        <Button>Hover me</Button>
      </Hint>
    </Group>
  );
};
WithHint.storyName = 'С хинтом или тултипом';

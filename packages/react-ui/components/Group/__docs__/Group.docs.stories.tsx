import { IconMathFunctionRegular16 } from '@skbkontur/icons/IconMathFunctionRegular16';
import { IconSearchLoupeRegular16 } from '@skbkontur/icons/IconSearchLoupeRegular16';
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
        <IconMathFunctionRegular16 />
      </Button>
      <Input value={value} width="100%" onValueChange={setValue} />
      <Button>
        <IconSearchLoupeRegular16 />
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
        <IconMathFunctionRegular16 />
      </Button>
      <Input value={value} width="100%" onValueChange={setValue} />
      <Tooltip render={() => 'Hi!'} trigger="opened" pos="bottom">
        <Button>
          <IconSearchLoupeRegular16 />
        </Button>
      </Tooltip>
      <Hint text="Hello!">
        <Button>Hover me</Button>
      </Hint>
    </Group>
  );
};
WithHint.storyName = 'С хинтом или тултипом';

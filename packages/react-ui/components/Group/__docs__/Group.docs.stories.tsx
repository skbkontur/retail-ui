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

export const ExampleBasic: Story = () => {
  const [value, setValue] = React.useState('');

  return (
    <Group>
      <Button>
        <IconMathFunctionRegular16 />
      </Button>
      <Input value={value} width="100%" onValueChange={setValue} />
      <Button>
        <IconSearchLoupeRegular16 />
      </Button>
      <Button>Кнопка</Button>
    </Group>
  );
};
ExampleBasic.storyName = 'Базовый пример';

/**
 * Проп `width` задаёт ширину контейнера.
 */
export const ExampleWidth: Story = () => {
  const [value, setValue] = React.useState('');

  return (
    <Group width={350}>
      <Button>
        <IconMathFunctionRegular16 />
      </Button>
      <Input value={value} width="100%" onValueChange={setValue} />
      <Button>
        <IconSearchLoupeRegular16 />
      </Button>
      <Button>Кнопка</Button>
    </Group>
  );
};
ExampleWidth.storyName = 'Ширина';

/**
 * Пример с группой полей без разделителя в `DateRangePicker`.
 */
export const ExampleUsageInDateRangePicker: Story = () => {
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
ExampleUsageInDateRangePicker.storyName = 'Внутри контрола DateRangePicker';

export const ExampleWithHint: Story = () => {
  const [value, setValue] = React.useState('');

  return (
    <Group width={350}>
      <Button>
        <IconMathFunctionRegular16 />
      </Button>
      <Input value={value} width="100%" onValueChange={setValue} />
      <Tooltip render={() => 'Подсказка в тултипе'} trigger="opened" pos="bottom">
        <Button>
          <IconSearchLoupeRegular16 />
        </Button>
      </Tooltip>
      <Hint text="Подсказка">
        <Button>Наведи на меня</Button>
      </Hint>
    </Group>
  );
};
ExampleWithHint.storyName = 'С хинтом или тултипом';

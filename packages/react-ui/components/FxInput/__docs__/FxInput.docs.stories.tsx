import React from 'react';
import { FxInput, Group, Button } from '@skbkontur/react-ui';

import type { Meta, Story } from '../../../typings/stories';

export default {
  title: 'Input data/FxInput',
  component: FxInput,
  parameters: { creevey: { skip: true } },
} as Meta;

export const Example1: Story = () => {
  const [auto, setAuto] = React.useState(false);
  const [value, setValue] = React.useState();

  function handleValueChange(value) {
    setAuto(false);
    setValue(value);
  }

  function handleRestore() {
    setAuto(true);
    setValue('auto');
  }

  return <FxInput auto={auto} value={value} onValueChange={handleValueChange} onRestore={handleRestore} />;
};
Example1.storyName = 'Базовый пример';

/** Очистить значение в `FxInput`'е можно с помощью пустой строки или `undefined` */
export const Example2: Story = () => {
  const [value, setValue] = React.useState(12345);

  return (
    <Group>
      <FxInput value={value} onValueChange={setValue} />
      <Button onClick={() => setValue(undefined)}>Undefined</Button>
      <Button onClick={() => setValue('')}>Пустая строка</Button>
    </Group>
  );
};
Example2.storyName = 'Очистка значения';

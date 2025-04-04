import React from 'react';
import { CurrencyInput, Button, Group } from '@skbkontur/react-ui';

import { Story } from '../../../typings/stories';

export default {
  title: 'Input data/CurrencyInput',
  component: CurrencyInput,
  parameters: { creevey: { skip: true } },
};

export const Example1: Story = () => {
  const [value, setValue] = React.useState();

  return <CurrencyInput value={value} fractionDigits={3} onValueChange={setValue} />;
};
Example1.storyName = 'Базовый пример';

/** Очистить значение в `CurrencyInput` можно с помощью `null` или `undefined` */
export const Example2: Story = () => {
  const [value, setValue] = React.useState();

  return (
    <Group>
      <CurrencyInput value={value} onValueChange={setValue} />
      <Button onClick={() => setValue(null)}>Null</Button>
      <Button onClick={() => setValue(undefined)}>Undefined</Button>
    </Group>
  );
};
Example2.storyName = 'Очистка значения';

export const Example3: Story = () => {
  const [value, setValue] = React.useState();

  return <CurrencyInput value={value} fractionDigits={15} onValueChange={setValue} />;
};
Example3.storyName = 'fractionDigits={15}';

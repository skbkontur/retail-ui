import React from 'react';
import { Meta, Story } from '../../../typings/stories';

import { Autocomplete, Button, Group, Gapped } from '@skbkontur/react-ui';

export default {
  title: 'Input data/Autocomplete',
  component: Autocomplete,
  parameters: { creevey: { skip: true } },
} as Meta;

export const Example1: Story = () => {
  const items = ['Grey Face', 'Grey Space', 'Kappa', 'Keepo', 'Resident Sleeper'];

  const [value, setValue] = React.useState('Kappa');

  return (
    <Autocomplete source={items} value={value} onValueChange={setValue} />
  );

};
Example1.storyName = 'Базовый пример';

/** Очистить значение в `Autocomplete` можно только с помощью пустой строки */
export const Example2: Story = () => {

  const items = ['Grey Face', 'Grey Space', 'Kappa', 'Keepo', 'Resident Sleeper'];

  const [value, setValue] = React.useState('Kappa');

  return (
    <Group>
      <Autocomplete source={items} value={value} onValueChange={setValue} />
      <Button onClick={() => setValue('')}>Очистить</Button>
    </Group>
  );

};
Example2.storyName = 'Очистка Autocomplete';

export const Example3: Story = () => {

  const items = ['Маленький', 'Средний', 'Большой'];

  const [valueSmall, setValueSmall] = React.useState('Маленький');
  const [valueMedium, setValueMedium] = React.useState('Средний');
  const [valueLarge, setValueLarge] = React.useState('Большой');

  return (
    <Gapped vertical>
      <Autocomplete source={items} value={valueSmall} onValueChange={setValueSmall} size={'small'} />
      <Autocomplete source={items} value={valueMedium} onValueChange={setValueMedium} size={'medium'} />
      <Autocomplete source={items} value={valueLarge} onValueChange={setValueLarge} size={'large'} />
    </Gapped>
  );

};
Example3.storyName = 'Размер';


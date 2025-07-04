import React from 'react';
import { Textarea, Group, Button, Gapped } from '@skbkontur/react-ui';

import type { Story } from '../../../typings/stories';

export default {
  title: 'Input data/Textarea',
  component: Textarea,
  parameters: { creevey: { skip: true } },
};

export const Example1: Story = () => {
  const [value, setValue] = React.useState('');

  return (
    <Textarea
      value={value}
      onValueChange={setValue}
      autoResize
      placeholder="Through faith we can reign in every area of life"
    />
  );
};
Example1.storyName = 'Базовый пример';

/** Очистить значение в `Textarea` можно только с помощью пустой строки */
export const Example2: Story = () => {
  const [value, setValue] = React.useState('Значение');

  return (
    <Group>
      <Textarea value={value} onValueChange={setValue} autoResize rows={1} placeholder="Плейсхолдер" />
      <Button style={{ height: '52px' }} onClick={() => setValue('')}>
        Очистить значение
      </Button>
    </Group>
  );
};
Example2.storyName = 'Очистка значения';

export const Example3: Story = () => {
  const [value, setValue] = React.useState('');

  return (
    <Textarea
      value={value}
      onValueChange={setValue}
      placeholder="Счетчик появляется при фокусе"
      autoResize
      lengthCounter={10}
      showLengthCounter
      counterHelp="Hello 👋"
    />
  );
};
Example3.storyName = 'Счетчик введенных символов';

export const Example4: Story = () => {
  const [valueSmall, setValueSmall] = React.useState('');
  const [valueMedium, setValueMedium] = React.useState('');
  const [valueLarge, setValueLarge] = React.useState('');
  return (
    <Gapped vertical>
      <Textarea
        size={'small'}
        value={valueSmall}
        onValueChange={setValueSmall}
        autoResize
        rows={1}
        placeholder="Маленький"
      />
      <Textarea
        size={'medium'}
        value={valueMedium}
        onValueChange={setValueMedium}
        autoResize
        rows={1}
        placeholder="Средний"
      />
      <Textarea
        size={'large'}
        value={valueLarge}
        onValueChange={setValueLarge}
        autoResize
        rows={1}
        placeholder="Большой"
      />
    </Gapped>
  );
};
Example4.storyName = 'Размер';

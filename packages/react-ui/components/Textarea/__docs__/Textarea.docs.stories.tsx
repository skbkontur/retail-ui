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
      lengthCounter={10}
      showLengthCounter
      counterHelp="Hello 👋"
    />
  );
};
Example3.storyName = 'Счетчик введенных символов';

export const Example4: Story = () => {
  return (
    <Gapped vertical>
      <Textarea size={'small'} value={'Маленький'} autoResize rows={1} />
      <Textarea size={'medium'} value={'Средний'} autoResize rows={1} />
      <Textarea size={'large'} value={'Большой'} autoResize rows={1} />
    </Gapped>
  );
};
Example4.storyName = 'Размер';

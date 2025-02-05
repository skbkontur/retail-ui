import React from 'react';
import { SearchLoupeIcon } from '@skbkontur/icons/icons/SearchLoupeIcon';
import { Input, Button, Group, Gapped } from '@skbkontur/react-ui';

import { Meta, Story } from '../../../typings/stories';

export default {
  title: 'Input data/Input',
  component: Input,
  parameters: { creevey: { skip: true } },
} as Meta;

export const Example1: Story = () => {
  return <Input />;
};
Example1.storyName = 'Базовый пример';

export const Example2: Story = () => {
  return <Input leftIcon={<SearchLoupeIcon />} />;
};
Example2.storyName = 'Иконка';

/** Очистить значение в `Input`'е можно только с помощью пустой строки */
export const Example3: Story = () => {
  const [value, setValue] = React.useState('Значение');

  return (
    <Group>
      <Input value={value} onValueChange={setValue} />
      <Button onClick={() => setValue('')}>Очистить</Button>
    </Group>
  );
};
Example3.storyName = 'Очистка значения';

export const Example4: Story = () => {
  return <Input width={400} prefix="https://kontur.ru/search?query=" rightIcon={<SearchIcon />} />;
};
Example4.storyName = 'Префикс';

export const Example5: Story = () => {
  return (
    <Gapped vertical gap={20}>
      <Gapped gap={20}>
        <Input type="password" />
        <span>type = "password"</span>
      </Gapped>

      <Gapped gap={20}>
        <Input type="number" />
        <span>type = "number"</span>
      </Gapped>

      <Gapped gap={20}>
        <Input type="tel" />
        <span>type = "tel"</span>
      </Gapped>

      <Gapped gap={20}>
        <Input type="search" />
        <span>type = "search"</span>
      </Gapped>

      <Gapped gap={20}>
        <Input type="time" />
        <span>type = "time"</span>
      </Gapped>

      <Gapped gap={20}>
        <Input type="date" />
        <span>type = "date"</span>
      </Gapped>

      <Gapped gap={20}>
        <Input type="url" />
        <span>type = "url"</span>
      </Gapped>

      <Gapped gap={20}>
        <Input type="email" />
        <span>type = "email"</span>
      </Gapped>
    </Gapped>
  );
};
Example5.storyName = 'type';

/** Крестик отображается только при фокусировке на поле, в котором что-либо введено */
export const Example6: Story = () => {
  const [value, setValue] = React.useState('Управляемый контрол');
  return <Input showCleanCross value={value} onValueChange={setValue} data-tid="controlled-input" />;
};
Example6.storyName = 'Крестик для очистки';

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
  return <Input width={400} prefix="https://kontur.ru/search?query=" rightIcon={<SearchLoupeIcon />} />;
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

/** При значении "auto" крестик отображается при наведении или при фокусировке на непустом поле.<br/>
 * При значении "always" крестик отображается всегда, если поле непустое.<br/>
 * При значении "never" крестик никогда не отображается.<br/>
 * При одновременной передаче showClearIcon и rightIcon, крестик имеет больший приоритет. */
export const Example6: Story = () => {
  const [valueAlways, setValueAlways] = React.useState('Отображаю крестик всегда');
  const [valueAuto, setValueAuto] = React.useState('Отображаю крестик по ховеру или фокусу');
  const [valueNever, setValueNever] = React.useState('Никогда не отображаю крестик');
  return (
    <Gapped gap={10} vertical>
      <Input showClearIcon="always" value={valueAlways} onValueChange={setValueAlways} width="350px" />
      <Input showClearIcon="auto" value={valueAuto} onValueChange={setValueAuto} width="350px" />
      <Input showClearIcon="never" value={valueNever} onValueChange={setValueNever} width="350px" />
    </Gapped>
  );
};
Example6.storyName = 'Крестик для очистки';

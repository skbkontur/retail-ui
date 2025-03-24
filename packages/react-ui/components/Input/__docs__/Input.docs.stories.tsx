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

/**
 * - `always` — всегда показывать иконку очистки значения в заполненном поле
 * - `auto` — показывать иконку в заполненном поле при hover/focus
 * - `never` — не показывать (по умолчанию)
 *
 * При одновременной настройке `showClearIcon` и `rightIcon` показывается иконка очистки.
 */
export const Example6: Story = () => {
  const [valueAlways, setValueAlways] = React.useState('showClearIcon="always"');
  const [valueAuto, setValueAuto] = React.useState('showClearIcon="auto"');
  const [valueNever, setValueNever] = React.useState('showClearIcon="never"');
  const [valueWithIcon, setValueWithIcon] = React.useState('showClearIcon="auto" + rightIcon');
  return (
    <Gapped gap={10} vertical>
      <Input showClearIcon="always" value={valueAlways} onValueChange={setValueAlways} width="350px" />
      <Input showClearIcon="auto" value={valueAuto} onValueChange={setValueAuto} width="350px" />
      <Input showClearIcon="never" value={valueNever} onValueChange={setValueNever} width="350px" />
      <br />
      <Input
        showClearIcon="auto"
        value={valueWithIcon}
        onValueChange={setValueWithIcon}
        width="350px"
        rightIcon={<SearchLoupeIcon />}
      />
    </Gapped>
  );
};
Example6.storyName = 'Иконка очистки поля';

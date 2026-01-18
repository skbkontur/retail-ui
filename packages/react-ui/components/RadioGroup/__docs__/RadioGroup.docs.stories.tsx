import React from 'react';
import { RadioGroup, Gapped, Radio } from '@skbkontur/react-ui';

import type { Meta, Story } from '../../../typings/stories';

export default {
  title: 'Input data/RadioGroup',
  component: RadioGroup,
  parameters: { creevey: { skip: true } },
} as Meta;

export const ExampleBasic: Story = () => {
  const [chosen, setChosen] = React.useState(null);

  return (
    <RadioGroup value={chosen} onValueChange={setChosen}>
      <Gapped gap={3} vertical>
        <Radio value={1}>Первый вариант</Radio>
        <Radio value={2}>Второй вариант</Radio>
        <Radio value={3}>Третий вариант</Radio>
        <Radio value={4}>Четвёртый вариант</Radio>
      </Gapped>
    </RadioGroup>
  );
};

/** Проп `width` задаёт максимальную ширину элементов группы. Работает только со значениями, переданными через `items`, не работает с `children`. */
export const ExampleWidth: Story = () => {
  const items = [
    'Уведомлять обо всех изменениях',
    'Уведомлять только о самых важных изменения',
    'Никогда не уведомлять',
    'Настроить свой вариант',
  ];

  return <RadioGroup items={items} width={'150px'} />;
};
ExampleWidth.storyName = 'Ширина';

/** У группы радиокнопок есть несколько пропсов состояний:
 * - `disabled` — блокировка.
 * - `error` — ошибка.
 * - `warning` — предупреждение. */
export const ExampleMode: Story = () => {
  const itemsDisabled = ['Первый вариант', 'Второй вариант', 'Третий вариант', 'Четвёртый вариант'];
  const itemsError = ['Первый вариант', 'Второй вариант', 'Третий вариант', 'Четвёртый вариант'];
  const itemsWarning = ['Первый вариант', 'Второй вариант', 'Третий вариант', 'Четвёртый вариант'];

  const disabledRadioGroup = (
    <Gapped vertical>
      <b>Заблокированная группа</b>
      <RadioGroup items={itemsDisabled} disabled />
    </Gapped>
  );

  const errorRadioGroup = (
    <Gapped vertical>
      <b>В состоянии «Ошибка»</b>
      <RadioGroup items={itemsError} error />
    </Gapped>
  );

  const warningRadioGroup = (
    <Gapped vertical>
      <b>В состоянии «Предупреждение»</b>
      <RadioGroup items={itemsWarning} warning />
    </Gapped>
  );

  return (
    <Gapped vertical>
      {disabledRadioGroup}
      {errorRadioGroup}
      {warningRadioGroup}
    </Gapped>
  );
};
ExampleMode.storyName = 'Состояния';

/** Проп `defaultValue` задаёт значение по умолчанию. Должно быть одним из значений дочерних радиокнопок или значений из `items`. */
export const ExampleDefault: Story = () => {
  const items = ['Первый вариант', 'Второй вариант', 'Третий вариант', 'Четвёртый вариант'];

  return <RadioGroup items={items} defaultValue="Второй вариант" />;
};
ExampleDefault.storyName = 'Значение по умолчанию';

/** Проп `inline` размещает радиокнопки в строку. Работает только со значениями, переданными через `items`, не работает с `children`. */
export const ExampleInline: Story = () => {
  const items = ['Первый вариант', 'Второй вариант', 'Третий вариант', 'Четвёртый вариант'];

  return <RadioGroup items={items} inline />;
};
ExampleInline.storyName = 'Расположение в строку';

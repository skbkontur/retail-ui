import React from 'react';
import { FxInput, Group, Button, Gapped } from '@skbkontur/react-ui';

import type { Meta, Story } from '../../../typings/stories';

export default {
  title: 'Input data/FxInput',
  component: FxInput,
  parameters: { creevey: { skip: true } },
} as Meta;

export const ExampleBasic: Story = () => {
  const FxValue = 100500;
  const [auto, setAuto] = React.useState<boolean>(true);
  const [value, setValue] = React.useState<number>(FxValue);

  function handleValueChange(value: number) {
    setAuto(false);
    setValue(value);
  }

  function handleRestore(value: number) {
    setAuto(true);
    setValue(FxValue);
  }

  return <FxInput auto={auto} value={value} onValueChange={handleValueChange} onRestore={handleRestore} />;
};
ExampleBasic.storyName = 'Базовый пример';

/** У компонента нет заложенной по умолчанию логики по нажатию на кнопку Restore, задайте её самостоятельно.
 *
 * На видимость кнопки Restore влияет проп `auto`. Если передано:
 * - `true` — кнопка Restore не отображается. Значение в поле считается автоматически рассчитанным.
 * - `false` — кнопка Restore отображается в поле. Значение в поле считается отредактированным. Вернуть автоматически рассчитанное значение можно в обработчике `onRestore` после нажатия на кнопку. Чтобы кнопка Restore пропала после нажатия, верните проп `auto` в значение `true`.
 */
export const ExampleRestore: Story = () => {
  const [auto, setAuto] = React.useState<boolean>(true);
  const [value, setValue] = React.useState<number | string>('');

  function handleValueChange(value: number | string) {
    setAuto(false);
    setValue(value);
  }

  function handleRestore() {
    setAuto(true);
    setValue('');
  }

  return <FxInput auto={auto} value={value} onValueChange={handleValueChange} onRestore={handleRestore} />;
};
ExampleRestore.storyName = 'Кнопка Restore';

/** Очистить значение в автополе можно с помощью пустой строки или `undefined`. */
export const ExampleClear: Story = () => {
  const [value, setValue] = React.useState<undefined | number | string>(12345);
  return (
    <Gapped>
      <FxInput value={value} onValueChange={setValue} auto />
      <Button onClick={() => setValue(undefined)}>Передать undefined</Button>
      <Button onClick={() => setValue('')}>Передать пустое значение</Button>
    </Gapped>
  );
};
ExampleClear.storyName = 'Очистка значения';

/** Знак валюты, процент или другие единицы измерения можно прокидывать как внутрь поля с помощью пропа `rightIcon`, так и вне поля с помощью обычного `label`. */
export const ExampleCurrency: Story = () => {
  const [value, setValue] = React.useState('100500');

  return (
    <Gapped vertical gap={20}>
      <FxInput value={value} onValueChange={setValue} auto rightIcon="₽" />
      <Gapped>
        <FxInput value={value} onValueChange={setValue} auto />
        <label htmlFor="input-id">₽</label>
      </Gapped>
    </Gapped>
  );
};
ExampleCurrency.storyName = 'Единица измерения';

/** Маска задаётся пропом `mask`. */
export const ExampleMask: Story = () => {
  const [auto, setAuto] = React.useState<boolean>(true);
  const [value, setValue] = React.useState<number>('');

  function handleValueChange(value: number) {
    setAuto(false);
    setValue(value);
  }

  function handleRestore(value: number) {
    setAuto(true);
    setValue('');
  }

  return (
    <FxInput
      auto={auto}
      value={value}
      mask="999"
      alwaysShowMask
      onValueChange={handleValueChange}
      onRestore={handleRestore}
    />
  );
};
ExampleMask.storyName = 'Маска';

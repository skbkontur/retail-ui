import React from 'react';
import { CurrencyInput, Button } from '@skbkontur/react-ui';

import type { Story } from '../../../typings/stories';

export default {
  title: 'Input data/CurrencyInput',
  component: CurrencyInput,
  parameters: { creevey: { skip: true } },
};

export const ExampleBasic: Story = () => {
  const [value, setValue] = React.useState();

  return <CurrencyInput value={value} onValueChange={setValue} />;
};
ExampleBasic.storyName = 'Базовый пример';

/** Размер поля задаётся пропом `size`. По умолчанию `"small"`. */
export const ExampleSize: Story = () => {
  const [value, setValue] = React.useState();
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'end',
        gap: '10px',
      }}
    >
      <CurrencyInput size="small" value={value} onValueChange={setValue} />
      <CurrencyInput size="medium" value={value} onValueChange={setValue} />
      <CurrencyInput size="large" value={value} onValueChange={setValue} />
    </div>
  );
};
ExampleSize.storyName = 'Размер';

/** Выравнивание текста задаётся пропом `align`. По умолчанию `"right"`. Меняйте правое выравнивание на левое, если значения других полей в колонке выровнены по левому краю.*/
export const ExampleAlign: Story = () => {
  const [valueLeft, setValueLeft] = React.useState('10');
  const [valueRight, setValueRight] = React.useState('10');
  return (
    <Gapped gap={10} vertical>
      <CurrencyInput width={150} value={valueRight} onValueChange={setValueRight} />
      <CurrencyInput width={150} align="left" value={valueLeft} onValueChange={setValueLeft} />
    </Gapped>
  );
};
ExampleAlign.storyName = 'Выравнивание текста';

/** Количество знаков после запятой задаётся пропом `fractionDigits`. По умолчанию `{2}`.
 *
 * Если задать максимальное значение `fractionDigits={15}`, то в целой части допускается **0**.
 * Чтобы поле могло принимать только целое число, установите `fractionDigits={0}`. */
export const ExampleFractionDigits: Story = () => {
  const [value, setValue] = React.useState();

  return <CurrencyInput value={value} fractionDigits={3} onValueChange={setValue} />;
};
ExampleFractionDigits.storyName = 'Количество знаков после запятой';

/** Количество знаков до запятой задаётся пропом `integerDigits`. По умолчанию `{2}`. Если задать значение `integerDigits=0`, то в целой части допускается только **0**. */
export const ExampleIntegerDigits: Story = () => {
  const [value, setValue] = React.useState();

  return <CurrencyInput value={value} integerDigits={2} onValueChange={setValue} />;
};
ExampleIntegerDigits.storyName = 'Количество знаков до запятой';

/** Лишние нули после запятой можно убирать, добавив проп `hideTrailingZeros`. Будет убирать лишние нули после запятой при потере фокуса с поля. */
export const ExampleHideTrailingZeros: Story = () => {
  const [value, setValue] = React.useState();

  return <CurrencyInput value={value} fractionDigits={8} onValueChange={setValue} hideTrailingZeros />;
};
ExampleHideTrailingZeros.storyName = 'Лишние нули после запятой';

/** Разрешить ввод отрицательного значения можно через проп `signed`. В поле можно ввести символ минуса (−). При вводе дефис (-), короткое тире (–) или тире (—) автоматически заменятся на верный символ минуса.  */
export const ExampleSigned: Story = () => {
  const [value, setValue] = React.useState();

  return <CurrencyInput value={value} onValueChange={setValue} signed />;
};
ExampleSigned.storyName = 'Отрицательное значение';

/** Очистить значение в `CurrencyInput` можно с помощью `null` или `undefined` */
export const ExampleClear: Story = () => {
  const [value, setValue] = React.useState();

  return (
    <Gapped>
      <CurrencyInput value={value} onValueChange={setValue} />
      <Button onClick={() => setValue(null)}>Передать null</Button>
      <Button onClick={() => setValue(undefined)}>Передать undefined</Button>
    </Gapped>
  );
};
ExampleClear.storyName = 'Очистка поля';

/** Знак валюты можно прокидывать как внутрь поля с помощью пропа `rightIcon`, так и вне поля с помощью элемента `label`. */
export const ExampleCurrency: Story = () => {
  const [value, setValue] = React.useState();

  return (
    <Gapped vertical gap={20}>
      <CurrencyInput value={value} onValueChange={setValue} rightIcon="₽" />
      <Gapped>
        <CurrencyInput value={value} onValueChange={setValue} />
        <label htmlFor="input-id">₽</label>
      </Gapped>
    </Gapped>
  );
};
ExampleCurrency.storyName = 'Знак валюты';

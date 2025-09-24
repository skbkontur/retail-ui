import React from 'react';
import { Gapped, MaskedInput } from '@skbkontur/react-ui';

import type { Meta, Story } from '../../../typings/stories';

export default {
  title: 'Input data/MaskedInput',
  component: MaskedInput,
  parameters: { creevey: { skip: true } },
} as Meta;

/** Паттерн ввода. Пример с номером телефона. */
export const Example1: Story = () => {
  const [value, setValue] = React.useState('');

  return (
    <>
      <span>value: "{value}"</span>
      <br />
      <br />
      <MaskedInput
        mask="+7 (999) 999-99-99"
        placeholder="Номер телефона"
        type="tel"
        value={value}
        onValueChange={setValue}
      />
    </>
  );
};
Example1.storyName = 'Проп `mask`';

/** Показывает маску всегда. */
export const Example2: Story = () => {
  return <MaskedInput mask="+7 (999) 999-99-99" alwaysShowMask />;
};
Example2.storyName = 'Проп `alwaysShowMask`';

/** Символом маски может быть любой символ. */
export const Example3: Story = () => {
  const [value, setValue] = React.useState('');

  return (
    <>
      <span>value: "{value}"</span>
      <br />
      <br />
      <MaskedInput
        mask="9999 9999 9999 9999"
        maskChar="X"
        placeholder="Номер карты"
        alwaysShowMask
        value={value}
        inputMode="numeric"
        onValueChange={setValue}
      />
    </>
  );
};
Example3.storyName = 'Проп `maskChar`';

/** При необходимости можно настроить собственный словарь. */
export const Example4: Story = () => {
  const [value, setValue] = React.useState('');

  return (
    <MaskedInput
      mask="Hh:Mm:Ss"
      alwaysShowMask
      formatChars={{
        H: '[0-2]',
        h: value.startsWith('2') ? '[0-3]' : '[0-9]',
        M: '[0-5]',
        m: '[0-9]',
        S: '[0-5]',
        s: '[0-9]',
      }}
      value={value}
      onValueChange={setValue}
    />
  );
};
Example4.storyName = 'Проп `formatChars`';

/** Можно сразу получать очищенный value, содержащий только введённый пользователем символы. */
export const Example5: Story = () => {
  const [value, setValue] = React.useState('');

  return (
    <>
      <span>value: "{value}"</span>
      <br />
      <br />
      <MaskedInput mask="+7 (999) 999-99-99" unmask alwaysShowMask type="tel" value={value} onValueChange={setValue} />
    </>
  );
};
Example5.storyName = 'Проп `unmask`';

/** Если обернуть фиксированные символы в фигурные скобки, то они попадут в `value` при `unmask = true`. */
export const Example6: Story = () => {
  const [value, setValue] = React.useState('');

  return (
    <>
      <span>value: "{value}"</span>
      <br />
      <br />
      <MaskedInput
        mask="+{7} (999) 999-99-99"
        unmask
        alwaysShowMask
        type="tel"
        value={value}
        onValueChange={setValue}
      />
    </>
  );
};
Example6.storyName = 'Проп `unmask` с фигурными скобками';

/** Пример маски с буквами и цифрами */
export const Example7: Story = () => {
  const [valueLetter, setValueLetter] = React.useState('');
  const [valueNumber, setValueNumber] = React.useState('');
  const [valueAny, setValueAny] = React.useState('');

  return (
    <Gapped vertical>
      <MaskedInput
        mask="aaaa aaaa aaaa aaaa"
        placeholder="Только буквы"
        value={valueLetter}
        onValueChange={setValueLetter}
      />
      <MaskedInput
        mask="9999 9999 9999 9999"
        placeholder="Только цифры"
        inputMode="numeric"
        value={valueNumber}
        onValueChange={setValueNumber}
      />
      <MaskedInput
        mask="**** **** **** ****"
        placeholder="Буквы и цифры"
        value={valueAny}
        onValueChange={setValueAny}
      />
    </Gapped>
  );
};
Example7.storyName = 'Пример с буквами и цифрами';

export const Example8: Story = () => {
  const [value, setValue] = React.useState('');

  return (
    <>
      <span>value: "+7 (999) 999-99-99"</span>
      <br />
      <br />
      <MaskedInput
        mask="+7 (999) 999-99-99"
        unmask
        alwaysShowMask
        type="tel"
        value={value}
        onBeforePasteValue={(value) => value.replace(/\D/g, '').slice(1)}
        onValueChange={setValue}
      />
    </>
  );
};
Example8.storyName = 'Проп `onBeforePasteValue` для фильтрации значения при вставке из буфера обмена';

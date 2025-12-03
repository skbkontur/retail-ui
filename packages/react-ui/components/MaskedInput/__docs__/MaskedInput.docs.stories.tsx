import React from 'react';
import { Gapped, MaskedInput } from '@skbkontur/react-ui';

import type { Meta, Story } from '../../../typings/stories';

export default {
  title: 'Input data/MaskedInput',
  component: MaskedInput,
  parameters: { creevey: { skip: true } },
} as Meta;

export const ExampleBasic: Story = () => {
  const [value, setValue] = React.useState('');

  return (
    <Gapped vertical>
      <label htmlFor="input-id">Номер телефона</label>
      <MaskedInput mask="+7 (999) 999-99-99" type="tel" value={value} onValueChange={setValue} />
    </Gapped>
  );
};

/** Проп `mask` определяет шаблон маски, используемый для форматирования и проверки корректности вводимых данных в поле. */
export const ExampleMask: Story = () => {
  const [valueLetter, setValueLetter] = React.useState('');
  const [valueNumber, setValueNumber] = React.useState('');
  const [valueAny, setValueAny] = React.useState('');

  return (
    <Gapped vertical>
      <MaskedInput
        mask="aaaa aaaa aaaa aaaa"
        placeholder="Только буквы (латиница)"
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
ExampleMask.storyName = 'Маска';

/** Проп `maskChar` задаёт символ маски. Он отображается в шаблоне маски в качестве плейсхолдера. Символом маски может быть любой символ. */
export const ExampleMaskChar: Story = () => {
  const [value, setValue] = React.useState('');

  return (
    <MaskedInput
      mask="9999 9999 9999 9999"
      maskChar="×"
      alwaysShowMask
      value={value}
      inputMode="numeric"
      onValueChange={setValue}
    />
  );
};
ExampleMaskChar.storyName = 'Символ маски';

/** Проп `formatChars` задаёт словарь символов-регулярок. Вы можете настроить собственный словарь символов.
 * Каждая запись описывает один токен маски: допустимые символы или регулярное выражение. */
export const ExampleFormatChars: Story = () => {
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
ExampleFormatChars.storyName = 'Словарь символов-регулярок';

/** Проп `type` задаёт тип.
 *
 * Это стандартные типы поля ввода в HTML. Тип наделяет компонент нативными свойствами, может влиять на отображение подсказок, валидацию, автоматическое переключение раскладки клавиатуры на мобильных устройствах и другие свойства поведения. Подробнее смотрите в [Справке по HTML](https://developer.mozilla.org/ru/docs/Web/HTML/Reference/Elements/input#type).
 *
 * Полный список значений для типа смотрите в таблице пропсов. */
export const ExampleType: Story = () => {
  const [valueTel, setValueTel] = React.useState('');
  const [valueLetter, setValueLetter] = React.useState('');

  return (
    <Gapped vertical gap={20}>
      <Gapped gap={20}>
        <MaskedInput
          mask="aaaa"
          type="text"
          placeholder="Буквенный код (латиница)"
          value={valueLetter}
          onValueChange={setValueLetter}
        />
        <span>type = "text"</span>
      </Gapped>

      <Gapped gap={20}>
        <MaskedInput mask="+7 (999) 999-99-99" type="tel" value={valueTel} onValueChange={setValueTel} />
        <span>type = "tel"</span>
      </Gapped>
    </Gapped>
  );
};
ExampleType.storyName = 'Тип';

/** По умолчанию маска показывается только после того, как поле получает фокус. Это поведение рекомендуемое и закреплено в [Гайдах](https://guides.kontur.ru/components/input-fields/mask/#Opisanie_raboti).
 *
 * Но если вам необходимо переопределить стандартное поведение, используйте проп `alwaysShowMask`. Маска будет отображаться независимо от фокуса в поле.
 */
export const ExampleAlwaysShowMask: Story = () => {
  return <MaskedInput mask="+7 (999) 999-99-99" alwaysShowMask />;
};
ExampleAlwaysShowMask.storyName = 'Показывать маску всегда';

/** Проп `unmask` позволяет сразу получать value, в котором будет только введённое пользователем значение, без символов маски. */
export const ExampleUnMask: Story = () => {
  const [value, setValue] = React.useState('');
  const [valueUnMask, setValueUnMask] = React.useState('');

  return (
    <Gapped vertical gap={20}>
      <Gapped gap={20}>
        <MaskedInput mask="+7 (999) 999-99-99" alwaysShowMask type="tel" value={value} onValueChange={setValue} />
        <span>value по умолчанию: "{value}"</span>
      </Gapped>

      <Gapped gap={20}>
        <MaskedInput
          mask="+7 (999) 999-99-99"
          unmask
          alwaysShowMask
          type="tel"
          value={valueUnMask}
          onValueChange={setValueUnMask}
        />
        <span>value c unmask: "{valueUnMask}"</span>
      </Gapped>
    </Gapped>
  );
};
ExampleUnMask.storyName = 'Чистое значение';

/** Проп `unmask` позволяет выбрать, какие символы из маски должны быть переданы в `value`. Для этого в маске оберните в фигурные скобки нужные символы. */
export const ExampleUnMaskPlus: Story = () => {
  const [value, setValue] = React.useState('');

  return (
    <Gapped gap={20}>
      <MaskedInput
        mask="+{7} (999) 999-99-99"
        unmask
        alwaysShowMask
        type="tel"
        value={value}
        onValueChange={setValue}
      />
      <span>value: "{value}"</span>
    </Gapped>
  );
};
ExampleUnMaskPlus.storyName = 'Чистое значение, но с выбранными символами';

/**Проп `onBeforePasteValue` вызывает обработчик при вставке значения. В него передаётся текст из буфера, а то, что он вернёт — попадёт в поле. Используйте для очистки или фильтрации вставки.
 *
 * В примере при вставке удалятся символы, не являющиеся цифрами, и первый символ полученной строки. */
export const ExampleonBeforePasteValue: Story = () => {
  const [value, setValue] = React.useState('');

  return (
    <MaskedInput
      mask="+7 (999) 999-99-99"
      unmask
      alwaysShowMask
      type="tel"
      value={value}
      onBeforePasteValue={(value) => value.replace(/\D/g, '').slice(1)}
      onValueChange={setValue}
    />
  );
};
ExampleonBeforePasteValue.storyName = 'Фильтрация значения при вставке из буфера обмена';

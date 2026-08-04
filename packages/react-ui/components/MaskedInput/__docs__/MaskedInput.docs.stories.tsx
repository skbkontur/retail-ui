import { Gapped, MaskedInput, MaskedInputMasks, normalizeRussianPhonePaste } from '@skbkontur/react-ui';
import React from 'react';

import type { Meta, Story } from '../../../typings/stories.js';

const meta: Meta = {
  title: 'Input data/MaskedInput',
  component: MaskedInput,
  parameters: { creevey: { skip: true } },
};

export default meta;

/**Номер телефона по [гайду](https://guides.kontur.ru/components/input-fields/phone/).
 *
 * Префикс `+7` всегда виден.
 * Остальные символы маски появляются только в фокусе.
 *
 * Для телефона задавайте `type="tel"` и `autoComplete="tel"` — так браузер подставит номер из сохранённых контактов.
 *
 * При `type="tel"` вставка российских номеров (`8…`, `+7…`, со скобками и пробелами)
 * нормализуется автоматически (`normalizeRussianPhonePaste`). */
export const ExamplePhone: Story = () => {
  const [value, setValue] = React.useState('');

  return (
    <Gapped vertical>
      <label htmlFor="masked-input-phone">Номер телефона</label>
      <MaskedInput
        id="masked-input-phone"
        mask={MaskedInputMasks.PhoneRU}
        placeholder="+7"
        type="tel"
        autoComplete="tel"
        value={value}
        onValueChange={setValue}
      />
    </Gapped>
  );
};
ExamplePhone.storyName = 'Номер телефона';

export const ExampleBasic: Story = () => {
  const [value, setValue] = React.useState('');

  return (
    <Gapped vertical>
      <label htmlFor="input-id">Маска</label>
      <MaskedInput id="input-id" mask="9999 9999 9999 9999" value={value} onValueChange={setValue} />
    </Gapped>
  );
};
ExampleBasic.storyName = 'Базовый пример';

/** Типичные форматы для форм
 *
 * Для ИНН длина значения может быть 10 или 12 цифр — по [гайдам](https://guides.kontur.ru/components/input-fields/mask/#Opisanie_raboti) маску в пустом поле не показывают, чтобы не путать пользователя. */
export const ExampleFormats: Story = () => {
  const [inn, setInn] = React.useState('');
  const [kpp, setKpp] = React.useState('');
  const [ogrn, setOgrn] = React.useState('');
  const [snils, setSnils] = React.useState('');
  const [passport, setPassport] = React.useState('');
  const [passportCode, setPassportCode] = React.useState('');

  return (
    <Gapped vertical gap={20}>
      <Gapped gap={20}>
        <Gapped vertical>
          <label htmlFor="masked-input-inn">ИНН</label>
          <MaskedInput
            id="masked-input-inn"
            mask="999999999999"
            placeholder="10 или 12 цифр"
            inputMode="numeric"
            width={150}
            value={inn}
            onValueChange={setInn}
          />
        </Gapped>
        <Gapped vertical>
          <label htmlFor="masked-input-kpp">КПП</label>
          <MaskedInput
            id="masked-input-kpp"
            mask="9999 99 999"
            inputMode="numeric"
            width={130}
            value={kpp}
            onValueChange={setKpp}
          />
        </Gapped>
        <Gapped vertical>
          <label htmlFor="masked-input-ogrn">ОГРН</label>
          <MaskedInput
            id="masked-input-ogrn"
            mask="9 99 99 9999999"
            inputMode="numeric"
            width={170}
            value={ogrn}
            onValueChange={setOgrn}
          />
        </Gapped>
      </Gapped>

      <Gapped gap={20}>
        <Gapped vertical>
          <label htmlFor="masked-input-snils">СНИЛС</label>
          <MaskedInput
            id="masked-input-snils"
            mask="999-999-999 99"
            inputMode="numeric"
            width={170}
            value={snils}
            onValueChange={setSnils}
          />
        </Gapped>
        <Gapped vertical>
          <label htmlFor="masked-input-passport">Паспорт РФ</label>
          <MaskedInput
            id="masked-input-passport"
            mask="99 99 999999"
            placeholder="Серия и номер"
            inputMode="numeric"
            width={150}
            value={passport}
            onValueChange={setPassport}
          />
        </Gapped>
        <Gapped vertical>
          <label htmlFor="masked-input-passport-code">Код подразделения</label>
          <MaskedInput
            id="masked-input-passport-code"
            mask="999-999"
            inputMode="numeric"
            width={90}
            value={passportCode}
            onValueChange={setPassportCode}
          />
        </Gapped>
      </Gapped>
    </Gapped>
  );
};
ExampleFormats.storyName = 'Типичные форматы';

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
 * Каждая запись описывает один токен маски: допустимые символы или регулярное выражение. Например для ввода кириллицы или времени. */
export const ExampleFormatChars: Story = () => {
  const [valueTime, setValueTime] = React.useState('');
  const [valueCyrillic, setValueCyrillic] = React.useState('');

  return (
    <Gapped vertical>
      <MaskedInput
        mask="cccc"
        placeholder="Только кириллица"
        formatChars={{ c: '[а-яА-ЯёЁ]' }}
        value={valueCyrillic}
        onValueChange={setValueCyrillic}
      />
      <MaskedInput
        mask="Hh:Mm:Ss"
        placeholder="ЧЧ:мм:сс"
        alwaysShowMask
        inputMode="numeric"
        formatChars={{
          H: '[0-2]',
          h: valueTime.startsWith('2') ? '[0-3]' : '[0-9]',
          M: '[0-5]',
          m: '[0-9]',
          S: '[0-5]',
          s: '[0-9]',
        }}
        value={valueTime}
        onValueChange={setValueTime}
      />
    </Gapped>
  );
};
ExampleFormatChars.storyName = 'Словарь символов-регулярок';

/** Проп `type` задаёт тип.
 *
 * Это стандартные типы поля ввода в HTML. Тип наделяет компонент нативными свойствами, может влиять на отображение подсказок, валидацию, автоматическое переключение раскладки клавиатуры на мобильных устройствах и другие свойства поведения. Подробнее смотрите в [Справке по HTML](https://developer.mozilla.org/ru/docs/Web/HTML/Reference/Elements/input#type).
 *
 * Для `type="tel"` также задайте `autoComplete="tel"`, чтобы браузер предлагал автозаполнение номера.
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
        <MaskedInput
          mask="+7 999 999-99-99"
          type="tel"
          autoComplete="tel"
          value={valueTel}
          onValueChange={setValueTel}
        />
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
  return <MaskedInput mask={MaskedInputMasks.PhoneRU} placeholder="+7" alwaysShowMask />;
};
ExampleAlwaysShowMask.storyName = 'Показывать маску всегда';

/** Проп `unmask` позволяет сразу получать value, в котором будет только введённое пользователем значение, без символов маски. */
export const ExampleUnMask: Story = () => {
  const [value, setValue] = React.useState('');
  const [valueUnMask, setValueUnMask] = React.useState('');

  return (
    <Gapped vertical gap={20}>
      <Gapped gap={20}>
        <MaskedInput
          mask={MaskedInputMasks.PhoneRU}
          placeholder="+7"
          alwaysShowMask
          type="tel"
          autoComplete="tel"
          value={value}
          onValueChange={setValue}
        />
        <span>value по умолчанию: "{value}"</span>
      </Gapped>

      <Gapped gap={20}>
        <MaskedInput
          mask={MaskedInputMasks.PhoneRU}
          placeholder="+7"
          unmask
          alwaysShowMask
          type="tel"
          autoComplete="tel"
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
        mask="+{7} 999 999-99-99"
        unmask
        alwaysShowMask
        type="tel"
        autoComplete="tel"
        value={value}
        onValueChange={setValue}
      />
      <span>value: "{value}"</span>
    </Gapped>
  );
};
ExampleUnMaskPlus.storyName = 'Чистое значение, но с выбранными символами';

/**При `type="tel"` вставка российских номеров нормализуется по умолчанию (`normalizeRussianPhonePaste`):
 * убираются нецифровые символы и код страны `7`/`8` у 11+ значных номеров.
 *
 * Проп `onBeforePasteValue` полностью переопределяет эту логику — используйте его для нестандартных кейсов.
 * В примере ниже явно применяется тот же хелпер (эквивалент дефолтного поведения). */
export const ExampleonBeforePasteValue: Story = () => {
  const [value, setValue] = React.useState('');

  return (
    <MaskedInput
      mask={MaskedInputMasks.PhoneRU}
      placeholder="+7"
      unmask
      type="tel"
      autoComplete="tel"
      value={value}
      onBeforePasteValue={normalizeRussianPhonePaste}
      onValueChange={setValue}
    />
  );
};
ExampleonBeforePasteValue.storyName = 'Фильтрация значения при вставке из буфера обмена';

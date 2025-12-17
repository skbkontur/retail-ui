import React from 'react';
import { SearchLoupeIcon16Light } from '@skbkontur/icons/SearchLoupeIcon16Light';
import { SearchLoupeIcon20Light } from '@skbkontur/icons/SearchLoupeIcon20Light';
import { SearchLoupeIcon24Regular } from '@skbkontur/icons/SearchLoupeIcon24Regular';
import { Button, Gapped, Input } from '@skbkontur/react-ui';

import type { Meta, Story } from '../../../typings/stories';

export default {
  title: 'Input data/Input',
  component: Input,
  parameters: { creevey: { skip: true } },
} as Meta;

export const ExampleBasic: Story = () => {
  return <Input />;
};
ExampleBasic.storyName = 'Базовый пример';

/** Название к полю можно добавить через `label`. Для названия поля есть рекомендации по соблюдению доступности, изучите раздел <a href="#доступность" target="-_self"> Доступность </a>. */
export const ExampleLabel: Story = () => {
  return (
    <Gapped>
      <label htmlFor="input-id">Название поля</label>
      <Input />
    </Gapped>
  );
};
ExampleLabel.storyName = 'Название поля';

/** Размер поля задаётся пропом `size`. По умолчанию `"small"`. */
export const ExampleSize: Story = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'end',
        gap: '10px',
      }}
    >
      <Input size="small" placeholder="Маленький" />
      <Input size="medium" placeholder="Средний" />
      <Input size="large" placeholder="Большой" />
    </div>
  );
};
ExampleSize.storyName = 'Размер';

/** Ширину поля можно задать с помощью пропа `width`. Может принимать как абсолютные значения — например, 150, так и относительные — например, 50%. */
export const ExampleWidth: Story = () => {
  return (
    <Gapped vertical>
      <Input width={'150px'} />
      <Input width={'50%'} />
    </Gapped>
  );
};
ExampleWidth.storyName = 'Ширина';

/** Добавить плейсхолдер можно через `placeholder`. Добавляет подсказку, которая отображается внутри поля, пока оно не заполнено. */
export const ExamplePlaceholder: Story = () => {
  return <Input placeholder=" Подсказка" />;
};
ExamplePlaceholder.storyName = 'Плейсхолдер';

/** Выравнивание текста задаётся пропом `align`. */
export const ExampleAlign: Story = () => {
  const [valueLeft, setValueLeft] = React.useState('Left');
  const [valueCenter, setValueCenter] = React.useState('Center');
  const [valueRight, setValueRight] = React.useState('Right');
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'end',
        gap: '10px',
      }}
    >
      <Input width={150} align="left" value={valueLeft} onValueChange={setValueLeft} />
      <Input width={150} align="center" value={valueCenter} onValueChange={setValueCenter} />
      <Input width={150} align="right" value={valueRight} onValueChange={setValueRight} />
    </div>
  );
};
ExampleAlign.storyName = 'Выравнивание текста';

/** Очистить значение в поле можно только с помощью пустого значения. */
export const ExampleClear: Story = () => {
  const [value, setValue] = React.useState('Нажмите кнопку');
  return (
    <Gapped>
      <Input value={value} onValueChange={setValue} />
      <Button onClick={() => setValue('')}>Передать пустое значение</Button>
    </Gapped>
  );
};
ExampleClear.storyName = 'Очистка поля';

/** В поле ввода можно передать иконку.
 * Иконка может находиться в начале поля — проп `leftIcon`, в конце — проп `rightIcon`.
 * Под разный размер полей используйте подходящие начертания и размер иконок:
 * - Small — Light 16
 * - Medium — Light 20
 * - Large — Regular 24 */
export const ExampleIcon: Story = () => {
  return (
    <Gapped vertical>
      <Gapped>
        <Input size="small" leftIcon={<SearchLoupeIcon16Light />} />
        <Input size="small" rightIcon={<SearchLoupeIcon16Light />} />
      </Gapped>
      <Gapped>
        <Input size="medium" leftIcon={<SearchLoupeIcon20Light />} />
        <Input size="medium" rightIcon={<SearchLoupeIcon20Light />} />
      </Gapped>
      <Gapped>
        <Input size="large" leftIcon={<SearchLoupeIcon24Regular />} />
        <Input size="large" rightIcon={<SearchLoupeIcon24Regular />} />
      </Gapped>
    </Gapped>
  );
};
ExampleIcon.storyName = 'Иконка';

/** По умолчанию очистить поле ввода можно с помощью пустой строки.
 *
 * Дополнительно можно добавить проп `showClearIcon`, по нажатию на иконку очистки поле будет очищаться. По умолчанию `"never"`.
 *
 * Может отображаться в разных вариантах:
 * - `"always"` — всегда показывает иконку очистки в заполненном поле;
 * - `"auto"` — показывает иконку в заполненном поле, когда поле ввода в состоянии hover или focus;
 * - `"never"` (по умолчанию) — не показывает.
 *
 * При одновременной настройке `rightIcon` и `showClearIcon` иконка очистки заменит иконку справа. В таких ситуациях не используйте для `rightIcon` интерактивную иконку, а значение для `showClearIcon` выбирайте `"auto"`.
 */
export const ExampleShowClearIcon: Story = () => {
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
        rightIcon={<SearchLoupeIcon16Light />}
      />
    </Gapped>
  );
};
ExampleShowClearIcon.storyName = 'Иконка очистки';

/** Чтобы значение внутри поля выделялось при фокусе на нем, добавьте проп `selectAllOnFocus`. Может быть полезно для полей, в которых пользователи могут часто копировать значение, или для полей только для чтения. */
export const ExampleSelectAllOnFocus: Story = () => {
  const [valueAlways, setValueAlways] = React.useState('Обычное поле');
  const [valueAuto, setValueAuto] = React.useState('Поле с автовыделением');
  return (
    <Gapped gap={10} vertical>
      <Input value={valueAlways} onValueChange={setValueAlways} width="350px" />
      <Input value={valueAuto} onValueChange={setValueAuto} width="350px" selectAllOnFocus />
    </Gapped>
  );
};
ExampleSelectAllOnFocus.storyName = 'Выделение всего значения при фокусе';

/** Внутри поля можно отобразить префикс  — через проп `prefix` или суфикс — `suffix`. Префикс отображает контент слева от вводимого текста, суфикс — справа. */
export const ExamplePrefixSuffix: Story = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'end',
        gap: '10px',
      }}
    >
      <Input width={400} prefix="https://kontur.ru/search?query=" rightIcon={<SearchLoupeIcon16Light />} />
      <Input width={250} suffix="@example.ru" />
    </div>
  );
};
ExamplePrefixSuffix.storyName = 'Префикс и суфикс';

/** Поле без обводки задаётся пропом `borderless`. */
export const ExampleBorderless: Story = () => {
  const [valueAlways, setValueAlways] = React.useState('Обычное поле');
  const [valueAuto, setValueAuto] = React.useState('Поле без обводки');
  return (
    <Gapped gap={10} vertical>
      <Input value={valueAlways} onValueChange={setValueAlways} width="350px" />
      <Input value={valueAuto} onValueChange={setValueAuto} width="350px" borderless />
    </Gapped>
  );
};
ExampleBorderless.storyName = 'Поле без обводки';

/** Тип поля задаётся пропом `type`. По умолчанию `"text"`.
 *
 * Это стандартные типы поля ввода в HTML. Тип наделяет компонент нативными свойствами, может влиять на отображение подсказок, валидацию, автоматическое переключение раскладки клавиатуры на мобильных устройствах и другие свойства поведения. Подробнее смотрите в [Справке по HTML](https://developer.mozilla.org/ru/docs/Web/HTML/Reference/Elements/input#type).
 *
 * В сервисах Контура допустимо использовать только типы text и password, для остальных используйте компоненты из React UI.*/
export const ExampleType: Story = () => {
  return (
    <Gapped vertical gap={20}>
      <Gapped gap={20}>
        <Input type="text" />
        <span>type = "text"</span>
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
ExampleType.storyName = 'Тип';

/** Проп `onUnexpectedInput` устанавливает обработчик на случай некорректного ввода. В примере ошибка возникнет при попытке ввести больше 3 символов. */
export const ExampleOnUnexpectedInput: Story = () => {
  const [unexpectedInput, setUnexpectedInput] = React.useState('');
  return (
    <Gapped>
      <Input maxLength={3} onUnexpectedInput={setUnexpectedInput} />
      {unexpectedInput ? <>Некорректный ввод: {unexpectedInput}</> : <>Данные в поле валидны</>}
    </Gapped>
  );
};
ExampleOnUnexpectedInput.storyName = 'Обработчик некорректного ввода';

export const ExampleCounter: Story = () => {
  const maxLength = 15;
  const [value, setValue] = React.useState('Очень длинная строка');
  const theme = React.useContext(ThemeContext);
  const charsRemaining = maxLength - value.length;
  const suffixColor = charsRemaining >= 0 ? theme.gray : theme.errorText;
  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      suffix={
        <span style={{ color: suffixColor, fontVariantNumeric: 'tabular-nums' }}>
          &nbsp;&nbsp;{String(charsRemaining).replace('-', '−')}
        </span>
      }
    />
  );
};
ExampleCounter.storyName = 'Кастомизация: счетчик введённых символов';

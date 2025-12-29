import React from 'react';
import { Textarea, Button, Gapped, Switcher } from '@skbkontur/react-ui';

import type { Story } from '../../../typings/stories';

export default {
  title: 'Input data/Textarea',
  component: Textarea,
  parameters: { creevey: { skip: true } },
};

export const ExampleBasic: Story = () => {
  const [value, setValue] = React.useState('');

  return (
    <Textarea
      value={value}
      onValueChange={setValue}
      placeholder="Используйте многострочное поле для ввода больших текстов"
    />
  );
};

export const ExampleSize: Story = () => {
  const [value, setValue] = React.useState('');
  return (
    <Gapped vertical>
      <Textarea size="small" value={value} onValueChange={setValue} placeholder="Маленький" />
      <Textarea size="medium" value={value} onValueChange={setValue} placeholder="Средний" />
      <Textarea size="large" value={value} onValueChange={setValue} placeholder="Большой" />
    </Gapped>
  );
};
ExampleSize.storyName = 'Размер';

/* Проп `width` задаёт ширину поля. Может быть в пикселях, процентах или других конкретных единицах. */
export const ExampleWidth: Story = () => {
  const [valuePercent, setValuePercent] = React.useState('');
  const [valueNumber, setValueNumber] = React.useState('');

  return (
    <Gapped vertical>
      <Textarea
        width={'40%'}
        value={valuePercent}
        onValueChange={setValuePercent}
        placeholder="Задана ширина в процентах"
      />
      <Textarea
        width={'150px'}
        value={valueNumber}
        onValueChange={setValueNumber}
        placeholder="Задана ширина в пикселях"
      />
    </Gapped>
  );
};
ExampleWidth.storyName = 'Ширина';

/** Проп `rows` задаёт высоту поля, которая равна количеству видимых строк. При превышении этой высоты появляется скролл. */
export const ExampleRows: Story = () => {
  const [value, setValue] = React.useState('');

  return (
    <Textarea
      rows={3}
      value={value}
      onValueChange={setValue}
      placeholder="Используйте многострочное поле для ввода больших текстов"
    />
  );
};
ExampleRows.storyName = 'Высота поля';

/** Проп `resize` определяет, в какую сторону или стороны будет расширяться поле. По умолчанию многострочное поле может изменять свой размер, если потянуть за нижний правый угол.
 *
 * Основные значения:
 * - none — размеры изменять нельзя;
 * - both — размеры можно изменять по горизонтали и вертикали;
 * - horizontal — размер можно изменять по горизонтали;
 * - vertical — размер можно изменять по вертикали.
 *
 * Описания для экспериментальных значений смотрите [в документации MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/resize).
 */
export const ExampleResize: Story = () => {
  const [value, setValue] = React.useState('');
  return (
    <Gapped vertical>
      <Textarea width="auto" resize="none" value={value} onValueChange={setValue} placeholder="resize: none" />
      <Textarea width="auto" resize="both" value={value} onValueChange={setValue} placeholder="resize: both" />
      <Textarea
        width="auto"
        resize="horizontal"
        value={value}
        onValueChange={setValue}
        placeholder="resize: horizontal"
      />
      <Textarea width="auto" resize="vertical" value={value} onValueChange={setValue} placeholder="resize: vertical" />
    </Gapped>
  );
};
ExampleResize.storyName = 'Ресайз';

/** Проп `autoResize` автоматически увеличивает поле под его содержимое.
 *
 * Связан с пропом `extraRow`, который всегда добавляет дополнительную пустую строку, и пропом `maxRows` — максимальное число видимых строк. */
export const ExampleAutoResize: Story = () => {
  const [value, setValue] = React.useState('');

  return (
    <Textarea
      autoResize
      rows={3}
      maxRows={15}
      value={value}
      onValueChange={setValue}
      placeholder="Используйте многострочное поле для ввода больших текстов"
    />
  );
};
ExampleAutoResize.storyName = 'Автоматический ресайз поля';

/**  Проп `align` выравнивает текст в поле. */
export const ExampleAlign: Story = () => {
  const [value, setValue] = React.useState('');
  return (
    <Gapped vertical>
      <Textarea align="left" value={value} onValueChange={setValue} placeholder="Слева" />
      <Textarea align="center" value={value} onValueChange={setValue} placeholder="По центру" />
      <Textarea align="right" value={value} onValueChange={setValue} placeholder="Справа" />
    </Gapped>
  );
};
ExampleAlign.storyName = 'Выравнивание текста';

/** Очистить значение в поле можно только с помощью пустой строки. */
export const ExampleClear: Story = () => {
  const [value, setValue] = React.useState('Значение');

  return (
    <Gapped vertical gap={30}>
      <Textarea value={value} onValueChange={setValue} autoResize rows={1} placeholder="Плейсхолдер" />
      <Button onClick={() => setValue('')}>Передать пустую строку</Button>
    </Gapped>
  );
};
ExampleClear.storyName = 'Очистка значения';

/** За отображение счётчика введённых символов отвечают пропсы:
 * - `showLengthCounter` — отображает счётчик символов.
 * - `lengthCounter` — допустимое количество символов в поле. Отображается в счётчике символов.
 * - `counterHelp` — добавляет подсказку к счётчику символов.
 */
export const ExampleCounter: Story = () => {
  const [value, setValue] = React.useState('');

  return (
    <Textarea
      value={value}
      onValueChange={setValue}
      placeholder="Счётчик появляется при фокусе"
      lengthCounter={10}
      showLengthCounter
      counterHelp="Текст подсказки"
    />
  );
};
ExampleCounter.storyName = 'Счётчик введённых символов';

/** Проп `disabled` блокирует поле. */
export const ExampleDisabled: Story = () => {
  const [value, setValue] = React.useState('');

  return (
    <Textarea
      disabled
      value={value}
      onValueChange={setValue}
      placeholder="Используйте многострочное поле для ввода больших текстов"
    />
  );
};
ExampleDisabled.storyName = 'Состояние блокировки';

/** Пропы `error` и `warning используются для валидации. */
export const ExampleError: Story = () => {
  const [valid, setValid] = React.useState();
  const [value, setValue] = React.useState('');

  return (
    <Gapped vertical>
      <Switcher items={['error', 'warning']} onValueChange={setValid} value={valid} />
      <Textarea
        {...{ [valid]: valid }}
        value={value}
        onValueChange={setValue}
        placeholder="Используйте многострочное поле для ввода больших текстов"
      />
    </Gapped>
  );
};
ExampleError.storyName = 'Состояние ошибки';

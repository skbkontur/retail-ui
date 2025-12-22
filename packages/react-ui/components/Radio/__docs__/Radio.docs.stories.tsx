import React from 'react';
import { Radio, Gapped, RadioGroup } from '@skbkontur/react-ui';

import type { Meta, Story } from '../../../typings/stories';

export default {
  title: 'Input data/Radio',
  component: Radio,
  parameters: { creevey: { skip: true } },
} as Meta;

export const ExampleBasic: Story = () => {
  const [chosen, setChosen] = React.useState(null);

  return (
    <RadioGroup value={chosen} onValueChange={setChosen}>
      <Gapped gap={3} vertical>
        <Radio value={1}>Первый вариант</Radio>
        <Radio value={2}>Второй вариант</Radio>
      </Gapped>
    </RadioGroup>
  );
};

/** Проп `size` задаёт размер радиокнопки. По умолчанию: `'small'`. */
export const ExampleSize: Story = () => {
  const [chosen, setChosen] = React.useState(null);
  return (
    <RadioGroup value={chosen} onValueChange={setChosen}>
      <Gapped vertical>
        <Radio size="small" value={1}>
          Маленький
        </Radio>
        <Radio size="medium" value={2}>
          Средний
        </Radio>
        <Radio size="large" value={3}>
          Большой
        </Radio>
      </Gapped>
    </RadioGroup>
  );
};
ExampleSize.storyName = 'Размер';

/** У радиокнопки есть несколько пропсов состояний:
 * - `disabled` — блокирует радиокнопку.
 * - `checked` — делает радиокнопку контролируемым и выбранным по умолчанию элементом.
 * - `focused` — задаёт состояние фокусировки.
 * - `error` — задаёт состояние «Ошибка».
 * - `warning` — задаёт состояние «Предупреждение».
 *
 * Радиокнопка может быть сразу в нескольких состояниях. */
export const ExampleMode: Story = () => {
  const [chosen, setChosen] = React.useState(null);

  return (
    <RadioGroup value={chosen} onValueChange={setChosen}>
      <Gapped gap={3} vertical>
        <Radio value={1}>Обычная</Radio>
        <Radio value={2} disabled>
          Заблокированная
        </Radio>
        <Radio value={3} checked={!chosen}>
          Отмеченная по умолчанию
        </Radio>
        <Radio value={4} focused>
          В состоянии focused
        </Radio>
        <Radio value={5} error>
          В состоянии error
        </Radio>
        <Radio value={6} warning>
          В состоянии warning
        </Radio>
        <Radio disabled checked warning value="true">
          Заблокированная и отмеченная по умолчанию в состоянии warning
        </Radio>
      </Gapped>
    </RadioGroup>
  );
};
ExampleMode.storyName = 'Состояния';

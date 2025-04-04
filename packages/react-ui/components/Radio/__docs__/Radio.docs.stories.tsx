import React from 'react';
import { Radio, Gapped, RadioGroup } from '@skbkontur/react-ui';

import { Meta, Story } from '../../../typings/stories';

export default {
  title: 'Input data/Radio',
  component: Radio,
  parameters: { creevey: { skip: true } },
} as Meta;

export const Example1: Story = () => {
  const [chosen, setChosen] = React.useState(null);

  return (
    <RadioGroup value={chosen} onValueChange={setChosen}>
      <Gapped gap={3} vertical>
        <Radio value={1}>Обычная радио-кнопка</Radio>
        <Radio value={2} disabled>
          Отключенная радио-кнопка
        </Radio>
        <Radio value={3} checked={!chosen}>
          Радио-кнопка отмеченная по умолчанию
        </Radio>
        <Radio value={4} focused>
          Радио-кнопка в состоянии <b>focused</b> (меняется только обводка)
        </Radio>
        <Radio value={5} error>
          Радио-кнопка в состоянии <b>error</b>
        </Radio>
        <Radio value={6} warning>
          Радио-кнопка в состоянии <b>warning</b>
        </Radio>
      </Gapped>
    </RadioGroup>
  );
};
Example1.storyName = 'Виды радио-кнопок';

/** Радио-кнопки могут иметь сразу несколько состояний. */
export const Example2: Story = () => {
  return (
    <Radio disabled checked warning value="true">
      Отключенная, отмеченная радио-кнопка в состоянии <b>warning</b>
    </Radio>
  );
};
Example2.storyName = 'Состояния';

export const Example3: Story = () => {
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
Example3.storyName = 'Размер';

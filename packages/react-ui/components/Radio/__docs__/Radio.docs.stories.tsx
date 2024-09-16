import React from 'react';
import { Meta, Story } from '../../../typings/stories';

import { Radio, Gapped, RadioGroup } from '@skbkontur/react-ui';

export default {
  title: 'Input data/Radio',
  component: Radio,
  parameters: { creevey: { skip: true } },
} as Meta;

export const Example1: Story = () => {

  const [chosen, setChosen] = React.useState(null);

  return (
    <RadioGroup onValueChange={(value) => setChosen(value)}>
      <Gapped gap={3} vertical>
        <Radio value={1}>
          Обычная радио-кнопка
        </Radio>
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
    <Radio disabled checked warning>
      Отключенная, отмеченная радио-кнопка в состоянии <b>warning</b>
    </Radio>
  );

};
Example2.storyName = 'Состояния';

export const Example3: Story = () => {

  return (
    <Gapped vertical>
      <Radio size="small" value="value" >
        Маленький
      </Radio>
      <Radio size="medium" value="value" >
        Средний
      </Radio>
      <Radio size="large" value="value" >
        Большой
      </Radio>
    </Gapped>
  );

};
Example3.storyName = 'Размер';


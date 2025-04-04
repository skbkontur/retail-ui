import React from 'react';
import { Gapped, Button, Checkbox, Toggle } from '@skbkontur/react-ui';

import { Meta, Story } from '../../../typings/stories';

export default {
  title: 'Layout/Gapped',
  component: Gapped,
  parameters: { creevey: { skip: true } },
} as Meta;

export const Example1: Story = () => {
  return (
    <Gapped gap={20}>
      <Button use="primary">Сохранить</Button>
      <Button>Отмена</Button>
    </Gapped>
  );
};
Example1.storyName = 'Вывод элементов с горизонтальным расположением';

export const Example2: Story = () => {
  return (
    <Gapped vertical gap={20}>
      <Checkbox checked>Write todos</Checkbox>
      <Checkbox initialIndeterminate>Work in progress</Checkbox>
      <Checkbox>Make things done</Checkbox>
    </Gapped>
  );
};
Example2.storyName = 'Вертикальное расположение';

/** По умолчанию `Gapped` выстраивает элементы в одну строчку, но с помощью свойства `wrap` можно включить перенос элементов на новую строку.
При этом между строчками будет отступ равный значению свойста `gap`
В таком случае из-за особенности верстки `Gapped` может перекрывать элементы расположенные сверху-слева. */
export const Example3: Story = () => {
  return (
    <>
      {"U Can't Touch This! => "}
      <Toggle />

      <div style={{ paddingTop: '10px', position: 'relative', width: '250px' }}>
        <Gapped wrap gap={50}>
          <Button use="primary">Сохранить</Button>
          <Button>Отмена</Button>
          <Checkbox>Я не робот</Checkbox>
        </Gapped>
      </div>
    </>
  );
};
Example3.storyName = 'Wrap';

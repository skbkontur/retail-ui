import { Button, Checkbox, Gapped, Toggle } from '@skbkontur/react-ui';
import React from 'react';

import type { Meta, Story } from '../../../typings/stories.js';

const meta: Meta = {
  title: 'Layout/Gapped',
  component: Gapped,
  parameters: { creevey: { skip: true } },
};

export default meta;

export const ExampleBasic: Story = () => {
  return (
    <Gapped gap={20}>
      <Button use="primary">Элемент 1</Button>
      <Button>Элемент 2</Button>
    </Gapped>
  );
};

/** Проп `vertical` выстраивает элементы вертикально.
 */
export const ExampleVertical: Story = () => {
  return (
    <Gapped gap={20} vertical>
      <Button use="primary">Элемент 1</Button>
      <Button>Элемент 2</Button>
    </Gapped>
  );
};
ExampleVertical.storyName = 'Вертикальное расположение';

/** Проп `verticalAlign` задаёт расположение элементов относительно вертикальной оси: прижаты к верхней, нижней, базовой линии или находятся посередине.
 */
export const ExampleVerticalAlign: Story = () => {
  return (
    <Gapped gap={10} vertical>
      <b>verticalAlign="top</b>
      <Gapped gap={10} verticalAlign="top">
        <div
          style={{
            width: 300,
            height: 200,
            backgroundColor: '#eee',
            background: 'repeating-linear-gradient(-45deg, #ccc, #ccc 25px, #eee 25px, #eee 225px)',
          }}
        />
        <Gapped gap={20}>
          <Button use="primary">"Элемент 1"</Button>
          <Button>Элемент 2</Button>
        </Gapped>
      </Gapped>
      <b>verticalAlign="middle"</b>
      <Gapped gap={10} verticalAlign="middle">
        <div
          style={{
            width: 300,
            height: 200,
            backgroundColor: '#eee',
            background: 'repeating-linear-gradient(-45deg, #ccc, #ccc 25px, #eee 25px, #eee 225px)',
          }}
        />
        <Gapped gap={20}>
          <Button use="primary">"Элемент 1"</Button>
          <Button>Элемент 2</Button>
        </Gapped>
      </Gapped>
      <b>verticalAlign="bottom"</b>
      <Gapped gap={10} verticalAlign="bottom">
        <div
          style={{
            width: 300,
            height: 200,
            backgroundColor: '#eee',
            background: 'repeating-linear-gradient(-45deg, #ccc, #ccc 25px, #eee 25px, #eee 225px)',
          }}
        />
        <Gapped gap={20}>
          <Button use="primary">"Элемент 1"</Button>
          <Button>Элемент 2</Button>
        </Gapped>
      </Gapped>
    </Gapped>
  );
};
ExampleVerticalAlign.storyName = 'Выравнивание по вертикали';

/** Проп `wrap` включает перенос элементов на новую строку, работает при горизонтальном расположении.
* Между строчками будет отступ заданный в пропе `gap`.

* В такой настройке из-за особенности верстки `Gapped` может перекрывать элементы расположенные сверху-слева. */
export const ExampleWrap: Story = () => {
  return (
    <>
      {'Элемент 1 '}
      <Toggle />

      <div style={{ paddingTop: '10px', position: 'relative', width: '250px' }}>
        <Gapped wrap gap={50}>
          <Button use="primary">Элемент 2</Button>
          <Button>Элемент 3</Button>
          <Checkbox>Элемент 3</Checkbox>
        </Gapped>
      </div>
    </>
  );
};
ExampleWrap.storyName = 'Перенос элементов на новую строку';

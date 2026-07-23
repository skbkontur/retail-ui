import { Tabs } from '@skbkontur/react-ui';
import React from 'react';

import type { Meta, Story } from '../../../typings/stories.js';

const meta: Meta = {
  title: 'Display data/Tabs',
  component: Tabs,
  parameters: { creevey: { skip: true } },
};

export default meta;

export const ExampleBasic: Story = () => {
  const [active, setActive] = React.useState('inbox');

  return (
    <Tabs value={active} onValueChange={setActive}>
      <Tabs.Tab id="inbox">Входящие</Tabs.Tab>
      <Tabs.Tab id="sent">Отправленные</Tabs.Tab>
    </Tabs>
  );
};
ExampleBasic.storyName = 'Базовый пример';

/**
 * Проп `size` задаёт размер табов в группе.
 */
export const SizeExample: Story = () => {
  const [active, setActive] = React.useState('inbox');
  const renderCaption = (caption: string) => <span style={{ display: 'inline-block', width: 60 }}>{caption}</span>;
  return (
    <div>
      <div>
        {renderCaption('small')}
        <Tabs value={active} onValueChange={setActive} size="small">
          <Tabs.Tab id="inbox">Входящие</Tabs.Tab>
          <Tabs.Tab id="sent">Отправленные</Tabs.Tab>
        </Tabs>
      </div>
      <div>
        {renderCaption('medium')}
        <Tabs value={active} onValueChange={setActive} size="medium">
          <Tabs.Tab id="inbox">Входящие</Tabs.Tab>
          <Tabs.Tab id="sent">Отправленные</Tabs.Tab>
        </Tabs>
      </div>
      <div>
        {renderCaption('large')}
        <Tabs value={active} onValueChange={setActive} size="large">
          <Tabs.Tab id="inbox">Входящие</Tabs.Tab>
          <Tabs.Tab id="sent">Отправленные</Tabs.Tab>
        </Tabs>
      </div>
    </div>
  );
};
SizeExample.storyName = 'Размер';

/** Компонент может отображать табы двумя способами: горизонтально (по умолчанию) и вертикально. */
export const AlignmentExample: Story = () => {
  const [active, setActive] = React.useState('inbox');

  return (
    <Tabs vertical value={active} onValueChange={setActive}>
      <Tabs.Tab id="inbox">Входящие</Tabs.Tab>
      <Tabs.Tab id="sent">Отправленные</Tabs.Tab>
    </Tabs>
  );
};
AlignmentExample.storyName = 'Расположение табов';

/**
 * Проп `width` задаёт ширину группы табов.
 */
export const WidthExample: Story = () => {
  const [active, setActive] = React.useState('inbox');

  return (
    <Tabs style={{ backgroundColor: 'lightgreen' }} width={150} value={active} onValueChange={setActive}>
      <Tabs.Tab id="inbox">Входящие</Tabs.Tab>
      <Tabs.Tab id="sent">Отправленные</Tabs.Tab>
    </Tabs>
  );
};
WidthExample.storyName = 'Ширина группы табов';

/**
 * Проп `indicatorClassName` задаёт кастомный класс подчёркивания табов.
 */
export const CustomizationExample: Story = () => {
  const [active, setActive] = React.useState('inbox');

  return (
    <>
      <style>{`.indicatorClassName { height: 5px; background-color: orange; }`}</style>
      <Tabs indicatorClassName="indicatorClassName" value={active} onValueChange={setActive}>
        <Tabs.Tab id="inbox">Входящие</Tabs.Tab>
        <Tabs.Tab id="sent">Отправленные</Tabs.Tab>
      </Tabs>
    </>
  );
};
CustomizationExample.storyName = 'Кастомизация: стиль подчёркивания табов в группе';

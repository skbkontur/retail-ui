import React from 'react';
import { Tabs } from '@skbkontur/react-ui';

import type { Meta, Story } from '../../../typings/stories';
import { styles } from '../Indicator.styles';
export default {
  title: 'Display data/Tabs/Tabs',
  component: Tabs,
  parameters: { creevey: { skip: true } },
} as Meta;

export const BasicExample: Story = () => {
  const [active, setActive] = React.useState('inbox');

  return (
    <Tabs value={active} onValueChange={setActive}>
      <Tabs.Tab id="inbox">Входящие</Tabs.Tab>
      <Tabs.Tab id="sent">Отправленные</Tabs.Tab>
    </Tabs>
  );
};
BasicExample.storyName = 'Базовый пример';

/**
 * Проп `size` задаёт размер табов в группе. По умолчанию: `'large'`.
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
    <Tabs indicatorClassName={styles.customizationExample()} value={active} onValueChange={setActive}>
      <Tabs.Tab id="inbox">Входящие</Tabs.Tab>
      <Tabs.Tab id="sent">Отправленные</Tabs.Tab>
    </Tabs>
  );
};
CustomizationExample.storyName = 'Кастомизация: стиль подчёркивания табов в группе';

import { IconTechScreenMonitorLight16 } from '@skbkontur/icons/IconTechScreenMonitorLight16';
import { IconWeatherMoonLight16 } from '@skbkontur/icons/IconWeatherMoonLight16';
import { IconWeatherSunLight16 } from '@skbkontur/icons/IconWeatherSunLight16';
import type { ButtonProps, SwitcherItems } from '@skbkontur/react-ui';
import { Gapped, Hint, Switcher, Tooltip } from '@skbkontur/react-ui';
import React from 'react';

import type { Meta, Story } from '../../../typings/stories.js';

const meta: Meta = {
  title: 'Button/Switcher',
  component: Switcher,
  parameters: { creevey: { skip: true } },
};

export default meta;

export const BasicExample: Story = () => {
  const [value, setValue] = React.useState('');

  return (
    <Switcher caption="Выбери вариант" items={['Первый', 'Второй', 'Третий']} value={value} onValueChange={setValue} />
  );
};
BasicExample.storyName = 'Базовый пример';

/** Случай, когда `items` принимает объект типа `{ label: string, value: string }` */
export const WithItemsAsObjects: Story = () => {
  const [value, setValue] = React.useState('');
  const items: SwitcherItems[] = [
    {
      label: '1',
      value: '1',
    },
    {
      label: '2',
      value: '2',
    },
    {
      label: '3',
      value: '3',
    },
    {
      label: '4',
      value: '4',
    },
  ];

  return (
    <Gapped gap={8} vertical>
      <Switcher caption="Отчет за" items={items} value={value} onValueChange={setValue} />
      <div>value: {value}</div>
    </Gapped>
  );
};
WithItemsAsObjects.storyName = 'items в виде объектов';

/** Вариант `items` с полем `buttonProps`, который позволяет кастомизировать кнопку */
export const WithCustomButtonProps: Story = () => {
  const [value, setValue] = React.useState('system');
  const items: SwitcherItems[] = [
    {
      label: '',
      value: 'light',
      buttonProps: {
        icon: <IconWeatherSunLight16 />,
      },
    },
    {
      label: '',
      value: 'system',
      buttonProps: {
        icon: <IconTechScreenMonitorLight16 />,
      },
    },
    {
      label: '',
      value: 'dark',
      buttonProps: {
        icon: <IconWeatherMoonLight16 />,
      },
    },
  ];

  return <Switcher items={items} value={value} onValueChange={setValue} />;
};
WithCustomButtonProps.storyName = 'Кастомизация кнопки';

/** Пример с методом `renderItem` для кастомизации `items`: */
export const WithCustomRenderItem: Story = () => {
  const [value, setValue] = React.useState('');
  const items = ['Самовывоз', 'Постамат', 'Курьер'];

  const renderItem = (label: string, value: string, buttonProps: ButtonProps, renderDefault: () => React.ReactNode) => {
    if (value === 'Постамат') {
      return (
        <Hint pos="bottom" text="Доставим в удобный пункт выдачи">
          {renderDefault()}
        </Hint>
      );
    }
    if (value === 'Курьер') {
      return (
        <Tooltip
          pos="top left"
          trigger="click"
          render={() => (
            <div>
              Из-за повышенного объема заказов
              <br />
              возможно длительное ожидание
            </div>
          )}
        >
          {renderDefault()}
        </Tooltip>
      );
    }
    return renderDefault();
  };

  return (
    <Switcher caption="Способ получения" items={items} value={value} onValueChange={setValue} renderItem={renderItem} />
  );
};
WithCustomRenderItem.storyName = 'Кастомизация items';

/** Пример с разными значениями пропа `width`: */
export const WithCustomWidth: Story = () => {
  const [valueFirst, setValueFirst] = React.useState('');
  const [valueSecond, setValueSecond] = React.useState('');
  const [valueThird, setValueThird] = React.useState('');
  const items = ['Первый', 'Второй', 'Третий'];

  return (
    <Gapped vertical gap={16}>
      <Switcher width={250} items={items} value={valueFirst} onValueChange={setValueFirst} />
      <Switcher width="50%" items={items} value={valueSecond} onValueChange={setValueSecond} />
      <Switcher width="100%" items={items} value={valueThird} onValueChange={setValueThird} />
    </Gapped>
  );
};
WithCustomWidth.storyName = 'Кастомизация ширины';

import React from 'react';
import { Meta, Story } from '../../../typings/stories';

import { Switcher, Hint, Tooltip } from '@skbkontur/react-ui';

export default {
  title: 'Button/Switcher',
  component: Switcher,
  parameters: { creevey: { skip: true } },
} as Meta;

export const Example1: Story = () => {
  const [value, setValue] = React.useState();

  return (
    <Switcher
      caption="Switch the switcher"
      items={['One', 'Two', 'Three']}
      value={value}
      onValueChange={setValue}
    />
  );

};
Example1.storyName = 'Базовый пример';

/** Случай, когда `items` принимает объект типа `{ label: string, value: string }` */
export const Example2: Story = () => {
  const [value, setValue] = React.useState();
  const items = [
    {
      label: 'One',
      value: '111',
    },
    {
      label: 'Two',
      value: '222',
    },
    {
      label: 'Three',
      value: '333',
    }
  ];

  return (
    <Switcher
      caption="Switch the switcher"
      items={items}
      value={value}
      onValueChange={setValue}
    />
  );

};
Example2.storyName = 'items в виде объектов';

/** Вариант `items` с полем `buttonProps`, который позволяет кастомизировать кнопку */
export const Example3: Story = () => {
  const [value, setValue] = React.useState();
  const items = [
    {
      label: 'One',
      value: '111',
      buttonProps: {
        'data-tid': "1-1-1",
        disabled: true,
      }
    },
    {
      label: 'Three',
      value: '333',
      buttonProps: {
        'data-tid': "1-1-1",
        use: "primary",
      }
    },
    {
      label: 'Two',
      value: '222',
      buttonProps: {
        'data-tid': "1-1-1",
        arrow: true,
      }
    }
  ];

  return (
    <Switcher
      caption="Switch the switcher"
      items={items}
      value={value}
      onValueChange={setValue}
    />
  );

};
Example3.storyName = 'Кастомизация кнопки';

/** Пример с методом `renderItem` для кастомизации `items`: */
export const Example4: Story = () => {

  const [value, setValue] = React.useState();
  const items = ['One', 'Two', 'Three'];

  const renderItem = (label, value, buttonProps, renderDefault) => {
    if (value === 'One') {
      return <Hint pos="bottom" text="Подсказка" opened manual>{renderDefault()}</Hint>;
    }
    if (value === 'Three') {
      return (
        <Tooltip pos="right middle" trigger="opened" render={() => 'Тултип'}>
          {renderDefault()}
        </Tooltip>
      );
    }
    return renderDefault();
  }

  return (
    <Switcher
      caption="Switch the switcher"
      items={items}
      value={value}
      onValueChange={setValue}
      renderItem={renderItem}
    />
  );

};
Example4.storyName = 'Кастомизация items';


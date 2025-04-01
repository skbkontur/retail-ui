import React from 'react';
import { People3Icon } from '@skbkontur/icons/icons/People3Icon';
import { Select, Button, Group, Link, Gapped } from '@skbkontur/react-ui';

import type { Meta, Story } from '../../../typings/stories';

export default {
  title: 'Input data/Select',
  component: Select,
  parameters: { creevey: { skip: true } },
} as Meta;

export const Example1: Story = () => {
  const [value, setValue] = React.useState();

  const items = [
    Select.staticElement(() => <Select.Item>Not selectable</Select.Item>),
    'One',
    'Two',
    'Three',
    Select.SEP,
    'Four',
  ];

  return <Select items={items} value={value} onValueChange={setValue} />;
};
Example1.storyName = 'Базовый пример';

/** В пункты меню можно передать проп `isNotSelectable`, чтобы запретить выделение и выбор этого пункта меню */
export const Example2: Story = () => {
  const [value, setValue] = React.useState();

  const items = [<Select.Item isNotSelectable>Not selectable</Select.Item>, 'One', 'Two', 'Three', Select.SEP, 'Four'];

  return <Select items={items} value={value} onValueChange={setValue} />;
};
Example2.storyName = 'Запрет выделения и выбора';

/** Очистить значение в `Select`'е можно только с помощью `null` */
export const Example3: Story = () => {
  const [value, setValue] = React.useState();

  const items = ['One', 'Two', 'Three', 'Four'];

  return (
    <Group>
      <Select items={items} value={value} onValueChange={setValue} />
      <Button onClick={() => setValue(null)}>Очистить</Button>
    </Group>
  );
};
Example3.storyName = 'Очистка значения';

export const Example4: Story = () => {
  const [value, setValue] = React.useState();

  const items = ['One', 'Two', 'Three', Select.SEP, 'Four'];

  return <Select items={items} value={value} onValueChange={setValue} search />;
};
Example4.storyName = 'Поле поиска';

export const Example5: Story = () => {
  const [value, setValue] = React.useState();

  const items = [
    Select.staticElement(() => <Select.Item>Not selectable</Select.Item>),
    'One',
    'Two',
    'Three',
    Select.SEP,
    'Four',
  ];

  const renderLinkButton = (params) => {
    const linkProps = {
      disabled: params.disabled,
      icon: <People3Icon />,
      _button: true,
      _buttonOpened: params.opened,

      onClick: params.onClick,
      onKeyDown: params.onKeyDown,
    };

    return <Link {...linkProps}>{params.label}</Link>;
  };

  return <Select items={items} value={value} onValueChange={setValue} _renderButton={renderLinkButton} />;
};
Example5.storyName = 'Пример использования пропа `_renderButton`:';

export const Example7: Story = () => {
  const [valueSmall, setValueSmall] = React.useState('Маленький');
  const [valueMedium, setValueMedium] = React.useState('Средний');
  const [valueLarge, setValueLarge] = React.useState('Большой');

  const items = ['Маленький', 'Средний', 'Большой'];

  return (
    <Gapped vertical>
      <Select items={items} value={valueSmall} onValueChange={setValueSmall} size={'small'} />
      <Select items={items} value={valueMedium} onValueChange={setValueMedium} size={'medium'} />
      <Select items={items} value={valueLarge} onValueChange={setValueLarge} size={'large'} />
    </Gapped>
  );
};
Example7.storyName = 'Размер';

import React from 'react';
import { SearchLoupeIcon } from '@skbkontur/icons/SearchLoupeIcon';
import { Autocomplete, Button, Group, Gapped } from '@skbkontur/react-ui';
import { UiFilterFunnelIcon16Regular } from '@skbkontur/icons/icons/UiFilterFunnelIcon/UiFilterFunnelIcon16Regular';

import { Meta, Story } from '../../../typings/stories';

export default {
  title: 'Input data/Autocomplete',
  component: Autocomplete,
  parameters: { creevey: { skip: true } },
} as Meta;

export const Example1: Story = () => {
  const items = ['Grey Face', 'Grey Space', 'Kappa', 'Keepo', 'Resident Sleeper'];

  const [value, setValue] = React.useState('Kappa');

  return <Autocomplete source={items} value={value} onValueChange={setValue} />;
};
Example1.storyName = 'Базовый пример';

/** Очистить значение в `Autocomplete` можно только с помощью пустой строки. */
export const Example2: Story = () => {
  const items = ['Grey Face', 'Grey Space', 'Kappa', 'Keepo', 'Resident Sleeper'];

  const [value, setValue] = React.useState('Kappa');

  return (
    <Group>
      <Autocomplete source={items} value={value} onValueChange={setValue} />
      <Button onClick={() => setValue('')}>Очистить</Button>
    </Group>
  );
};
Example2.storyName = 'Очистка Autocomplete';

export const Example3: Story = () => {
  const items = ['Маленький', 'Средний', 'Большой'];

  const [valueSmall, setValueSmall] = React.useState('Маленький');
  const [valueMedium, setValueMedium] = React.useState('Средний');
  const [valueLarge, setValueLarge] = React.useState('Большой');

  return (
    <Gapped vertical>
      <Autocomplete source={items} value={valueSmall} onValueChange={setValueSmall} size={'small'} />
      <Autocomplete source={items} value={valueMedium} onValueChange={setValueMedium} size={'medium'} />
      <Autocomplete source={items} value={valueLarge} onValueChange={setValueLarge} size={'large'} />
    </Gapped>
  );
};
Example3.storyName = 'Размер';

export const Example4: Story = () => {
  const items = ['Grey Face', 'Grey Space', 'Kappa', 'Keepo', 'Resident Sleeper'];

  const [value, setValue] = React.useState('');

  return <Autocomplete source={items} value={value} onValueChange={setValue} selectAllOnFocus />;
};
Example4.storyName = 'Выделение введеного значения при фокусе';

export const Example5: Story = () => {
  const items = ['Grey Face', 'Grey Space', 'Kappa', 'Keepo', 'Resident Sleeper'];

  const [valueLeft, setValueLeft] = React.useState('');
  const [valueRight, setValueRight] = React.useState('');

  return (
    <Gapped>
      <Autocomplete source={items} value={valueLeft} onValueChange={setValueLeft} leftIcon={<SearchLoupeIcon />} />
      <Autocomplete source={items} value={valueRight} onValueChange={setValueRight} rightIcon={<SearchLoupeIcon />} />
    </Gapped>
  );
};
Example5.storyName = 'Иконка';

export const Example6: Story = () => {
  const items = ['Grey Face', 'Grey Space', 'Kappa', 'Keepo', 'Resident Sleeper'];

  const [value, setValue] = React.useState('');

  return <Autocomplete source={items} value={value} onValueChange={setValue} menuWidth={'80%'} />;
};
Example6.storyName = 'Ширина меню';

export const Example7: Story = () => {
  const items = ['Grey Face', 'Grey Space', 'Kappa', 'Keepo', 'Resident Sleeper'];

  const [value, setValue] = React.useState('');

  return <Autocomplete source={items} value={value} onValueChange={setValue} menuPos={'top'} />;
};
Example7.storyName = 'Расположение выпадающего окна Autocomplete';

export const Example8: Story = () => {
  const items = ['Grey Face', 'Grey Space', 'Kappa', 'Keepo', 'Resident Sleeper'];

  const [value, setValue] = React.useState('');

  return <Autocomplete source={items} value={value} onValueChange={setValue} hasShadow />;
};
Example8.storyName = 'Тень у выпадающего меню';

export const Example9: Story = () => {
  const items = ['Grey Face', 'Grey Space', 'Kappa', 'Keepo', 'Resident Sleeper'];

  const [value, setValue] = React.useState('Kappa');

  return <Autocomplete source={items} value={value} onValueChange={setValue} borderless />;
};
Example9.storyName = 'Режима прозрачной рамки';

/**
 * - `always` — всегда показывать иконку очистки значения в заполненном поле
 * - `auto` — показывать иконку в заполненном поле при hover/focus
 * - `never` — не показывать (по умолчанию)
 *
 * При одновременной настройке `showClearIcon` и `rightIcon` показывается иконка очистки.
 */
export const Example10: Story = () => {
  const items = [
    'showClearIcon="auto"',
    'showClearIcon="always"',
    'showClearIcon="never"',
    'showClearIcon="auto" + rightIcon',
  ];

  const [valueAlways, setValueAlways] = React.useState(items[0]);
  const [valueAuto, setValueAuto] = React.useState(items[1]);
  const [valueNever, setValueNever] = React.useState(items[2]);
  const [valueWithIcon, setValueWithIcon] = React.useState(items[3]);
  return (
    <Gapped vertical>
      <Autocomplete
        showClearIcon="always"
        source={items}
        value={valueAlways}
        onValueChange={setValueAlways}
        width="350px"
      />
      <Autocomplete showClearIcon="auto" source={items} value={valueAuto} onValueChange={setValueAuto} width="350px" />
      <Autocomplete
        showClearIcon="never"
        source={items}
        value={valueNever}
        onValueChange={setValueNever}
        width="350px"
      />
      <br />
      <Autocomplete
        showClearIcon="auto"
        source={items}
        value={valueWithIcon}
        onValueChange={setValueWithIcon}
        width="350px"
        rightIcon={<UiFilterFunnelIcon16Regular />}
      />
    </Gapped>
  );
};
Example10.storyName = 'Иконка очистки поля';

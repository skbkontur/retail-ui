import React from 'react';
import { People3Icon } from '@skbkontur/icons/icons/People3Icon';
import { Select, Button, Link, Gapped, type ButtonParams } from '@skbkontur/react-ui';

import type { Meta, Story } from '../../../typings/stories';

export default {
  title: 'Input data/Select',
  component: Select,
  parameters: { creevey: { skip: true } },
} as Meta;

export const ExampleBasic: Story = () => {
  const [value, setValue] = React.useState();

  const items = ['Счёт-фактура', 'Акт', 'Накладная', 'Договор'];

  return <Select items={items} value={value} onValueChange={setValue} />;
};

/** Проп `size` задаёт размер раскрывающегося списка. По умолчанию `"small"`. */
export const ExampleSize: Story = () => {
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
ExampleSize.storyName = 'Размер';

/** Проп `width` задаёт фиксированную ширину раскрывающегося списка, в том числе ширину кнопки. */
export const ExampleWidth: Story = () => {
  const [value, setValue] = React.useState();

  const items = ['Счёт-фактура', 'Акт', 'Накладная', 'Договор'];

  return <Select items={items} value={value} onValueChange={setValue} width={250} />;
};
ExampleWidth.storyName = 'Фиксированная ширина';

/** Проп `maxWidth` задаёт максимальную ширину кнопки, не влияет на ширину списка. */
export const ExampleMaxWidth: Story = () => {
  const [value, setValue] = React.useState();

  const items = ['Счёт-фактура', 'Акт', 'Накладная', 'Договор', 'Универсальный передаточный документ (УПД)'];

  return <Select items={items} value={value} onValueChange={setValue} maxWidth={150} />;
};
ExampleMaxWidth.storyName = 'Максимальная ширина';

/** Проп `maxMenuHeight` задаёт максимальную высоту списка. */
export const ExampleMaxMenuHeight: Story = () => {
  const [value, setValue] = React.useState();

  const items = ['Счёт-фактура', 'Акт', 'Накладная', 'Договор'];

  return <Select items={items} value={value} onValueChange={setValue} maxMenuHeight={100} />;
};
ExampleMaxMenuHeight.storyName = 'Высота списка';

/** Проп `menuWidth` задаёт фиксированную ширину списка, не влияет на ширину кнопки. */
export const ExampleMenuWidth: Story = () => {
  const [value, setValue] = React.useState();

  const items = ['Счёт-фактура', 'Акт', 'Накладная', 'Договор'];

  return <Select items={items} value={value} onValueChange={setValue} menuWidth={180} />;
};
ExampleMenuWidth.storyName = 'Фиксированная ширина списка';

/** Добавить визуальный разделитель между значениями можно через константу `Select.SEP` — рендерится как линия. Размещать разделитель можно в любом месте передаваемого массива. */
export const ExampleSelectSep: Story = () => {
  const [value, setValue] = React.useState();

  const items = ['Любой', Select.SEP, 'Счёт-фактура', 'Акт', 'Накладная', 'Договор'];

  return <Select items={items} value={value} onValueChange={setValue} />;
};
ExampleSelectSep.storyName = 'Разделитель между значениями';

/** Проп `menuPos` фиксирует расположение выпадающего списка. Он может быть под кнопкой — `"bottom"`, над ней — `"top"` или посередине — `"middle"`.
 *
 * По умолчанию список отображается под кнопкой, а если не хватает места, то динамически меняет расположение и показывается над кнопкой.
 */
export const ExampleMenuPos: Story = () => {
  const [value, setValue] = React.useState();

  const items = ['Счёт-фактура', 'Акт', 'Накладная', 'Договор'];

  return <Select items={items} value={value} onValueChange={setValue} menuPos={'top'} />;
};
ExampleMenuPos.storyName = 'Расположение списка';

/** Проп `menuAlign` выравнивает список. Список может быть прикреплен к левому краю кнопки — "left" или к правому — "right".  */
export const ExampleMenuAlign: Story = () => {
  const [value, setValue] = React.useState();

  const items = ['Счёт-фактура', 'Акт', 'Накладная', 'Договор'];

  return (
    <Gapped vertical>
      <Gapped>
        <Select items={items} value={value} onValueChange={setValue} menuAlign={'left'} menuWidth={120} />
        <span>"left"</span>
      </Gapped>
      <Gapped>
        <Select items={items} value={value} onValueChange={setValue} menuAlign={'right'} menuWidth={120} />
        <span>"right"</span>
      </Gapped>
    </Gapped>
  );
};
ExampleMenuAlign.storyName = 'Выравнивание списка';

/** Проп `positions` задаёт расположение и выравнивание списка относительно кнопки, можно передать одно значение или список значений — если во всех позициях список выходит за пределы `viewport`, будет использована первая из этого списка.
 *
 * Возможные значения: `"top left"`, `"top center"`, `"top right"`, `"right top"`, `"right middle"`, `"right bottom"`, `"bottom left"`, `"bottom center"`, `"bottom right"`, `"left top"`, `"left middle"`, `"left bottom"`. */
export const ExamplePositions: Story = () => {
  const [value, setValue] = React.useState();

  const items = ['Счёт-фактура', 'Акт', 'Накладная', 'Договор'];

  return <Select items={items} value={value} onValueChange={setValue} positions={['right middle']} />;
};
ExamplePositions.storyName = 'Список позиций';

/** Проп `menuOffset` смещает список относительно кнопки по горизонтали. При 0 — смещения нет, при положительном значении — список сдвигается влево, при отрицательном — вправо. */
export const ExampleMenuOffset: Story = () => {
  const [value, setValue] = React.useState();

  const items = ['Счёт-фактура', 'Акт', 'Накладная', 'Договор'];

  return <Select items={items} value={value} onValueChange={setValue} menuOffset={20} />;
};
ExampleMenuOffset.storyName = 'Смещение списка по горизонтали';

/** Проп `placeholder` переопределяет текст, который отображается если не введено никакое значение. */
export const ExamplePlaceholder: Story = () => {
  const [value, setValue] = React.useState();

  const items = ['Счёт-фактура', 'Акт', 'Накладная', 'Договор'];

  return <Select items={items} value={value} onValueChange={setValue} placeholder="Выберите" />;
};
ExamplePlaceholder.storyName = 'Плейсхолдер';

/** Проп `search` отображает строчку поиска в списке значений. Дополнительно через проп `filterItem` можно фильтровать элементы по заданному паттерну. */
export const ExampleSearch: Story = () => {
  const [value, setValue] = React.useState<string>();

  const items = ['Счёт-фактура', 'Акт', 'Накладная', 'Договор'];

  const filterItem = (value: string | undefined, item: string, pattern: string) => {
    console.log({ value, pattern, item });
    if (!pattern) {
      return true;
    }

    const normalize = (s: string) =>
      String(s)
        .toLowerCase()
        .replace(/ё/g, 'е')
        .replace(/[^а-яa-z0-9]+/g, '');

    return normalize(item).includes(normalize(pattern));
  };

  return <Select items={items} value={value} onValueChange={setValue} search filterItem={filterItem} />;
};
ExampleSearch.storyName = 'Строка поиска';

/** Очистить выбранное значение в раскрывающемся списке можно только с помощью `null`. */
export const ExampleClear: Story = () => {
  const [value, setValue] = React.useState<string | null>();

  const items = ['Счёт-фактура', 'Акт', 'Накладная', 'Договор'];

  return (
    <Gapped>
      <Select items={items} value={value} onValueChange={setValue} />
      <Button onClick={() => setValue(null)}>Передать null</Button>
    </Gapped>
  );
};
ExampleClear.storyName = 'Очистка значения';

/** Проп `isNotSelectable` для Select.Item запрещает выделение и выбор этого значения из списка. */
export const ExampleIsNotSelectable: Story = () => {
  const [value, setValue] = React.useState();

  const items = [
    <Select.Item isNotSelectable>Невыбираемое значение</Select.Item>,
    'Счёт-фактура',
    'Акт',
    'Накладная',
    'Договор',
  ];

  return <Select items={items} value={value} onValueChange={setValue} />;
};
ExampleIsNotSelectable.storyName = 'Запрет выделения и выбора';

/** Проп `disabled` блокирует раскрывающийся список. */
export const ExampleDisabled: Story = () => {
  const [value, setValue] = React.useState();

  const items = ['Любой', 'Счёт-фактура', 'Акт', 'Накладная', 'Договор'];

  return <Select items={items} value={value} onValueChange={setValue} disabled />;
};
ExampleDisabled.storyName = 'Состояние блокировки';

/** Проп `error` переводит раскрывающийся список в состояние ошибки. */
export const ExampleError: Story = () => {
  const [value, setValue] = React.useState();

  const items = ['Любой', 'Счёт-фактура', 'Акт', 'Накладная', 'Договор'];

  return <Select items={items} value={value} onValueChange={setValue} error />;
};
ExampleError.storyName = 'Состояние ошибки';

/**
 * Если элемент в пропе `items` имеет кастомный тип, то компоненту нужны подсказки по работе с ним.
 * */
export const ExampleCustomValue: Story = () => {
  const [value, setValue] = React.useState<{ color: string; hex: string }>({
    color: 'Красный',
    hex: '#f00',
  });

  return (
    <Select<{ color: string; hex: string }>
      items={[
        { color: 'Красный', hex: '#f00' },
        { color: 'Синий', hex: '#00f' },
        { color: 'Зелёный', hex: '#0f0' },
      ]}
      value={value}
      onValueChange={setValue}
      areValuesEqual={(a, b) => a.hex === b.hex}
      renderValue={(item) => item.color}
      renderItem={(item) => (
        <>
          {item.color} <span style={{ color: item.hex }}>◼</span>
        </>
      )}
    />
  );
};
ExampleCustomValue.storyName = 'Переопределение `renderValue`, `renderItem` и `areValuesEqual`';

/** Проп `_renderButton` позволяет задать функцию отрисовки кнопки. В примере заданы параметры для отображения кнопки-ссылки с иконкой.  */
export const ExampleRenderButton: Story = () => {
  const [value, setValue] = React.useState<string>();

  const items = ['Любой', 'Счёт-фактура', 'Акт', 'Накладная', 'Договор'];

  const renderLinkButton = (params: ButtonParams) => {
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
ExampleRenderButton.storyName = 'Кастомизация кнопки';

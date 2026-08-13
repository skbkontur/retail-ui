import { IconTimeClockStopwatchLight16 } from '@skbkontur/icons/IconTimeClockStopwatchLight16';
import React from 'react';

import type { Meta, Story } from '../../../typings/stories.js';
import { Gapped } from '../../Gapped/index.js';
import type { TimeItem } from '../helpers/TimePicker.shared.js';
import { TimePicker } from '../TimePicker.js';

/**
 * Типы, раскрытые для таблицы пропов: в коде это дженерики `TimePickerSource<T>` и `T`,
 * которые сами по себе не рассказывают, что можно передать.
 * Элементы источника прячутся за `Item`, иначе сигнатура `source` повторяет их трижды.
 */
const TIME_ITEM_TYPE = "'09:00' | { value: '09:00', label?, disabled?, ...ownFields }";
const MENU_ELEMENT_TYPE = '<MenuHeader /> | <MenuItem /> | <MenuSeparator /> | <MenuFooter />';

const meta: Meta = {
  title: 'Input data/TimePicker',
  component: TimePicker,
  parameters: { creevey: { skip: true } },
  argTypes: {
    source: {
      table: {
        type: {
          summary: [
            'Item[] | ((query: string) => Item[] | Promise<Item[]>),',
            `где Item = ${TIME_ITEM_TYPE} | ${MENU_ELEMENT_TYPE}`,
          ].join(' '),
        },
      },
    },
    renderItem: {
      table: { type: { summary: `(item: ${TIME_ITEM_TYPE}, state: MenuItemState) => ReactNode` } },
    },
  },
};

export default meta;

export const ExampleBasic: Story = () => {
  const [time, setTime] = React.useState('');

  const items: TimeItem[] = [{ value: '08:00' }, { value: '09:00' }, { value: '10:00' }, { value: '11:00' }];

  return <TimePicker value={time} source={items} onValueChange={setTime} />;
};

/** Проп `size` задаёт размер поля. */
export const ExampleSize: Story = () => {
  const [valueL, setValueL] = React.useState('');
  const [valueM, setValueM] = React.useState('');
  const [valueS, setValueS] = React.useState('');

  return (
    <Gapped vertical gap={16}>
      <TimePicker size={'large'} value={valueL} onValueChange={setValueL} />
      <TimePicker size={'medium'} value={valueM} onValueChange={setValueM} />
      <TimePicker size={'small'} value={valueS} onValueChange={setValueS} />
    </Gapped>
  );
};
ExampleSize.storyName = 'Размер';

/** Проп `format` задаёт строковую маску времени: `HH:mm` или `HH:mm:ss`. */
export const ExampleFormats: Story = () => {
  const [valueHm, setValueHm] = React.useState('');
  const [valueHms, setValueHms] = React.useState('');

  return (
    <Gapped vertical gap={24}>
      Формат 'HH:mm'
      <TimePicker value={valueHm} onValueChange={setValueHm} />
      Формат 'HH:mm:ss'
      <TimePicker format={'HH:mm:ss'} value={valueHms} onValueChange={setValueHms} />
    </Gapped>
  );
};
ExampleFormats.storyName = 'Форматы';

/** Проп `source` задаёт элементы выпадающего меню: массив либо функцию запроса.
 * Элементы можно задать строками со временем или объектами `{ value, label?, disabled? }`
 * с любыми дополнительными полями — в `onValueChange` приходит только время выбранного элемента.
 */
export const ExampleSource: Story = () => {
  const [time, setTime] = React.useState('');

  const items: TimeItem[] = [
    { value: '08:00' },
    { value: '09:00' },
    { value: '10:00' },
    { value: '11:00' },
    { value: '12:00' },
    { value: '13:00' },
    { value: '14:00' },
    { value: '15:00' },
    { value: '16:00' },
    { value: '17:00' },
    { value: '18:00' },
    { value: '19:00' },
    { value: '20:00' },
  ];

  return <TimePicker source={items} value={time} onValueChange={setTime} />;
};
ExampleSource.storyName = 'Выпадающее меню';

/** Элементы `source` могут содержать дополнительную подпись в поле `label`. */
export const ExampleSourceWithInfo: Story = () => {
  const [time, setTime] = React.useState('');

  const items: TimeItem[] = [
    { value: '08:00', label: '30 мин' },
    { value: '08:30', label: '1 ч' },
    { value: '09:00', label: '1 ч 30 мин' },
    { value: '09:30', label: '2 ч' },
    { value: '10:00', label: '2 ч 30 мин' },
    { value: '10:30', label: '3 ч' },
    { value: '11:00', label: '3 ч 30 мин' },
    { value: '11:30', label: '4 ч' },
    { value: '12:00', label: '4 ч 30 мин' },
    { value: '12:30', label: '5 ч' },
    { value: '13:00', label: '5 ч 30 мин' },
    { value: '13:30', label: '6 ч' },
    { value: '14:00', label: '6 ч 30 мин' },
    { value: '14:30', label: '7 ч' },
    { value: '15:00', label: '7 ч 30 мин' },
    { value: '15:30', label: '8 ч' },
    { value: '16:00', label: '8 ч 30 мин' },
    { value: '16:30', label: '9 ч' },
    { value: '17:00', label: '9 ч 30 мин' },
    { value: '17:30', label: '10 ч' },
    { value: '18:00', label: '10 ч 30 мин' },
    { value: '18:30', label: '11 ч' },
    { value: '19:00', label: '11 ч 30 мин' },
    { value: '19:30', label: '12 ч' },
    { value: '20:00', label: '12 ч 30 мин' },
  ];

  return <TimePicker source={items} value={time} onValueChange={setTime} />;
};
ExampleSourceWithInfo.storyName = 'Элементы с дополнительной информацией';

/** Элемент из `source` можно сделать недоступным через `disabled`. */
export const ExampleSourceWithDisabled: Story = () => {
  const [time, setTime] = React.useState('');

  const items: TimeItem[] = [
    { value: '08:00' },
    { value: '09:00' },
    { value: '10:00', disabled: true },
    { value: '11:00' },
    { value: '12:00' },
    { value: '13:00', disabled: true },
    { value: '14:00' },
    { value: '15:00' },
    { value: '16:00', disabled: true },
    { value: '17:00' },
    { value: '18:00' },
    { value: '19:00', disabled: true },
    { value: '20:00' },
  ];

  return <TimePicker source={items} value={time} onValueChange={setTime} />;
};
ExampleSourceWithDisabled.storyName = 'Заблокированные значения';

/** Пропы `minTime` и `maxTime` ограничивают только доступность элементов в выпадающем меню.
 * Ручной ввод они не ограничивают — его можно проверить через `TimePicker.validate`.
 */
export const ExampleSourceWithMinMax: Story = () => {
  const [time, setTime] = React.useState('');

  const items: TimeItem[] = [
    { value: '08:00' },
    { value: '09:00' },
    { value: '10:00' },
    { value: '11:00' },
    { value: '12:00' },
    { value: '13:00' },
    { value: '14:00' },
    { value: '15:00' },
    { value: '16:00' },
    { value: '17:00' },
    { value: '18:00' },
    { value: '19:00' },
    { value: '20:00' },
  ];

  return (
    <Gapped vertical gap={24}>
      Минимальное время 12:00, максимальное 16:00
      <TimePicker source={items} minTime={'12:00'} maxTime={'16:00'} value={time} onValueChange={setTime} />
    </Gapped>
  );
};
ExampleSourceWithMinMax.storyName = 'Ограничение минимального и максимального значений';

/** По умолчанию `TimePicker` показывает иконку часов справа.
 * Через `rightIcon` её можно заменить или скрыть, передав `null`.
 * Через `suffix` можно добавить дополнительный контент справа от значения, например часовой пояс.
 */
export const ExampleRightIconAndSuffix: Story = () => {
  const [withoutIconValue, setWithoutIconValue] = React.useState('12:30');
  const [withSuffixValue, setWithSuffixValue] = React.useState('12:30');
  const [withCustomIconValue, setWithCustomIconValue] = React.useState('12:30');
  const [withCustomIconAndSuffixValue, setWithCustomIconAndSuffixValue] = React.useState('12:30');

  return (
    <Gapped vertical gap={24}>
      Без иконки
      <TimePicker rightIcon={null} value={withoutIconValue} onValueChange={setWithoutIconValue} />С кастомной иконкой
      <TimePicker
        rightIcon={<IconTimeClockStopwatchLight16 />}
        value={withCustomIconValue}
        onValueChange={setWithCustomIconValue}
      />
      С suffix
      <TimePicker rightIcon={null} suffix={'МСК'} value={withSuffixValue} onValueChange={setWithSuffixValue} />С
      кастомной иконкой и suffix
      <TimePicker
        rightIcon={<IconTimeClockStopwatchLight16 />}
        suffix={'МСК'}
        value={withCustomIconAndSuffixValue}
        onValueChange={setWithCustomIconAndSuffixValue}
      />
    </Gapped>
  );
};
ExampleRightIconAndSuffix.storyName = 'Пропы rightIcon и suffix';

/** Проп `error` переводит поле в состояние ошибки. */
export const ExampleError: Story = () => {
  const [value, setValue] = React.useState('12:30');

  return <TimePicker error value={value} onValueChange={setValue} />;
};
ExampleError.storyName = 'Состояние ошибки';

/** Проп `warning` переводит поле в состояние предупреждения. */
export const ExampleWarning: Story = () => {
  const [value, setValue] = React.useState('12:30');

  return <TimePicker warning value={value} onValueChange={setValue} />;
};
ExampleWarning.storyName = 'Состояние предупреждения';

/** Проп `useMobileNativeTimePicker` включает нативный редактор времени в мобильной вёрстке.
 * Вёрстка определяется медиазапросом темы, поэтому нативный пикер включится и в узком окне десктопного браузера.
 */
export const ExampleMobileNative: Story = () => {
  const [value, setValue] = React.useState('');

  return <TimePicker useMobileNativeTimePicker value={value} onValueChange={setValue} />;
};
ExampleMobileNative.storyName = 'Нативный редактор на мобильных устройствах';

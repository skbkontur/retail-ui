import { IconTimeClockStopwatchLight16 } from '@skbkontur/icons/IconTimeClockStopwatchLight16';
import { IconTimeClockStopwatchLight20 } from '@skbkontur/icons/IconTimeClockStopwatchLight20';
import { IconTimeClockStopwatchRegular24 } from '@skbkontur/icons/IconTimeClockStopwatchRegular24';
import React, { type JSX } from 'react';

import { iconSizer } from '../../../internal/icons2022/iconSizer.js';
import type { Meta, Story } from '../../../typings/stories.js';
import { Button } from '../../Button/index.js';
import { DatePicker } from '../../DatePicker/index.js';
import { Gapped } from '../../Gapped/index.js';
import { Group } from '../../Group/index.js';
import { MenuFooter } from '../../MenuFooter/index.js';
import { MenuHeader } from '../../MenuHeader/index.js';
import { MenuItem } from '../../MenuItem/index.js';
import { MenuSeparator } from '../../MenuSeparator/index.js';
import type { TimeItem, TimePickerExtendedItem } from '../helpers/TimePicker.shared.js';
import type { TimePickerProps, TimePickerRef } from '../TimePicker.js';
import { TimePicker } from '../TimePicker.js';

/**
 * Истории, скриншот которых снимается с раскрытым меню. Меню рисуется в портале,
 * поэтому съёмка по самой истории его не захватывает, а съёмка по всему окну уносит
 * в кадр пустой экран. Контейнер резервирует место под меню, и кадром становится он.
 * Остальные истории снимаются по своему содержимому, оборачивать их незачем.
 */
const STORIES_WITH_MENU = [
  'ItemsWithSeconds',
  'Items',
  'ItemsWithInfo',
  'DisabledItems',
  'ItemsWithMinMax',
  'RenderItem',
  'Loader',
  'InputLoader',
  'ExtendedItems',
];

const meta: Meta = {
  title: 'TimePicker',
  component: TimePicker,
  decorators: [
    (Story: () => JSX.Element, context) =>
      STORIES_WITH_MENU.includes(context.name) ? (
        <div className="timepicker-test-container" style={{ minHeight: 340, minWidth: 320, padding: 4 }}>
          <Story />
        </div>
      ) : (
        <Story />
      ),
  ],
  parameters: {
    creevey: {
      skip: { 'other themes will become deprecated': { in: /^(?!.*(?:2022|Mobile).*)/ } },
    },
  },
};

export default meta;

const ControlledTimePicker = (props: TimePickerProps<TimeItem>) => {
  const [value, setValue] = React.useState(props.value ?? '');

  return <TimePicker {...props} value={value} onValueChange={setValue} />;
};

const renderSizes = (props: TimePickerProps<TimeItem>) => (
  <Gapped gap={24}>
    <ControlledTimePicker {...props} size={'small'} />
    <ControlledTimePicker {...props} size={'medium'} />
    <ControlledTimePicker {...props} size={'large'} />
  </Gapped>
);

export const States: Story = () => (
  <Gapped vertical>
    Состояния
    {renderSizes({})}
    {renderSizes({ value: '12:30' })}
    {renderSizes({ value: '12:30', error: true })}
    {renderSizes({ value: '12:30', warning: true })}
    {renderSizes({ value: '12:30', disabled: true })}
  </Gapped>
);

States.storyName = 'States';

export const Formats: Story = () => (
  <Gapped vertical gap={24}>
    Формат 'HH:mm'
    {renderSizes({ format: 'HH:mm' })}
    Формат 'HH:mm:ss'
    {renderSizes({ format: 'HH:mm:ss' })}
  </Gapped>
);

Formats.storyName = 'Formats';

/** Выпадающее меню в формате `HH:mm:ss`: время элементов приводится к формату поля,
 * поэтому элемент без секунд показывается с нулевыми секундами, а фильтрация идёт и по сегменту секунд.
 */
export const ItemsWithSeconds: Story = () => {
  const items: TimeItem[] = [
    { value: '09:00' },
    { value: '09:00:30' },
    { value: '12:30' },
    { value: '12:30:45', label: 'день' },
    { value: '18:00:15', label: 'вечер' },
  ];

  return (
    <Gapped gap={24}>
      <ControlledTimePicker format={'HH:mm:ss'} source={items} />
      <ControlledTimePicker format={'HH:mm:ss'} source={items} value={'12:30:45'} minTime={'09:00:15'} />
    </Gapped>
  );
};

ItemsWithSeconds.storyName = 'ItemsWithSeconds';

/** Элементов больше, чем помещается в меню, — так виден и скролл списка. */
export const Items: Story = () => {
  const items = [
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
  ];

  return <ControlledTimePicker source={items} />;
};

Items.storyName = 'Items';

export const ItemsWithInfo: Story = () => {
  const items = [
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
  ];

  return <ControlledTimePicker source={items} />;
};

ItemsWithInfo.storyName = 'ItemsWithInfo';

export const DisabledItems: Story = () => {
  const items = [
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
  ];

  return <ControlledTimePicker source={items} />;
};

DisabledItems.storyName = 'DisabledItems';

export const ItemsWithMinMax: Story = () => {
  const items = [
    { value: '10:00' },
    { value: '11:00' },
    { value: '12:00' },
    { value: '13:00' },
    { value: '14:00' },
    { value: '15:00' },
    { value: '16:00' },
    { value: '17:00' },
    { value: '18:00' },
  ];

  return <ControlledTimePicker minTime={'12:00'} maxTime={'16:00'} source={items} />;
};

ItemsWithMinMax.storyName = 'ItemsWithMinMax';

export const RenderItem: Story = () => {
  const [value, setValue] = React.useState('');
  const items = [
    { value: '09:00', availability: 'Свободно' },
    { value: '10:00', availability: 'Занято' },
    { value: '11:00', availability: 'Свободно' },
  ];

  return (
    <TimePicker
      source={items}
      value={value}
      onValueChange={setValue}
      renderItem={(item) => (
        <span>
          {item.value} — {item.availability}
        </span>
      )}
    />
  );
};

RenderItem.storyName = 'RenderItem';

export const Loader: Story = () => {
  const source = () => new Promise<Array<{ value: string }>>(() => undefined);

  return <TimePicker source={source} />;
};

Loader.storyName = 'Loader';

/** Вторая индикация загрузки: элементы уже показаны, а новый запрос ещё выполняется,
 * поэтому крутилка показывается в правой иконке поля, а не в меню.
 */
export const InputLoader: Story = () => {
  const items = [{ value: '09:00' }, { value: '10:00' }, { value: '11:00' }];

  const source = (query: string) => (query ? new Promise<typeof items>(() => undefined) : Promise.resolve(items));

  return <TimePicker source={source} />;
};

InputLoader.storyName = 'InputLoader';

export const ExtendedItems: Story = () => {
  const items: Array<TimePickerExtendedItem<TimeItem>> = [
    <MenuHeader key="header">Рабочее время</MenuHeader>,
    { value: '09:00', label: 'Начало дня' },
    { value: '12:00', label: 'Обед' },
    <MenuSeparator key="separator" />,
    { value: '18:00', label: 'Конец дня' },
    <MenuItem key="settings">Настроить интервалы</MenuItem>,
    <MenuFooter key="footer">Время местное</MenuFooter>,
  ];

  return <ControlledTimePicker source={items} />;
};

ExtendedItems.storyName = 'ExtendedItems';

export const RightIconAndSuffix: Story = () => {
  const CustomTimeIcon = iconSizer(
    {
      small: () => <IconTimeClockStopwatchLight16 />,
      medium: () => <IconTimeClockStopwatchLight20 />,
      large: () => <IconTimeClockStopwatchRegular24 />,
    },
    'CustomTimeIcon',
  );

  return (
    <Gapped vertical gap={24}>
      Без иконки
      {renderSizes({ value: '12:30', rightIcon: null })}С кастомной иконкой
      {renderSizes({ value: '12:30', rightIcon: <CustomTimeIcon /> })}С suffix
      {renderSizes({ value: '12:30', rightIcon: null, suffix: 'МСК' })}С кастомной иконкой и suffix
      {renderSizes({ value: '12:30', rightIcon: <CustomTimeIcon />, suffix: 'МСК' })}
    </Gapped>
  );
};

RightIconAndSuffix.storyName = 'RightIconAndSuffix';

/** Пустое поле занимает столько же места, сколько заполненное:
 * иначе после очистки значения поле с suffix сужалось и снова расширялось при вводе.
 */
export const RightIconAndSuffixEmpty: Story = () => {
  const CustomTimeIcon = iconSizer(
    {
      small: () => <IconTimeClockStopwatchLight16 />,
      medium: () => <IconTimeClockStopwatchLight20 />,
      large: () => <IconTimeClockStopwatchRegular24 />,
    },
    'CustomTimeIcon',
  );

  return (
    <Gapped vertical gap={24}>
      Пустое и заполненное поле с иконкой и suffix
      {renderSizes({ rightIcon: <CustomTimeIcon />, suffix: 'МСК' })}
      {renderSizes({ value: '12:30', rightIcon: <CustomTimeIcon />, suffix: 'МСК' })}
      Формат HH:mm:ss
      {renderSizes({ format: 'HH:mm:ss', rightIcon: <CustomTimeIcon />, suffix: 'МСК' })}
      {renderSizes({ format: 'HH:mm:ss', value: '12:30:45', rightIcon: <CustomTimeIcon />, suffix: 'МСК' })}
    </Gapped>
  );
};

RightIconAndSuffixEmpty.storyName = 'RightIconAndSuffixEmpty';

const mobileItems = [
  { value: '08:00' },
  { value: '09:00' },
  { value: '10:00' },
  { value: '11:00', disabled: true },
  { value: '12:00' },
  { value: '13:00' },
  { value: '14:00' },
  { value: '15:00' },
  { value: '16:00' },
];

export const MobileTimePicker: Story = () => (
  <Gapped vertical gap={24}>
    Мобильный TimePicker с выпадающим списком
    {renderSizes({ source: mobileItems, value: '12:30' })}
  </Gapped>
);

MobileTimePicker.storyName = 'MobileTimePicker';
MobileTimePicker.parameters = {
  viewport: {
    defaultViewport: 'iphone',
  },
};

/** Пустое поле, чтобы в мобильном попапе было видно, как список сужается по вводу. */
export const MobileTimePickerFiltering: Story = () => <ControlledTimePicker source={mobileItems} />;

MobileTimePickerFiltering.storyName = 'MobileTimePickerFiltering';
MobileTimePickerFiltering.parameters = {
  viewport: {
    defaultViewport: 'iphone',
  },
};

/** Мобильный попап у поля с `source`: ввод по самому полю только открывает попап,
 * а время набирается в поле внутри него.
 */
export const MobileTimePickerWithSeconds: Story = () => (
  <ControlledTimePicker format={'HH:mm:ss'} source={mobileItems} />
);

MobileTimePickerWithSeconds.storyName = 'MobileTimePickerWithSeconds';
MobileTimePickerWithSeconds.parameters = {
  viewport: {
    defaultViewport: 'iphone',
  },
};

/** Нативный системный выбор времени в мобильной вёрстке. */
export const MobileNativeTimePicker: Story = () => <ControlledTimePicker useMobileNativeTimePicker />;

MobileNativeTimePicker.storyName = 'MobileNativeTimePicker';
MobileNativeTimePicker.parameters = {
  viewport: {
    defaultViewport: 'iphone',
  },
};

/** Проп `width` задаёт ширину поля. */
export const Width: Story = () => (
  <Gapped vertical gap={24}>
    Ширина 100%
    <div style={{ width: 240 }}>
      <ControlledTimePicker width={'100%'} value={'12:30'} />
    </div>
    Ширина 200px
    <ControlledTimePicker width={200} value={'12:30'} />
  </Gapped>
);

Width.storyName = 'Width';

/** Заблокированное поле с выпадающим меню: заполненное и пустое. */
export const DisabledWithItems: Story = () => {
  const items = [{ value: '09:00', label: 'Начало дня' }, { value: '10:00' }];

  return (
    <Gapped vertical gap={16}>
      <TimePicker disabled value={'12:30'} source={items} />
      <TimePicker disabled value={''} source={items} />
    </Gapped>
  );
};

DisabledWithItems.storyName = 'DisabledWithItems';

/** Проп `autoFocus` устанавливает фокус на поле после загрузки страницы. */
export const AutoFocus: Story = () => <ControlledTimePicker autoFocus />;

AutoFocus.storyName = 'AutoFocus';

/** Элементы можно задать строками со временем.
 * Незаполненное время дополняется: `9:5` покажется как `09:05`.
 */
export const SourceStrings: Story = () => {
  const [value, setValue] = React.useState('');

  return (
    <Gapped vertical gap={16}>
      <TimePicker source={['09:00', '10:30', '12:00', '15:45', '9:5']} value={value} onValueChange={setValue} />
      <span>Значение: {value ? `"${value}"` : '—'}</span>
    </Gapped>
  );
};

SourceStrings.storyName = 'SourceStrings';

/** Источник работает в одном из двух режимов: элементы либо строки, либо объекты.
 * Смешивать строки и объекты в одном массиве нельзя — это ошибка типов.
 * Компоненты меню можно добавлять к любому режиму, на тип элемента они не влияют.
 * Форма элементов видна только внутри `source` и `renderItem`: значение поля в обоих режимах — время строкой.
 */
export const SourceModes: Story = () => {
  const [timeFromStrings, setTimeFromStrings] = React.useState('');
  const [timeFromItems, setTimeFromItems] = React.useState('');

  const times: Array<TimePickerExtendedItem<string>> = [
    <MenuHeader key="header">Рабочее время</MenuHeader>,
    '09:00',
    '12:00',
    '18:00',
  ];

  const items: Array<TimePickerExtendedItem<TimeItem>> = [
    <MenuHeader key="header">Рабочее время</MenuHeader>,
    { value: '09:00', label: 'начало' },
    { value: '12:00', label: 'обед' },
    { value: '18:00', label: 'конец' },
  ];

  return (
    <Gapped vertical gap={16}>
      <Gapped gap={8}>
        <TimePicker width={100} source={times} value={timeFromStrings} onValueChange={setTimeFromStrings} />
        <span style={{ fontFamily: 'monospace' }}>
          {timeFromStrings === '' ? '—' : JSON.stringify(timeFromStrings)}
        </span>
      </Gapped>
      <Gapped gap={8}>
        <TimePicker width={100} source={items} value={timeFromItems} onValueChange={setTimeFromItems} />
        <span style={{ fontFamily: 'monospace' }}>{timeFromItems === '' ? '—' : JSON.stringify(timeFromItems)}</span>
      </Gapped>
    </Gapped>
  );
};

SourceModes.storyName = 'SourceModes';

/** Источник задаётся четырьмя способами, и все они ведут себя одинаково:
 * компонент сам фильтрует полученные элементы по вводу, а наружу отдаёт время выбранного элемента.
 *
 * - массив строк;
 * - массив объектов;
 * - функция, возвращающая строки;
 * - функция, возвращающая объекты.
 *
 * Функция получает текущий запрос и может вернуть элементы синхронно, как здесь,
 * или отдать `Promise` — например, сходив на сервер.
 */
export const SourceShapes: Story = () => {
  interface Slot extends TimeItem {
    slotId: number;
  }

  const times = ['09:00', '12:00', '18:00'];
  const slots: Slot[] = [
    { value: '09:00', label: 'утро', slotId: 1 },
    { value: '12:00', label: 'день', slotId: 2 },
    { value: '18:00', label: 'вечер', slotId: 3 },
  ];

  const [fromStringArray, setFromStringArray] = React.useState('');
  const [fromItemArray, setFromItemArray] = React.useState('');
  const [fromStringFunction, setFromStringFunction] = React.useState('');
  const [fromItemFunction, setFromItemFunction] = React.useState('');

  const renderResult = (time: string) => (
    <span style={{ fontFamily: 'monospace' }}>{time === '' ? '—' : JSON.stringify(time)}</span>
  );

  return (
    <Gapped vertical gap={16}>
      <Gapped gap={8}>
        <TimePicker width={100} source={times} value={fromStringArray} onValueChange={setFromStringArray} />
        <span>массив строк: {renderResult(fromStringArray)}</span>
      </Gapped>
      <Gapped gap={8}>
        <TimePicker width={100} source={slots} value={fromItemArray} onValueChange={setFromItemArray} />
        <span>массив объектов: {renderResult(fromItemArray)}</span>
      </Gapped>
      <Gapped gap={8}>
        <TimePicker width={100} source={() => times} value={fromStringFunction} onValueChange={setFromStringFunction} />
        <span>функция со строками: {renderResult(fromStringFunction)}</span>
      </Gapped>
      <Gapped gap={8}>
        <TimePicker width={100} source={() => slots} value={fromItemFunction} onValueChange={setFromItemFunction} />
        <span>функция с объектами: {renderResult(fromItemFunction)}</span>
      </Gapped>
    </Gapped>
  );
};

SourceShapes.storyName = 'SourceShapes';

/** Элементы фильтруются по мере ввода: введённые цифры сегмента сравниваются
 * с началом соответствующего сегмента элемента.
 * Например, ввод `1` оставит элементы с часами `10`–`19`, а `12:3` — элементы `12:30`–`12:39`.
 * При повторном открытии меню снова показываются все элементы.
 */
export const SourceFiltering: Story = () => {
  const items: TimeItem[] = [
    { value: '09:00' },
    { value: '09:30' },
    { value: '10:00' },
    { value: '10:30' },
    { value: '11:00' },
    { value: '12:00' },
    { value: '12:30' },
    { value: '12:35' },
    { value: '13:00' },
    { value: '18:00' },
  ];

  return <ControlledTimePicker source={items} />;
};

SourceFiltering.storyName = 'SourceFiltering';

/** Функция в `source` получает текущий запрос и возвращает элементы массивом или `Promise`.
 * К полученному ответу компонент применяет ту же фильтрацию, что и к массиву.
 * Пока Promise не разрешился и элементов ещё нет, в меню показывается спиннер загрузки.
 */
export const SourceAsync: Story = () => {
  const [time, setTime] = React.useState('');

  const deliverySlots: TimeItem[] = [
    { value: '09:00', label: 'бесплатно' },
    { value: '11:00', label: 'бесплатно' },
    { value: '13:00', label: '300 ₽' },
    { value: '15:00', label: '300 ₽' },
    { value: '18:00', label: '500 ₽' },
  ];

  const source = () =>
    new Promise<typeof deliverySlots>((resolve) => {
      setTimeout(() => resolve(deliverySlots), 300);
    });

  return <TimePicker source={source} value={time} onValueChange={setTime} />;
};

SourceAsync.storyName = 'SourceAsync';

/** Запрос собирается по введённым цифрам сегментов с сохранением их позиций: `12`, `12:3`,
 * а если заполнены только минуты — `:30`. Поэтому сравнивать запрос с временем элемента
 * нужно посегментно, а не как две строки подряд.
 * К полученному ответу компонент применяет ту же посегментную фильтрацию,
 * поэтому серверная фильтрация её только дополняет.
 */
export const SourceServerFiltering: Story = () => {
  const allSlots: TimeItem[] = [
    { value: '09:00', label: 'свободно' },
    { value: '09:30', label: 'свободно' },
    { value: '12:00', label: 'свободно' },
    { value: '12:30', label: 'мало мест' },
    { value: '18:00', label: 'свободно' },
  ];

  const [time, setTime] = React.useState('');
  const [lastQuery, setLastQuery] = React.useState<string | null>(null);

  const matchesQuery = (value: string, query: string) =>
    query.split(':').every((querySegment, index) => !querySegment || value.split(':')[index]?.startsWith(querySegment));

  const fetchSlots = (query: string) =>
    new Promise<typeof allSlots>((resolve) => {
      setTimeout(() => {
        setLastQuery(query);
        resolve(allSlots.filter((slot) => matchesQuery(slot.value, query)));
      }, 400);
    });

  return (
    <Gapped vertical gap={16}>
      <TimePicker source={fetchSlots} value={time} onValueChange={setTime} />
      <span>Запрос на сервер: {lastQuery === null ? '—' : `"${lastQuery}"`}</span>
    </Gapped>
  );
};

SourceServerFiltering.storyName = 'SourceServerFiltering';

/** Если Promise отклонён или функция-`source` выбросила исключение синхронно,
 * компонент скрывает индикатор загрузки и показывает в меню ошибку с кнопкой повтора запроса.
 * Здесь первый запрос всегда падает, а повторный — успешен.
 */
export const SourceFailure: Story = () => {
  const items: TimeItem[] = [{ value: '09:00' }, { value: '12:00' }, { value: '18:00' }];
  const attemptRef = React.useRef(0);

  const source = () => {
    attemptRef.current += 1;

    return attemptRef.current === 1 ? Promise.reject(new Error('Нет соединения')) : Promise.resolve<TimeItem[]>(items);
  };

  return <ControlledTimePicker source={source} />;
};

SourceFailure.storyName = 'SourceFailure';

/** Значение поля — всегда время строкой, элементы `source` наружу не приходят.
 * Если продукту нужен сам элемент со всеми бизнес-полями, он находит его в `source` по времени.
 * Времени, введённого вручную, в источнике может не оказаться: этот случай продукт разбирает сам.
 */
export const SelectedItem: Story = () => {
  interface DeliverySlot extends TimeItem {
    slotId: number;
    price: string;
  }

  const deliverySlots: DeliverySlot[] = [
    { value: '09:00', label: 'бесплатно', slotId: 1, price: '0 ₽' },
    { value: '13:00', label: '300 ₽', slotId: 2, price: '300 ₽' },
    { value: '18:00', label: '500 ₽', slotId: 3, price: '500 ₽' },
  ];

  const [time, setTime] = React.useState('');
  const selectedSlot = deliverySlots.find((slot) => slot.value === time);

  const renderSlotInfo = () => {
    if (time === '') {
      return 'Время не выбрано';
    }

    if (!selectedSlot) {
      return `Время ${time} введено вручную`;
    }

    return `Выбран слот №${selectedSlot.slotId}, доставка ${selectedSlot.price}`;
  };

  return (
    <Gapped vertical gap={16}>
      <TimePicker source={deliverySlots} value={time} onValueChange={setTime} />
      <span>{renderSlotInfo()}</span>
    </Gapped>
  );
};

SelectedItem.storyName = 'SelectedItem';

/** Времена в меню можно разложить по разделам: `MenuItem` работает как быстрое действие,
 * а `MenuSeparator` отбивает части списка друг от друга — разделителей может быть сколько угодно.
 *
 * `MenuItem` — полноценный пункт меню: до него доходит выделение стрелками, `Enter` вызывает его `onClick`,
 * а меню после нажатия остаётся открытым, чтобы пользователь видел результат.
 * В фильтрации по вводу компоненты меню не участвуют: как только под запрос не подходит ни одно время,
 * меню закрывается целиком.
 */
export const SourceSections: Story = () => {
  const [time, setTime] = React.useState('');

  const items: Array<TimePickerExtendedItem<TimeItem>> = [
    <MenuItem key="morning" onClick={() => setTime('09:00')}>
      Утро
    </MenuItem>,
    <MenuItem key="afternoon" onClick={() => setTime('13:00')}>
      День
    </MenuItem>,
    <MenuItem key="evening" onClick={() => setTime('19:00')}>
      Вечер
    </MenuItem>,
    <MenuSeparator key="separator-morning" />,
    { value: '08:00' },
    { value: '09:00' },
    { value: '10:00' },
    <MenuSeparator key="separator-afternoon" />,
    { value: '13:00' },
    { value: '14:00' },
    <MenuSeparator key="separator-evening" />,
    { value: '19:00' },
    { value: '20:00' },
  ];

  return (
    <Gapped vertical gap={16}>
      <TimePicker source={items} value={time} onValueChange={setTime} />
      <span>Значение: {time ? `"${time}"` : '—'}</span>
    </Gapped>
  );
};

SourceSections.storyName = 'SourceSections';

/** Пропы `menuPos`, `menuAlign` и `menuWidth` управляют выпадающим меню:
 * расположением над или под полем, выравниванием и шириной.
 */
export const Menu: Story = () => {
  const items: TimeItem[] = [
    { value: '09:00', label: 'Начало дня' },
    { value: '12:00', label: 'Обед' },
    { value: '18:00', label: 'Конец дня' },
  ];

  return (
    <Gapped vertical gap={24}>
      <div style={{ marginTop: 160 }}>Меню сверху</div>
      <ControlledTimePicker source={items} menuPos={'top'} />
      Меню по правому краю поля
      <ControlledTimePicker source={items} menuAlign={'right'} />
      Ширина меню 320px
      <ControlledTimePicker source={items} menuWidth={320} />
    </Gapped>
  );
};

Menu.storyName = 'Menu';

/** Проп `onUnexpectedInput` вызывается, когда пользователь ввёл или вставил значение, которое не может быть временем:
 * нажал букву или знак, ввёл цифру, недопустимую для текущего сегмента, либо вставил из буфера что-то кроме времени.
 * Первым аргументом приходит сам некорректный ввод, вторым — метод вспыхивания рамки поля.
 * Если обработчик не задан, поле вспыхивает само.
 */
export const UnexpectedInput: Story = () => {
  const [value, setValue] = React.useState('');
  const [hint, setHint] = React.useState('');

  return (
    <Gapped vertical gap={16}>
      Попробуйте ввести букву, вставить произвольный текст или набрать `2` и `5` в часах
      <TimePicker
        value={value}
        onValueChange={setValue}
        onUnexpectedInput={(unexpectedValue, blink) => {
          setHint(`Так время не задать: «${unexpectedValue}»`);
          blink();
        }}
        onFocus={() => setHint('')}
      />
      <span>{hint || 'Введите время'}</span>
    </Gapped>
  );
};

UnexpectedInput.storyName = 'UnexpectedInput';

/** Обработчик `onUnexpectedInput` может подставить значение вместо некорректного ввода:
 * возвращённое время коммитится и приходит в `onValueChange`, `null` очищает поле,
 * а `undefined` оставляет значение прежним — как будто обработчик ничего не вернул.
 *
 * Так продукт разбирает вставку в собственном формате, которую компонент временем не считает.
 * В примере понимаются «в 13:45» и «обед», а на дату вроде «2026-08-01» поле вспыхивает.
 * Вставку из цифр и разделителей — «13:45», «13ч45» — компонент разбирает сам,
 * и обработчик для неё не вызывается.
 */
export const UnexpectedInputReturn: Story = () => {
  const [value, setValue] = React.useState('');
  const [hint, setHint] = React.useState('');

  const parseOwnFormat = (unexpectedValue: string) => {
    const text = unexpectedValue.trim().toLowerCase();

    if (text === 'обед') {
      return '13:00';
    }

    const [, hours, minutes] = /^\D*(\d{1,2})\D{1,3}(\d{1,2})\D*$/.exec(text) ?? [];

    return hours && minutes ? `${hours}:${minutes}` : undefined;
  };

  return (
    <Gapped vertical gap={16}>
      Вставьте «в 13:45», «обед» или «2026-08-01»
      <TimePicker
        value={value}
        onValueChange={setValue}
        onUnexpectedInput={(unexpectedValue, blink) => {
          const parsedValue = parseOwnFormat(unexpectedValue);

          if (parsedValue === undefined) {
            setHint(`Не удалось разобрать «${unexpectedValue}»`);
            blink();
            return undefined;
          }

          setHint(`Разобрали «${unexpectedValue}»`);
          return parsedValue;
        }}
        onFocus={() => setHint('')}
      />
      <span>{hint || 'Значение появится в поле, если удалось разобрать вставку'}</span>
    </Gapped>
  );
};

UnexpectedInputReturn.storyName = 'UnexpectedInputReturn';

/** Проп `onInputValueChange` вызывается в процессе ввода и получает частично нормализованное значение:
 * заполненные сегменты дополняются до двух цифр, а незаполненный хвост отбрасывается.
 * В отличие от `onValueChange`, значение может не соответствовать полной форме `HH:mm[:ss]`.
 */
export const InputValueChange: Story = () => {
  const [value, setValue] = React.useState('');
  const [inputValue, setInputValue] = React.useState('');

  return (
    <Gapped vertical gap={16}>
      <TimePicker value={value} onValueChange={setValue} onInputValueChange={setInputValue} />
      <span>onInputValueChange: {inputValue || '—'}</span>
      <span>onValueChange: {value || '—'}</span>
    </Gapped>
  );
};

InputValueChange.storyName = 'InputValueChange';

/** Компонент прокидывает события `onFocus`, `onBlur`, `onClick`, `onKeyDown` и `onPaste`.
 * Ввод с клавиатуры и вставка обрабатываются компонентом, а обработчики вызываются до этого:
 * если вызвать в них `event.preventDefault()`, компонент не изменит значение.
 */
export const Events: Story = () => {
  const [value, setValue] = React.useState('');
  const [events, setEvents] = React.useState<string[]>([]);

  const logEvent = (name: string) => setEvents((current) => [name, ...current].slice(0, 6));

  return (
    <Gapped vertical gap={16}>
      <TimePicker
        value={value}
        onValueChange={setValue}
        onFocus={() => logEvent('onFocus')}
        onBlur={() => logEvent('onBlur')}
        onClick={() => logEvent('onClick')}
        onKeyDown={(event) => logEvent(`onKeyDown: ${event.key}`)}
        onPaste={() => logEvent('onPaste')}
      />
      <span>{events.join(' · ') || 'Событий пока не было'}</span>
    </Gapped>
  );
};

Events.storyName = 'Events';

/** Пропы `id`, `aria-label` и `aria-describedby` связывают поле с подписью и подсказкой. */
export const Accessibility: Story = () => (
  <Gapped vertical gap={16}>
    <label htmlFor={'meeting-time'}>Время встречи</label>
    <ControlledTimePicker id={'meeting-time'} aria-describedby={'meeting-time-hint'} />
    <span id={'meeting-time-hint'}>Время местное, формат ЧЧ:ММ</span>
    Поле без видимой подписи
    <ControlledTimePicker aria-label={'Время начала встречи'} />
  </Gapped>
);

Accessibility.storyName = 'Accessibility';

/** Если продукту нужно только время, храните значение поля как есть — это строка.
 * Значение приходит полностью нормализованным (`9` => `09:00`), поэтому его можно отправлять на сервер как есть.
 * `onValueChange` вызывается только при коммите: потеря фокуса, Enter, выбор в списке, нативный пикер.
 */
export const UsageStringValue: Story = () => {
  const [time, setTime] = React.useState('');
  const [savedTime, setSavedTime] = React.useState('');

  return (
    <Gapped vertical gap={16}>
      <TimePicker source={['09:00', '12:00', '18:00']} value={time} onValueChange={setTime} />
      <Button onClick={() => setSavedTime(time)}>Сохранить</Button>
      <span>Отправлено на сервер: {savedTime ? `"${savedTime}"` : '—'}</span>
    </Gapped>
  );
};

UsageStringValue.storyName = 'UsageStringValue';

/** Если у времени есть бизнес-смысл — слот, интервал доставки, запись к специалисту, —
 * храните время, а элемент ищите в `source` по нему.
 * Время, введённое вручную, в списке не находится: у такого значения нет `slotId`,
 * и этот случай видно в состоянии формы.
 */
export const UsageItemValue: Story = () => {
  interface AppointmentSlot extends TimeItem {
    slotId: number;
    specialist: string;
  }

  const slots: AppointmentSlot[] = [
    { value: '09:00', label: 'Анна Смирнова', slotId: 101, specialist: 'Анна Смирнова' },
    { value: '10:30', label: 'Олег Петров', slotId: 102, specialist: 'Олег Петров' },
    { value: '13:00', label: 'Мария Волкова', slotId: 103, specialist: 'Мария Волкова' },
  ];

  const [time, setTime] = React.useState('');
  const selectedSlot = slots.find((slot) => slot.value === time);

  const renderRequestBody = () => {
    if (time === '') {
      return '{}';
    }

    return selectedSlot ? `{ "slotId": ${selectedSlot.slotId}, "time": "${time}" }` : `{ "time": "${time}" }`;
  };

  return (
    <Gapped vertical gap={16}>
      <TimePicker source={slots} value={time} onValueChange={setTime} />
      <span>{selectedSlot ? `Специалист: ${selectedSlot.specialist}` : 'Специалист не выбран'}</span>
      <span style={{ fontFamily: 'monospace' }}>{renderRequestBody()}</span>
    </Gapped>
  );
};

UsageItemValue.storyName = 'UsageItemValue';

/** Интервал «с — до» собирается из двух полей.
 * `maxTime` и `minTime` ограничивают только доступность элементов в меню соседнего поля,
 * поэтому руками всё ещё можно ввести некорректный интервал — его проверяет продукт.
 * Нормализованные значения `HH:mm` сравниваются как обычные строки.
 */
export const UsageTimeRange: Story = () => {
  const workHours = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'];

  const [from, setFrom] = React.useState('10:00');
  const [to, setTo] = React.useState('18:00');

  const isRangeInvalid = from !== '' && to !== '' && from > to;

  return (
    <Gapped vertical gap={16}>
      <Gapped gap={8}>
        <TimePicker
          source={workHours}
          maxTime={to || undefined}
          width={100}
          value={from}
          error={isRangeInvalid}
          onValueChange={setFrom}
        />
        —
        <TimePicker
          source={workHours}
          minTime={from || undefined}
          width={100}
          value={to}
          error={isRangeInvalid}
          onValueChange={setTo}
        />
      </Gapped>
      <span>
        {isRangeInvalid ? 'Время окончания раньше времени начала' : `Интервал: ${from || '—'} — ${to || '—'}`}
      </span>
    </Gapped>
  );
};

UsageTimeRange.storyName = 'UsageTimeRange';

/** Дату и время можно объединить в `Group` — она сама уберёт лишние скругления между полями. */
export const UsageWithDatePicker: Story = () => {
  const [date, setDate] = React.useState('01.09.2026');
  const [time, setTime] = React.useState('10:00');

  return (
    <Gapped vertical gap={16}>
      <Group>
        <DatePicker width={120} value={date} onValueChange={setDate} />
        <TimePicker width={90} source={['10:00', '12:00', '14:00']} value={time} onValueChange={setTime} />
      </Group>
      <span>
        Начало: {date} {time || '—'}
      </span>
    </Gapped>
  );
};

UsageWithDatePicker.storyName = 'UsageWithDatePicker';

/** Через `ref` доступны `focus`, `blur`, `open`, `close` и `blink`.
 * `focus({ withoutOpenDropdown: true })` ставит фокус, не раскрывая меню.
 * `blink` подсвечивает поле — им удобно показать, что значение требует внимания,
 * не переводя поле в состояние ошибки.
 */
export const UsageRefMethods: Story = () => {
  const [value, setValue] = React.useState('');
  const timePickerRef = React.useRef<TimePickerRef>(null);

  return (
    <Gapped vertical gap={16}>
      <TimePicker ref={timePickerRef} source={['09:00', '12:00', '18:00']} value={value} onValueChange={setValue} />
      <Gapped gap={8}>
        <Button onClick={() => timePickerRef.current?.focus()}>focus</Button>
        <Button onClick={() => timePickerRef.current?.focus({ withoutOpenDropdown: true })}>focus без меню</Button>
        <Button onClick={() => timePickerRef.current?.open()}>open</Button>
        <Button onClick={() => timePickerRef.current?.close()}>close</Button>
        <Button onClick={() => timePickerRef.current?.blink()}>blink</Button>
        <Button onClick={() => timePickerRef.current?.blur()}>blur</Button>
      </Gapped>
    </Gapped>
  );
};

UsageRefMethods.storyName = 'UsageRefMethods';

/** Чтобы очистить поле, передайте в `value` пустое значение — `''` или `null`.
 * При очистке пользователем `onValueChange` вызывается с пустой строкой.
 */
export const UsageReset: Story = () => {
  const [time, setTime] = React.useState<string | null>('12:00');

  return (
    <Gapped vertical gap={16}>
      <TimePicker
        source={[{ value: '09:00' }, { value: '12:00' }, { value: '18:00' }]}
        value={time}
        onValueChange={setTime}
      />
      <Button onClick={() => setTime(null)}>Очистить</Button>
      <span>Значение: {time === null ? 'null' : `"${time}"`}</span>
    </Gapped>
  );
};

UsageReset.storyName = 'UsageReset';

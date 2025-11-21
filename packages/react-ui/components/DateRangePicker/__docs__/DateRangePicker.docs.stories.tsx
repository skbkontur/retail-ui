import React from 'react';
import type { CalendarDayProps } from '@skbkontur/react-ui';
import {
  CalendarDay,
  DateRangePicker,
  Gapped,
  ThemeContext,
  ThemeFactory,
  DateOrder,
  DateSeparator,
  LocaleContext,
  Select,
} from '@skbkontur/react-ui';

import type { Meta, Story } from '../../../typings/stories';
import {
  Default,
  CustomChildrenVertical,
  CustomChildrenWithoutDash,
  Sizes,
  Validations as ValidationsStory,
  TodayButton,
} from '../__stories__/DateRangePicker.stories';

export default {
  title: 'Date Components/DateRangePicker',
  component: DateRangePicker,
  parameters: { creevey: { skip: true } },
} as Meta;

export const Example1 = Default;
Example1.storyName = 'Выбор периода';

/**
 * Для валидаций используйте `DateRangePicker.validate(startValue, endValue, options)`, который принимает:
 * - `startValue` и `endValue` — проверяемые значения `'dd.mm.yyyy'`
 * - `options` — объект с настройками `{ startOptional, endOptional, minDate, maxDate }`
 *
 * Возвращается валидация полей `Start` и `End` в формате `[true, false]`
 */
export const Validations = ValidationsStory;
Validations.storyName = 'Валидации';

/**
 * Пример с кастомизацией темы и кастомным рендером дня
 */
export const ExamplePrices: Story = () => {
  const theme = React.useContext(ThemeContext);

  function renderDay(props: CalendarDayProps) {
    const [date, month] = props.date.split('.').map(Number);
    const randomDay = date % 6 === 0 || date % 7 === 0 || date % 8 === 0;
    const randomPrice = Math.round((date / month) * 1000);

    return (
      <CalendarDay {...props}>
        <div style={{ fontSize: theme.calendarCellFontSize }}>{date}</div>
        <div style={{ fontSize: '11px', fontFeatureSettings: 'tnum', fontVariantNumeric: 'tabular-nums' }}>
          {randomDay ? <>{randomPrice}&thinsp;₽</> : <span style={{ color: theme.tokenTextColorDisabled }}>—</span>}
        </div>
      </CalendarDay>
    );
  }

  const [valueStart, setValueStart] = React.useState('');
  const [valueEnd, setValueEnd] = React.useState('');
  const minDate = '08.07.2024';
  const maxDate = '18.08.2024';

  return (
    <ThemeContext.Provider
      value={ThemeFactory.create(
        {
          calendarCellWidth: '48px',
          calendarCellHeight: '48px',
          calendarCellLineHeight: '18px',
          calendarWrapperHeight: '700px',
          calendarCellBorderRadius: '10px',
        },
        theme,
      )}
    >
      <DateRangePicker size="medium" renderDay={renderDay}>
        <DateRangePicker.Start value={valueStart} minDate={minDate} onValueChange={setValueStart} />
        <DateRangePicker.Separator />
        <DateRangePicker.End value={valueEnd} maxDate={maxDate} onValueChange={setValueEnd} />
      </DateRangePicker>
    </ThemeContext.Provider>
  );
};
ExamplePrices.storyName = 'Выбор дат с ценами';

/**
 * Для полей достпен параметр `optional`, чтобы указывать открытые диапазоны
 */
export const ExampleCustomOptional: Story = () => {
  const [valueStart, setValueStart] = React.useState('');
  const [valueEnd, setValueEnd] = React.useState('');

  return (
    <DateRangePicker>
      <DateRangePicker.Start value={valueStart} onValueChange={setValueStart} optional />
      <DateRangePicker.Separator />
      <DateRangePicker.End value={valueEnd} onValueChange={setValueEnd} optional />
    </DateRangePicker>
  );
};
ExampleCustomOptional.storyName = 'Открытые даты начала или конца';

/**
 * Через параметр `size` доступны размеры `large`, `medium` и `small`. С помощью токенов `calendar*` можно управлять размерами календаря
 */
export const ExampleSizes = Sizes;
ExampleSizes.storyName = 'Размеры';

/**
 * У дочерних элементов могут быть настроены `width`, `className`, `style`, `withIcon` и другие настройки `<DateInput>`
 */
export const ExampleCustomWithoutDash = CustomChildrenWithoutDash;
ExampleCustomWithoutDash.storyName = 'Поля без тире';

export const ExampleCustomVertical = CustomChildrenVertical;
ExampleCustomVertical.storyName = 'Вертикальное расположение';

/**
 * Добавить кнопку для выбора сегодяшней даты `enableTodayLink`
 */
export const ExampleTodayButton = TodayButton;
TodayButton.storyName = 'Кнопка «Сегодня»';

export const ExampleDateFormat: Story = () => {
  const [valueStart, setValueStart] = React.useState('');
  const [valueEnd, setValueEnd] = React.useState('');
  const [order, setOrder] = React.useState(DateOrder.YMD);
  const [separator, setSeparator] = React.useState(Object.keys(DateSeparator)[0]);

  return (
    <Gapped vertical gap={10}>
      <div>
        <span style={{ width: '300px', display: 'inline-block' }}>
          Порядок компонентов (<b>DateOrder</b>)
        </span>
        <Select value={order} items={Object.keys(DateOrder)} onValueChange={(order) => setOrder(order)} />
      </div>
      <div>
        <span style={{ width: '300px', display: 'inline-block' }}>
          Разделитель (<b>DateSeparator</b>)
        </span>
        <Select
          value={separator}
          items={Object.keys(DateSeparator)}
          onValueChange={(separator) => setSeparator(separator)}
        />
      </div>
      <LocaleContext.Provider
        value={{
          locale: {
            DatePicker: {
              // @ts-ignore
              separator: DateSeparator[separator],
              order,
            },
          },
        }}
      >
        <DateRangePicker>
          <DateRangePicker.Start value={valueStart} onValueChange={setValueStart} />
          <DateRangePicker.Separator />
          <DateRangePicker.End value={valueEnd} onValueChange={setValueEnd} />
        </DateRangePicker>
      </LocaleContext.Provider>
    </Gapped>
  );
};
ExampleDateFormat.storyName = 'Ручное форматирование даты';

import React from 'react';
import {
  CalendarDay,
  CalendarDayProps,
  DateRangePicker,
  Gapped,
  ThemeContext,
  ThemeFactory,
  DateOrder,
  DateSeparator,
  LocaleContext,
  Select,
} from '@skbkontur/react-ui';
import { ThemeIn } from 'react-ui/lib/theming/Theme';

import { Meta, Story } from '../../../typings/stories';
import { Validations as ValidationsStory } from '../__stories__/DateRangePicker.stories';

export default {
  title: 'Date Components/DateRangePicker',
  component: DateRangePicker,
  parameters: { creevey: { skip: true } },
} as Meta;

export const Example1: Story = () => {
  const [value, setValue] = React.useState(['', '']);
  const minDate = '08.07.2024';
  const maxDate = '18.08.2024';

  return (
    <DateRangePicker
      value={value}
      minDate={minDate}
      maxDate={maxDate}
      onValueChange={([start, end]) => setValue([start, end])}
    >
      <DateRangePicker.Start />
      <DateRangePicker.Separator />
      <DateRangePicker.End />
    </DateRangePicker>
  );
};

Example1.storyName = 'Выбор периода';

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

  const [value, setValue] = React.useState(['', '']);
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
      <DateRangePicker
        value={value}
        minDate={minDate}
        maxDate={maxDate}
        size="medium"
        renderDay={renderDay}
        onValueChange={([start, end]) => setValue([start, end])}
      >
        <DateRangePicker.Start />
        <DateRangePicker.Separator />
        <DateRangePicker.End />
      </DateRangePicker>
    </ThemeContext.Provider>
  );
};

ExamplePrices.storyName = 'Выбор дат с ценами';

export const Validations = ValidationsStory;
Validations.storyName = 'Валидации';

/**
 * Через параметр `size` доступны размеры `large`, `medium` и `small`. С помощью токенов `calendar*` можно управлять размерами календаря
 */
export const ExampleSizes: Story = () => {
  const [valueS, setValueS] = React.useState(['', '']);
  const [valueM, setValueM] = React.useState(['', '']);
  const [valueL, setValueL] = React.useState(['', '']);

  const theme = React.useContext(ThemeContext);
  const createTheme = (tokens: ThemeIn) => ThemeFactory.create(tokens, theme);

  return (
    <Gapped vertical gap={16}>
      <ThemeContext.Provider value={createTheme({ calendarCellWidth: '44px', calendarCellHeight: '44px' })}>
        <DateRangePicker size="large" value={valueL} onValueChange={setValueL}>
          <DateRangePicker.Start />
          <DateRangePicker.Separator />
          <DateRangePicker.End />
        </DateRangePicker>{' '}
      </ThemeContext.Provider>

      <ThemeContext.Provider value={createTheme({ calendarCellWidth: '36px', calendarCellHeight: '36px' })}>
        <DateRangePicker size="medium" value={valueM} onValueChange={setValueM}>
          <DateRangePicker.Start />
          <DateRangePicker.Separator />
          <DateRangePicker.End />
        </DateRangePicker>
      </ThemeContext.Provider>
      <DateRangePicker size="small" value={valueS} onValueChange={setValueS}>
        <DateRangePicker.Start />
        <DateRangePicker.Separator />
        <DateRangePicker.End />
      </DateRangePicker>
    </Gapped>
  );
};

ExampleSizes.storyName = 'Размеры';

/**
 * У дочерних элементов могут быть настроены `width`, `style`, `withIcon` и другие настройки `<DateInput>`
 * - `<DateRangePicker.Start />`
 * - `<DateRangePicker.End />`
 * - `<DateRangePicker.Separator />`
 */
export const ExampleCustomWithoutDash: Story = () => {
  const [value, setValue] = React.useState(['', '']);
  return (
    <DateRangePicker value={value} onValueChange={setValue}>
      <DateRangePicker.Start style={{ borderRadius: 0 }} />
      <DateRangePicker.End style={{ marginLeft: -1, borderRadius: 0 }} />
    </DateRangePicker>
  );
};

ExampleCustomWithoutDash.storyName = 'Поля без тире';

export const ExampleCustomVertical: Story = () => {
  const [value, setValue] = React.useState(['', '']);

  return (
    <DateRangePicker value={value} onValueChange={([start, end]) => setValue([start, end])}>
      <Gapped gap={4} vertical>
        <DateRangePicker.Start />
        <DateRangePicker.End />
      </Gapped>
    </DateRangePicker>
  );
};

ExampleCustomVertical.storyName = 'Вертикальное расположение';

/**
 *
 */

export const ExampleDateFormat: Story = () => {
  const [value, setValue] = React.useState(['', '']);
  const [order, setOrder] = React.useState(DateOrder.YMD);
  const [separator, setSeparator] = React.useState(Object.keys(DateSeparator)[0]);

  return (
    <Gapped vertical gap={10}>
      <div>
        <span style={{ width: '300px', display: 'inline-block' }}>
          Порядок компонентов (<code>DateOrder</code>)
        </span>
        <Select value={order} items={Object.keys(DateOrder)} onValueChange={(order) => setOrder(order)} />
      </div>
      <div>
        <span style={{ width: '300px', display: 'inline-block' }}>
          Разделитель (<code>DateSeparator</code>)
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
        <DateRangePicker value={value} onValueChange={([start, end]) => setValue([start, end])}>
          <DateRangePicker.Start />
          <DateRangePicker.Separator />
          <DateRangePicker.End />
        </DateRangePicker>
      </LocaleContext.Provider>
    </Gapped>
  );
};

ExampleDateFormat.storyName = 'Ручное форматирование даты';

/**
 * Для полей достпен параметр `optional`, чтобы указывать открытые диапазоны
 */
export const ExampleCustomOptional: Story = () => {
  const [value, setValue] = React.useState(['', '']);

  return (
    <DateRangePicker value={value} optional={[true, true]} onValueChange={([start, end]) => setValue([start, end])}>
      <DateRangePicker.Start />
      <DateRangePicker.Separator />
      <DateRangePicker.End />
    </DateRangePicker>
  );
};

ExampleCustomOptional.storyName = 'Открытые даты начала или конца';

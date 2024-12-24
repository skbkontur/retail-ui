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

export default {
  title: 'Dates/DateRangePicker',
  component: DateRangePicker,
  parameters: { creevey: { skip: true } },
} as Meta;

export const Example1: Story = () => {
  const [fromValue, setFromValue] = React.useState('');
  const [toValue, setToValue] = React.useState('');
  const minDate = '08.07.2024';
  const maxDate = '18.08.2024';

  return (
    <DateRangePicker
      from={fromValue}
      to={toValue}
      minDate={minDate}
      maxDate={maxDate}
      onValueChange={console.log}
      onFromValueChange={setFromValue}
      onToValueChange={setToValue}
    />
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

  const [fromValue, setFromValue] = React.useState('');
  const [toValue, setToValue] = React.useState('');
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
        from={fromValue}
        to={toValue}
        minDate={minDate}
        maxDate={maxDate}
        size="medium"
        onValueChange={console.log}
        onFromValueChange={setFromValue}
        onToValueChange={setToValue}
        renderDay={renderDay}
      />
    </ThemeContext.Provider>
  );
};

ExamplePrices.storyName = 'Выбор дат с ценами';

/**
 * Через параметр `size` доступны размеры `large`, `medium` и `small`. С помощью токенов `calendar*` можно управлять размерами календаря
 */
export const ExampleSizes: Story = () => {
  const theme = React.useContext(ThemeContext);
  const createTheme = (tokens: ThemeIn) => ThemeFactory.create(tokens, theme);

  return (
    <Gapped vertical gap={16}>
      <ThemeContext.Provider value={createTheme({ calendarCellWidth: '44px', calendarCellHeight: '44px' })}>
        <DateRangePicker size="large" />
      </ThemeContext.Provider>

      <ThemeContext.Provider value={createTheme({ calendarCellWidth: '36px', calendarCellHeight: '36px' })}>
        <DateRangePicker size="medium" />
      </ThemeContext.Provider>

      <DateRangePicker size="small" />
    </Gapped>
  );
};

ExampleSizes.storyName = 'Размеры';

/**
 * Для более гибкой кастомизации каждого из полей доступны дочерние элементы:
 * - `<DateRangePicker.From />` — поле «от», настройки как у `<DateInput>`
 * - `<DateRangePicker.To />` — поле «до», настройки как у `<DateInput>`
 * - `<DateRangePicker.Separator />` — разделитель
 */
export const ExampleCustomWithoutDash: Story = () => {
  const [fromValue, setFromValue] = React.useState('');
  const [toValue, setToValue] = React.useState('');

  return (
    <DateRangePicker from={fromValue} to={toValue} onFromValueChange={setFromValue} onToValueChange={setToValue}>
      <DateRangePicker.From style={{ borderRadius: 0 }} />
      <DateRangePicker.To style={{ marginLeft: -1, borderRadius: 0 }} />
    </DateRangePicker>
  );
};

ExampleCustomWithoutDash.storyName = 'Поля без тире';

export const ExampleCustomVertical: Story = () => {
  return (
    <DateRangePicker>
      <Gapped gap={4} vertical>
        <DateRangePicker.From />
        <DateRangePicker.To />
      </Gapped>
    </DateRangePicker>
  );
};

ExampleCustomVertical.storyName = 'Вертикальное расположение';

/**
 *
 */

export const ExampleDateFormat: Story = () => {
  const [from, setFromValue] = React.useState('21.12.2012');
  const [to, setToValue] = React.useState('20.12.2025');
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
              separator: DateSeparator[separator],
              order,
            },
          },
        }}
      >
        <DateRangePicker
          from={from}
          to={to}
          onValueChange={console.log}
          onFromValueChange={setFromValue}
          onToValueChange={setToValue}
        />
      </LocaleContext.Provider>
    </Gapped>
  );
};

ExampleDateFormat.storyName = 'Ручное форматирование даты';

/**
 * Для полей достпен параметр `optional`, чтобы указывать поля открытыми.
 */
export const ExampleCustomOptional: Story = () => {
  return (
    <DateRangePicker>
      <DateRangePicker.From optional />
      <DateRangePicker.Separator />
      <DateRangePicker.To optional />
    </DateRangePicker>
  );
};

ExampleCustomOptional.storyName = 'Открытые даты начала или конца';

import {
  CalendarDay,
  DateOrder,
  DateRangePicker,
  DateSeparator,
  Gapped,
  LocaleContext,
  Select,
  Group,
  ThemeContext,
  ThemeFactory,
} from '@skbkontur/react-ui';
import type { CalendarDayProps } from '@skbkontur/react-ui';
import React from 'react';

import type { ThemeIn } from '../../../lib/theming/Theme.js';
import type { Meta, Story } from '../../../typings/stories.js';

const meta: Meta = {
  title: 'Date Components/DateRangePicker',
  component: DateRangePicker,
  parameters: { creevey: { skip: true } },
};

export default meta;

export const ExampleBasic: Story = () => {
  const [valueStart, setValueStart] = React.useState('');
  const [valueEnd, setValueEnd] = React.useState('');

  return (
    <DateRangePicker>
      <DateRangePicker.Start value={valueStart} onValueChange={setValueStart} />
      <DateRangePicker.Separator />
      <DateRangePicker.End value={valueEnd} onValueChange={setValueEnd} />
    </DateRangePicker>
  );
};

/**
 * Проп `size` задаёт размер поля. С помощью токенов `calendar*` можно управлять размерами календаря.
 */
export const ExampleSize: Story = () => {
  const [valueStartS, setValueStartS] = React.useState('');
  const [valueEndS, setValueEndS] = React.useState('');

  const [valueStartM, setValueStartM] = React.useState('');
  const [valueEndM, setValueEndM] = React.useState('');

  const [valueStartL, setValueStartL] = React.useState('');
  const [valueEndL, setValueEndL] = React.useState('');

  const theme = React.useContext(ThemeContext);
  const createTheme = (tokens: ThemeIn) => ThemeFactory.create(tokens, theme);

  return (
    <Gapped vertical gap={16}>
      <ThemeContext.Provider value={createTheme({ calendarCellWidth: '44px', calendarCellHeight: '44px' })}>
        <DateRangePicker>
          <DateRangePicker.Start value={valueStartL} size="large" onValueChange={setValueStartL} />
          <DateRangePicker.Separator />
          <DateRangePicker.End value={valueEndL} size="large" onValueChange={setValueEndL} />
        </DateRangePicker>
      </ThemeContext.Provider>

      <ThemeContext.Provider value={createTheme({ calendarCellWidth: '36px', calendarCellHeight: '36px' })}>
        <DateRangePicker>
          <DateRangePicker.Start value={valueStartM} size="medium" onValueChange={setValueStartM} />
          <DateRangePicker.Separator />
          <DateRangePicker.End value={valueEndM} size="medium" onValueChange={setValueEndM} />
        </DateRangePicker>
      </ThemeContext.Provider>

      <DateRangePicker>
        <DateRangePicker.Start value={valueStartS} onValueChange={setValueStartS} size="small" />
        <DateRangePicker.Separator />
        <DateRangePicker.End value={valueEndS} onValueChange={setValueEndS} size="small" />
      </DateRangePicker>
    </Gapped>
  );
};
ExampleSize.storyName = 'Размер';

/** Проп `width` задаёт ширину полей. */
export const ExampleWidth: Story = () => {
  const [valueStart, setValueStart] = React.useState('');
  const [valueEnd, setValueEnd] = React.useState('');

  return (
    <DateRangePicker width={'400px'}>
      <DateRangePicker.Start value={valueStart} onValueChange={setValueStart} />
      <DateRangePicker.Separator />
      <DateRangePicker.End value={valueEnd} onValueChange={setValueEnd} />
    </DateRangePicker>
  );
};
ExampleWidth.storyName = 'Ширина';

/**
 * Проп `menuPos` фиксирует расположение выпадающего окна с календарём. Оно может быть под полем — `"bottom"` или над ним — `"top"`.
 *
 * По умолчанию календарь отображается под полем, а если не хватает места, то динамически меняет расположение и показывается над полем.
 */
export const ExampleMenuPos: Story = () => {
  const [valueStart, setValueStart] = React.useState('');
  const [valueEnd, setValueEnd] = React.useState('');

  return (
    <DateRangePicker menuPos={'top'}>
      <DateRangePicker.Start value={valueStart} onValueChange={setValueStart} />
      <DateRangePicker.Separator />
      <DateRangePicker.End value={valueEnd} onValueChange={setValueEnd} />
    </DateRangePicker>
  );
};
ExampleMenuPos.storyName = 'Расположение календаря';

/**
 * Проп `menuAlign` выравнивает выпадающее окно с календарём. Оно может быть прикреплено к левому краю — `"left"` или к правому — `"right"`.
 */
export const ExampleMenuAlign: Story = () => {
  const [valueStart, setValueStart] = React.useState('');
  const [valueEnd, setValueEnd] = React.useState('');

  return (
    <DateRangePicker menuAlign={'right'}>
      <DateRangePicker.Start value={valueStart} onValueChange={setValueStart} />
      <DateRangePicker.Separator />
      <DateRangePicker.End value={valueEnd} onValueChange={setValueEnd} />
    </DateRangePicker>
  );
};
ExampleMenuAlign.storyName = 'Выравнивание календаря';

/** Минимальная дата задаётся в `Start` через `minDate`, максимальная — в `End` через `maxDate`. */
export const ExampleMinMax: Story = () => {
  const [valueStart, setValueStart] = React.useState('');
  const [valueEnd, setValueEnd] = React.useState('');

  const minDate = '08.07.2024';
  const maxDate = '18.08.2024';

  return (
    <DateRangePicker>
      <DateRangePicker.Start value={valueStart} onValueChange={setValueStart} minDate={minDate} />
      <DateRangePicker.Separator />
      <DateRangePicker.End value={valueEnd} onValueChange={setValueEnd} maxDate={maxDate} />
    </DateRangePicker>
  );
};
ExampleMinMax.storyName = 'Минимальная и максимальная даты';

/**
 * Проп `optional` позволяет указывать открытые диапазоны дат.
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

export const ExampleCustomMenuAnchorElement: Story = () => {
  const customRef = React.createRef<HTMLDivElement>();

  const [valueStart, setValueStart] = React.useState<string>('');
  const [valueEnd, setValueEnd] = React.useState<string>('');

  return (
    <Gapped vertical gap={100}>
      <DateRangePicker menuAnchorElement="focused">
        <span style={{ width: 300 }}>
          menuAnchorElement="focused": меню для выбора даты будет открываться у зафокусированного элемента
        </span>
        <div style={{ display: 'flex', rowGap: 150, alignItems: 'baseline', justifyContent: 'space-between' }}>
          <DateRangePicker.Start value={valueStart} onValueChange={setValueStart} />
          <DateRangePicker.Separator />
          <DateRangePicker.End value={valueEnd} onValueChange={setValueEnd} />
        </div>
      </DateRangePicker>

      <div style={{ display: 'flex', gap: 100 }}>
        <DateRangePicker menuAnchorElement={customRef}>
          <span>menuAnchorElement="customRef": меню для выбора даты будет открываться у элемента "customRef"</span>
          <DateRangePicker.Start value={valueStart} onValueChange={setValueStart} />
          <DateRangePicker.Separator />
          <DateRangePicker.End value={valueEnd} onValueChange={setValueEnd} />
        </DateRangePicker>
        <div ref={customRef}>customRef</div>
      </div>
    </Gapped>
  );
};
ExampleCustomMenuAnchorElement.storyName = 'Настройка позиционирования меню';

/**
 * Проп `enableTodayLink` добавляет кнопку для выбора сегодяшней даты.
 */
export const ExampleTodayButton: Story = () => {
  const [valueStart, setValueStart] = React.useState('');
  const [valueEnd, setValueEnd] = React.useState('');

  const minDate = '08.07.2024';
  const maxDate = '18.08.2024';

  return (
    <DateRangePicker enableTodayLink>
      <DateRangePicker.Start value={valueStart} onValueChange={setValueStart} minDate={minDate} />
      <DateRangePicker.Separator />
      <DateRangePicker.End value={valueEnd} onValueChange={setValueEnd} maxDate={maxDate} />
    </DateRangePicker>
  );
};
ExampleTodayButton.storyName = 'Кнопка «Сегодня»';

export const ExampleDateFormat: Story = () => {
  const [valueStart, setValueStart] = React.useState('');
  const [valueEnd, setValueEnd] = React.useState('');
  const [order, setOrder] = React.useState(DateOrder.YMD);
  const [separator, setSeparator] = React.useState<keyof typeof DateSeparator>(
    Object.keys(DateSeparator)[0] as keyof typeof DateSeparator,
  );

  return (
    <Gapped vertical gap={10}>
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
        <DateRangePicker>
          <DateRangePicker.Start value={valueStart} onValueChange={setValueStart} />
          <DateRangePicker.Separator />
          <DateRangePicker.End value={valueEnd} onValueChange={setValueEnd} />
        </DateRangePicker>
      </LocaleContext.Provider>
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
    </Gapped>
  );
};
ExampleDateFormat.storyName = 'Форматирование даты';

/** Вы можете кастомизировать части поля. В примере ниже задан кастомный вид для дня календаря. Ещё примеры кастомизации смотрите на странице компонента [Calendar](https://tech.skbkontur.ru/kontur-ui/?path=/docs/react-ui_date-components-calendar--docs). */
export const ExampleCustomDayRender: Story = () => {
  const [valueStart, setValueStart] = React.useState('');
  const [valueEnd, setValueEnd] = React.useState('');

  const renderDay = (props: CalendarDayProps) => {
    const [date] = props.date.split('.').map(Number);
    const isEven = date % 2 === 0;

    if (isEven) {
      return <CalendarDay {...props} style={{ background: '#e9f8e3' }} />;
    }

    return <CalendarDay {...props} />;
  };

  return (
    <DateRangePicker renderDay={renderDay}>
      <DateRangePicker.Start value={valueStart} onValueChange={setValueStart} />
      <DateRangePicker.Separator />
      <DateRangePicker.End value={valueEnd} onValueChange={setValueEnd} />
    </DateRangePicker>
  );
};
ExampleCustomDayRender.storyName = 'Кастомизация: рендер дня';

/**
 * У дочерних элементов могут быть настроены `width`, `className`, `style`, `withIcon` и другие настройки `<DateInput>`
 */
export const ExampleCustomWithoutDash: Story = () => {
  const [valueStart, setValueStart] = React.useState('');
  const [valueEnd, setValueEnd] = React.useState('');

  return (
    <DateRangePicker>
      <Group>
        <DateRangePicker.Start value={valueStart} onValueChange={setValueStart} />
        <DateRangePicker.End value={valueEnd} onValueChange={setValueEnd} />
      </Group>
    </DateRangePicker>
  );
};
ExampleCustomWithoutDash.storyName = 'Кастомизация: поля без тире';

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
ExamplePrices.storyName = 'Кастомизация: выбор дат с ценами';

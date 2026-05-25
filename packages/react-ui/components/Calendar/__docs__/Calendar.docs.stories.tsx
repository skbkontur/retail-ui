import { Button, Calendar, CalendarDay, Gapped, Hint, ThemeContext, ThemeFactory, Tooltip } from '@skbkontur/react-ui';
import type { CalendarDayProps } from '@skbkontur/react-ui/components/Calendar/CalendarDay';
import * as DatePickerHelpers from '@skbkontur/react-ui/components/DatePicker/DatePickerHelpers';
import React from 'react';

import type { Meta, Story } from '../../../typings/stories.js';

const meta: Meta = {
  title: 'Date Components/Calendar',
  component: Calendar,
  parameters: { creevey: { skip: true } },
};

export default meta;

export const ExampleBasic: Story = () => {
  const [date, setDate] = React.useState('01.01.2026');

  return <Calendar value={date} onValueChange={setDate} />;
};
/** С помощью пропсов `minDate` и `maxDate` можно задавать минимально и максимально возможную дату для выбора в календаре. */
export const ExampleMinMaxDate: Story = () => {
  const [date, setDate] = React.useState('01.01.2026');
  const [minDate] = React.useState('01.01.2000');
  const [maxDate] = React.useState('01.01.2050');

  return <Calendar value={date} onValueChange={setDate} minDate={minDate} maxDate={maxDate} />;
};
ExampleMinMaxDate.storyName = 'Минимальная и максимальная даты в календаре';

/** С помощью пропсов `initialMonth` и `initialYear` можно изменить отображение начального года и месяца. Вне зависимости от того, какая дата выбрана в календаре в данный момент. */
export const ExampleInitialMonthYear: Story = () => {
  const [date, setDate] = React.useState('11.12.2021');
  const initialMonth = 7;
  const initialYear = 2000;

  return (
    <div style={{ display: 'flex' }}>
      <Calendar value={date} onValueChange={setDate} initialMonth={initialMonth} initialYear={initialYear} />
      <div style={{ fontSize: '16px' }}>
        <p>Выбранная дата: {date}</p>
        <p>Начальный месяц: {initialMonth}</p>
        <p>Начальный год: {initialYear}</p>
      </div>
    </div>
  );
};
ExampleInitialMonthYear.storyName = 'Начальные год и месяц';

/** В проп `isHoliday` можно передать функцию, которая будет получать день строкой формата `dd.mm.yyyy` и флаг `isWeekend` из [компонента дня](https://tech.skbkontur.ru/kontur-ui/?path=/docs/react-ui_date-components-calendarday--docs).
 *
 * Функция должна вернуть `true` для выходного дня и `false` — для рабочего. */
export const ExampleIsHoliday: Story = () => {
  const [date, setDate] = React.useState<string | undefined>();

  const createRandomHolidays = () => {
    const holidays = new Array(10);
    const today = new Date();

    for (let index = 0; index < holidays.length; index++) {
      const day = new Date(today.setDate(today.getDate() + 1 + index).valueOf());

      const holiday = {
        date: day.getDate(),
        month: day.getMonth(),
        year: day.getFullYear(),
      };

      holidays[index] = DatePickerHelpers.formatDate(holiday);
    }

    return holidays;
  };
  const holidays = createRandomHolidays();

  const isHoliday = (day: string, isWeekend: boolean) => {
    if (holidays.includes(day)) {
      return !isWeekend;
    }

    return isWeekend;
  };

  return <Calendar isHoliday={isHoliday} value={date} onValueChange={setDate} />;
};
ExampleIsHoliday.storyName = 'Выходные и праздничные дни';

/** С помощью метода `scrollToMonth` можно реализовать контрол для быстрого скролла к определённому месяцу года.  */
export const ExampleScrollToMonth: Story = () => {
  const initialValue = '02.09.2023';
  const [value, setValue] = React.useState(initialValue);
  const calendarRef = React.useRef<Calendar>(null);

  return (
    <>
      <Gapped gap={8} verticalAlign="top">
        <Calendar value={value} ref={calendarRef} onValueChange={setValue} />

        <Gapped vertical gap={8}>
          <Button onClick={() => calendarRef.current?.scrollToMonth(1, 2023)}>I квартал</Button>
          <Button onClick={() => calendarRef.current?.scrollToMonth(4, 2023)}>II квартал</Button>
          <Button onClick={() => calendarRef.current?.scrollToMonth(7, 2023)}>III квартал</Button>
          <Button onClick={() => calendarRef.current?.scrollToMonth(10, 2023)}>IV квартал</Button>
        </Gapped>
      </Gapped>
    </>
  );
};
ExampleScrollToMonth.storyName = 'Скролл к месяцу';

/** Календарю можно задать кастомную высоту с помощью переменной темы `calendarWrapperHeight`:
- базовая высота календаря — `330px`
- максимальная высота календаря — `450px` */
export const ExampleCustomHeight: Story = () => {
  const [date, setDate] = React.useState('01.11.2021');
  const theme = React.useContext(ThemeContext);

  return (
    <ThemeContext.Provider value={ThemeFactory.create({ calendarWrapperHeight: '450px' }, theme)}>
      <Calendar value={date} onValueChange={setDate} />
    </ThemeContext.Provider>
  );
};
ExampleCustomHeight.storyName = 'Кастомизация: высота';

/** Для кастомизации дней в календаре используется проп `renderDay`.
 *
 * Для корректной работы компонента обязательно используйте компонент `<CalendarDay />` и передайте в него все приходящие в функцию пропсы: `<Calendar renderDay={(props) => <CalendarDay {...props} />} />`. */
export const ExampleCustomDayRender: Story = () => {
  const initialValue = '02.09.2023';

  const [value, setValue] = React.useState(initialValue);

  const renderDay = (props: CalendarDayProps) => {
    const [date, month] = props.date.split('.').map(Number);

    if (month === 9 && date > 12 && date < 16) {
      return (
        <Tooltip render={() => 'Кастомный день'}>
          <CalendarDay {...props} style={{ background: 'darkgray' }} />
        </Tooltip>
      );
    }

    if (month === 8 && date === 20) {
      return (
        <Hint text={date} pos="right middle">
          <CalendarDay {...props}>
            <b style={{ color: 'orange' }}>#</b>
          </CalendarDay>
        </Hint>
      );
    }

    return <CalendarDay {...props} />;
  };

  return <Calendar value={value} onValueChange={setValue} renderDay={renderDay} />;
};
ExampleCustomDayRender.storyName = 'Кастомизация: рендер дня';

/** В примере кастомизирована тема календаря и рендер дня. */
export const ExampleCustomPrice: Story = () => {
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

  const [value, setValue] = React.useState<string | null>(null);

  return (
    <ThemeContext.Provider
      value={ThemeFactory.create(
        {
          calendarCellWidth: '56px',
          calendarCellHeight: '56px',
          calendarCellLineHeight: '1.5',
          calendarWrapperHeight: '600px',
          calendarCellBorderRadius: '8px',
        },
        theme,
      )}
    >
      <Calendar value={value} renderDay={renderDay} onValueChange={setValue} />
    </ThemeContext.Provider>
  );
};
ExampleCustomPrice.storyName = 'Кастомизация: календарь с ценами';

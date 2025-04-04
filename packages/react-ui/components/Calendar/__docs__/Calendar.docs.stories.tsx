import React from 'react';
import * as DatePickerHelpers from '@skbkontur/react-ui/components/DatePicker/DatePickerHelpers';
import { ThemeContext } from '@skbkontur/react-ui/lib/theming/ThemeContext';
import { ThemeFactory } from '@skbkontur/react-ui/lib/theming/ThemeFactory';
import { Calendar, Tooltip, Hint, CalendarDay, Button, Gapped } from '@skbkontur/react-ui';

import type { Meta, Story } from '../../../typings/stories';

export default {
  title: 'Display data/Calendar',
  component: Calendar,
  parameters: { creevey: { skip: true } },
} as Meta;

export const Example1: Story = () => {
  const [date, setDate] = React.useState('01.11.2021');

  return <Calendar value={date} onValueChange={setDate} />;
};
Example1.storyName = 'Календарь с заданной датой';

/** Вне зависимости от того, какая дата выбрана в календаре в данный момент - можно изменить отображение начального года и месяца с помощью пропов `initialMonth` и `initialYear` */
export const Example2: Story = () => {
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
Example2.storyName = 'initialMonth и initialYear';

/** В компонент можно передать функцию `isHoliday`, которая будет получать день строкой формата `dd.mm.yyyy` и флаг `isWeekend`, и должна вернуть `true` для выходного и `false` для рабочего дня. */
export const Example3: Story = () => {
  const [date, setDate] = React.useState();

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

  const isHoliday = (day, isWeekend) => {
    if (holidays.includes(day)) {
      return !isWeekend;
    }

    return isWeekend;
  };

  return <Calendar isHoliday={isHoliday} value={date} onValueChange={setDate} />;
};
Example3.storyName = 'isHoliday';

/** Календарю можно задать кастомную высоту с помощью переменной темы `calendarWrapperHeight`
- Базовая высота календаря - `330px`
- Максимальная высота календаря - `450px` */
export const Example4: Story = () => {
  const [date, setDate] = React.useState('01.11.2021');
  const theme = React.useContext(ThemeContext);

  return (
    <ThemeContext.Provider value={ThemeFactory.create({ calendarWrapperHeight: '450px' }, theme)}>
      <Calendar value={date} onValueChange={setDate} />
    </ThemeContext.Provider>
  );
};
Example4.storyName = 'Высота';

/** Для кастомнизации дней в календаре используется метод `renderDay` и компонент [Calendar.Day](#/Components/Calendar/Calendar.Day) */
export const Example5: Story = () => {
  const initialValue = '02.09.2023';

  const [value, setValue] = React.useState(initialValue);

  const renderDay = (props) => {
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
Example5.storyName = 'Кастомный рендер дня';

/** Пример с кастомизацией темы и кастомным рендером дня. */
export const Example6: Story = () => {
  const theme = React.useContext(ThemeContext);

  function renderDay(props) {
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

  const [value, setValue] = React.useState(null);

  return (
    <ThemeContext.Provider
      value={ThemeFactory.create(
        {
          calendarCellSize: '56px',
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
Example6.storyName = 'Календарь с ценами';

export const Example8: Story = () => {
  const initialValue = '02.09.2023';
  const [value, setValue] = React.useState(initialValue);
  const calendarRef = React.useRef(null);

  return (
    <>
      <Gapped gap={8} verticalAlign="top">
        <Calendar value={value} ref={calendarRef} onValueChange={setValue} />

        <Gapped vertical gap={8}>
          <Button onClick={() => calendarRef.current.scrollToMonth(1, 2023)}>I квартал</Button>
          <Button onClick={() => calendarRef.current.scrollToMonth(4, 2023)}>II квартал</Button>
          <Button onClick={() => calendarRef.current.scrollToMonth(7, 2023)}>III квартал</Button>
          <Button onClick={() => calendarRef.current.scrollToMonth(10, 2023)}>IV квартал</Button>
        </Gapped>
      </Gapped>
    </>
  );
};
Example8.storyName = 'Скролл к месяцу';

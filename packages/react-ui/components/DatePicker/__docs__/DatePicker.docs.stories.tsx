import {
  CalendarDay,
  DateOrder,
  DatePicker,
  DateSeparator,
  Gapped,
  LangCodes,
  LocaleContext,
  Select,
} from '@skbkontur/react-ui';
import type { CalendarDayProps } from '@skbkontur/react-ui';
import React from 'react';

import type { Meta, Story } from '../../../typings/stories.js';
import * as DatePickerHelpers from '../DatePickerHelpers.js';

const meta: Meta = {
  title: 'Date Components/DatePicker',
  component: DatePicker,
  parameters: { creevey: { skip: true } },
};

export default meta;

export const ExampleBasic: Story = () => {
  const [value, setValue] = React.useState('12.05.2026');

  return <DatePicker value={value} onValueChange={setValue} />;
};

/** Проп `size` задаёт размер поля с датой. */
export const ExampleSize: Story = () => {
  const [value, setValue] = React.useState('12.05.2026');

  return (
    <Gapped vertical>
      <DatePicker value={value} onValueChange={setValue} size={'small'} />
      <DatePicker value={value} onValueChange={setValue} size={'medium'} />
      <DatePicker value={value} onValueChange={setValue} size={'large'} />
    </Gapped>
  );
};
ExampleSize.storyName = 'Размер';

/** Проп `width` задаёт ширину поля с датой. */
export const ExampleWidth: Story = () => {
  const [value, setValue] = React.useState('12.05.2026');

  return <DatePicker value={value} onValueChange={setValue} width={'300px'} />;
};
ExampleWidth.storyName = 'Ширина';

/** Проп `enableTodayLink` добавляет в календарь кнопку «Сегодня», которая меняет выбранное значение на текущую дату. */
export const ExampleEnableTodayLink: Story = () => {
  const [value, setValue] = React.useState('12.05.2026');

  return <DatePicker value={value} onValueChange={setValue} enableTodayLink />;
};
ExampleEnableTodayLink.storyName = 'Кнопка «Сегодня»';

/**
 * Проп `menuPos` фиксирует расположение выпадающего окна с календарём. Оно может быть под полем — `"bottom"` или над ним — `"top"`.
 *
 * По умолчанию календарь отображается под полем, а если не хватает места, то динамически меняет расположение и показывается над полем.
 */
export const ExampleMenuPos: Story = () => {
  const [value, setValue] = React.useState('12.05.2026');

  return <DatePicker value={value} onValueChange={setValue} menuPos={'top'} />;
};
ExampleMenuPos.storyName = 'Расположение календаря';

/**
 * Проп `menuAlign` выравнивает выпадающее окно с календарём. Оно может быть прикреплено к левому краю — `"left"` или к правому — `"right"`.
 */
export const ExampleMenuAlign: Story = () => {
  const [value, setValue] = React.useState('12.05.2026');

  return <DatePicker value={value} onValueChange={setValue} menuAlign={'right'} />;
};
ExampleMenuAlign.storyName = 'Выравнивание календаря';

/**
 * Проп `disabled` переводит поле в состояние блокировки. Поле визуально приглушается и становится недоступно для редактирования.
 */
export const ExampleDisabled: Story = () => {
  const [value, setValue] = React.useState('12.05.2026');

  return <DatePicker value={value} onValueChange={setValue} disabled />;
};
ExampleDisabled.storyName = 'Состояние блокировки';

/** Проп `error` переводит поле в состояние ошибки. */
export const ExampleError: Story = () => {
  const [value, setValue] = React.useState('12.05.2026');

  return <DatePicker value={value} onValueChange={setValue} error />;
};
ExampleError.storyName = 'Состояние ошибки';

/** Проп `warning` переводит поле в состояние предупреждения. */
export const ExampleWarning: Story = () => {
  const [value, setValue] = React.useState('12.05.2026');

  return <DatePicker value={value} onValueChange={setValue} warning />;
};
ExampleWarning.storyName = 'Состояние предупреждения';

/** В проп `isHoliday` можно передать функцию, которая будет получать день строкой формата `dd.mm.yyyy` и флаг `isWeekend` из [компонента дня](https://tech.skbkontur.ru/kontur-ui/?path=/docs/react-ui_date-components-calendarday--docs).
 *
 * Функция должна вернуть `true` для выходного дня и `false` — для рабочего. */
export const ExampleIsHoliday: Story = () => {
  const [value, setValue] = React.useState('');

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

  return <DatePicker isHoliday={isHoliday} value={value} onValueChange={setValue} enableTodayLink />;
};
ExampleIsHoliday.storyName = 'Выходные и праздничные дни';

/** В примере показано, как менять формат отображения даты в рантайме: порядок компонентов день/месяц/год и разделитель между ними. */
export const ExampleDatePickerFormatting: Story = () => {
  class DatePickerFormatting extends React.Component<any, any> {
    constructor(props: Record<string, never>) {
      super(props);
      this.state = {
        order: DateOrder.YMD,
        separator: 'Dot',
        value: '21.12.2012',
      };
    }

    render() {
      return (
        <Gapped vertical gap={10}>
          <div>
            <span style={{ width: '300px', display: 'inline-block' }}>
              Порядок компонентов (<code>DateOrder</code>)
            </span>
            <Select
              value={this.state.order}
              items={Object.keys(DateOrder)}
              onValueChange={(order) => this.setState({ order })}
            />
          </div>
          <div>
            <span style={{ width: '300px', display: 'inline-block' }}>
              Разделитель (<code>DateSeparator</code>)
            </span>
            <Select
              value={this.state.separator}
              items={Object.keys(DateSeparator)}
              onValueChange={(separator) => this.setState({ separator })}
            />
          </div>
          <LocaleContext.Provider
            value={{
              langCode: LangCodes.ru_RU,
              locale: {
                DatePicker: {
                  separator: DateSeparator[this.state.separator as keyof typeof DateSeparator],
                  order: this.state.order,
                },
              },
            }}
          >
            <DatePicker onValueChange={(value) => this.setState({ value })} value={this.state.value} />
          </LocaleContext.Provider>
        </Gapped>
      );
    }
  }

  return <DatePickerFormatting />;
};
ExampleDatePickerFormatting.storyName = 'Форматирование даты';

/** Вы можете кастомизировать части поля с датой. В примере ниже задан кастомный вид для дня календаря. Ещё примеры кастомизации смотрите в компоненте [Calendar](https://tech.skbkontur.ru/kontur-ui/?path=/docs/react-ui_date-components-calendar--docs). */
export const ExampleCustomDayRender: Story = () => {
  const [value, setValue] = React.useState('12.05.2022');

  const renderDay = (props: CalendarDayProps) => {
    const [date] = props.date.split('.').map(Number);
    const isEven = date % 2 === 0;

    if (isEven) {
      return <CalendarDay {...props} style={{ background: '#e9f8e3' }} />;
    }

    return <CalendarDay {...props} />;
  };

  return <DatePicker value={value} onValueChange={setValue} renderDay={renderDay} />;
};
ExampleCustomDayRender.storyName = 'Кастомизация: рендер дня';

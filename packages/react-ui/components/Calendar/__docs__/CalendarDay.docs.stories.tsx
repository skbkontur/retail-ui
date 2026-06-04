import { CalendarDay, Gapped } from '@skbkontur/react-ui';
import React from 'react';

import type { Meta, Story } from '../../../typings/stories.js';

const meta: Meta = {
  title: 'Date Components/CalendarDay',
  component: CalendarDay,
  parameters: { creevey: { skip: true } },
};

export default meta;

export const ExampleBasic: Story = () => {
  const date = '20.05.2024';
  const style = { width: 32, height: 32 };

  return <CalendarDay style={style} date={date} onDayClick={() => {}} />;
};

/** Для дня календаря доступны флаги:
 * - `isToday` — помечает ячейку, соответствующую текущей (системной) дате.
 * - `isSelected` — отмечает, что этот день выбран.
 * - `isDisabled` — указывает, что день заблокирован и недоступен для выбора.
 * - `isWeekend` — помечает день как выходной.  */
export const ExampleIs: Story = () => {
  const date = '20.05.2024';
  const style = { width: 32, height: 32 };

  return (
    <Gapped vertical>
      <b>isToday:</b>
      <CalendarDay style={style} date={date} isToday onDayClick={() => {}} />
      <b>isSelected:</b>
      <CalendarDay style={style} date={date} isSelected onDayClick={() => {}} />
      <b>isDisabled:</b>
      <CalendarDay style={style} date={date} isDisabled onDayClick={() => {}} />
      <b>isWeekend:</b>
      <CalendarDay style={style} date={date} isWeekend onDayClick={() => {}} />
    </Gapped>
  );
};
ExampleIs.storyName = 'Флаги дат';

import React from 'react';
import { Meta, Story } from '../../../typings/stories';

import { CalendarDay, Gapped } from '@skbkontur/react-ui';

export default {
  title: 'Display data/CalendarDay',
  component: CalendarDay,
  parameters: { creevey: { skip: true } },
} as Meta;

export const Example1: Story = () => {

  const date = '20.05.2024';
  const style = { width: 32, height: 32 };

  return (
    <Gapped>
      <CalendarDay style={style} date={date} />
      <CalendarDay style={style} date={date} isToday={true} />
      <CalendarDay style={style} date={date} isSelected={true} />
      <CalendarDay style={style} date={date} isDisabled={true} />
      <CalendarDay style={style} date={date} isWeekend={true} />
      <CalendarDay style={style}><b>20</b></CalendarDay>
    </Gapped>
  );

};
Example1.storyName = 'Базовый пример';

export const Example2: Story = () => {
  const { isBetween, isEqual, isGreater, isGreaterOrEqual, isLess, isLessOrEqual } = require('@skbkontur/react-ui/lib/date/comparison');

  const date_a = '10.03.2017';
  const date_b = '11.03.2017';

  const Table = ({ children }) => (
    <table>
      <thead>
        <tr>
          <td>Функция</td>
          <td>Результат</td>
        </tr>
      </thead>
      <tbody>
        { children }
      </tbody>
    </table>
  )

  const Row = ({ code }) => (
    <tr>
      <td><code>{code}</code></td>
      <td><code>{JSON.stringify(eval(code), null, 2)}</code></td>
    </tr>
  );

  return (
    <Table>
      <Row code={`isEqual("${date_a}", "${date_a}")`} />
      <Row code={`isLess("${date_a}", "${date_b}")`} />
      <Row code={`isLessOrEqual("${date_a}", "${date_b}")`} />
      <Row code={`isGreater("${date_b}", "${date_a}")`} />
      <Row code={`isGreaterOrEqual("${date_b}", "${date_a}")`} />
      <Row code={`isBetween("${date_b}", "${date_a}", "${date_b}")`} />
    </Table>

  );

};
Example2.storyName = 'Функции для сравнения строковых дат';


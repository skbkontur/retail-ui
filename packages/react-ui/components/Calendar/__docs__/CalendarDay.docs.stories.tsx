/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-eval */
import React from 'react';
import { CalendarDay, Gapped } from '@skbkontur/react-ui';
import {
  isBetween,
  isEqual,
  isGreater,
  isGreaterOrEqual,
  isLess,
  isLessOrEqual,
} from '@skbkontur/react-ui/lib/date/comparison';

import { Meta, Story } from '../../../typings/stories';

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
      <CalendarDay style={style} date={date} isToday />
      <CalendarDay style={style} date={date} isSelected />
      <CalendarDay style={style} date={date} isDisabled />
      <CalendarDay style={style} date={date} isWeekend />
      <CalendarDay style={style}>
        <b>20</b>
      </CalendarDay>
    </Gapped>
  );
};
Example1.storyName = 'Базовый пример';

/**
```js
import { 
  isBetween, 
  isEqual, 
  isGreater, 
  isGreaterOrEqual, 
  isLess, 
  isLessOrEqual 
} from '@skbkontur/react-ui/lib/date/comparison';
```
*/
export const Example2: Story = () => {
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
      <tbody>{children}</tbody>
    </table>
  );

  const Row = ({ code }) => (
    <tr>
      <td>
        <code>{code}</code>
      </td>
      <td>
        <code>{JSON.stringify(eval(code), null, 2)}</code>
      </td>
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

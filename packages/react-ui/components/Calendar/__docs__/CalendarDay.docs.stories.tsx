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

/** Набор функций предназначен для сравнения дат, представленных в виде строк.
```js
import { 
  isEqual,          // Проверяет равенство двух дат.
  isLess,           // Возвращает true, если дата left строго раньше даты right.
  isLessOrEqual,    // Возвращает true, если left меньше или равно right
  isGreater,        // Возвращает true, если left больше right.
  isGreaterOrEqual, // Возвращает true, если left больше или равно right.
  isBetween         // Проверяет, попадает ли дата between в диапазон [left, right] включительно.
} from '@skbkontur/react-ui/lib/date/comparison';
```
*/
export const ExampleFunction: Story = () => {
  const date_a = '10.03.2017';
  const date_b = '11.03.2017';

  const Table = ({ children }: { children: React.ReactNode }) => (
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

  const Row = ({ code }: { code: string }) => (
    <tr>
      <td>
        <code>{code}</code>
      </td>
      <td>
        {/* oxlint-disable-next-line no-eval */}
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
ExampleFunction.storyName = 'Функции для сравнения строковых дат';

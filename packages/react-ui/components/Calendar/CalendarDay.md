Компонент для отрисовки дня в Calendar. Полезен при использовании вместе с его пропом `renderDay`.

### Базовый пример
```jsx harmony
import { CalendarDay, Gapped } from '@skbkontur/react-ui';

const date = '20.05.2024';
const style = { width: 32, height: 32 };

<Gapped>
  <CalendarDay style={style} date={date} />
  <CalendarDay style={style} date={date} isToday={true} />
  <CalendarDay style={style} date={date} isSelected={true} />
  <CalendarDay style={style} date={date} isDisabled={true} />
  <CalendarDay style={style} date={date} isWeekend={true} />
  <CalendarDay style={style}><b>20</b></CalendarDay>
</Gapped>
```

### Функции для сравнения строковых дат

```jsx harmony
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

<Table>
  <Row code={`isEqual("${date_a}", "${date_a}")`} />
  <Row code={`isLess("${date_a}", "${date_b}")`} />
  <Row code={`isLessOrEqual("${date_a}", "${date_b}")`} />
  <Row code={`isGreater("${date_b}", "${date_a}")`} />
  <Row code={`isGreaterOrEqual("${date_b}", "${date_a}")`} />
  <Row code={`isBetween("${date_b}", "${date_a}", "${date_b}")`} />
</Table>

```

```typescript static
export function isEqual(left: string, right: string): boolean;
export function isLess(left: string, right: string): boolean;
export function isLessOrEqual(left: string, right: string): boolean;
export function isGreater(left: string, right: string): boolean;
export function isGreaterOrEqual(left: string, right: string): boolean;
export function isBetween(
  date: string,
  left?: string,
  right?: string,
): boolean;

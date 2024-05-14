Компонент для отрисовки дня в Calendar. Полезен при использовании вместе с его пропом `renderDay`.

```jsx harmony
import { CalendarDay, Gapped } from '@skbkontur/react-ui';
import * as CDS from '@skbkontur/react-ui/components/Calendar/CalendarDateShape';

const date = CDS.fromString('20.05.2024');
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

CalendarDateShape. Набор функций и типов для работы с числовым представлением дат и пропом `date`.

```jsx harmony
import * as CDS from '@skbkontur/react-ui/components/Calendar/CalendarDateShape';

const date_a = CDS.create(10, 3, 2017);
const date_b = CDS.create(11, 3, 2017);
const date_c = CDS.create(12, 3, 2017);

const Table = ({ children }) => (
    <table border='1' cellSpacing='0' cellPadding='8'>
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
        <td>{code}</td>
        <td>{JSON.stringify(eval(code), null, 2)}</td>
    </tr>
);

<Table>
    <Row code='CDS.create(10, 3, 2017)' />
    <Row code='CDS.fromString("10.04.2017")' />
    <Row code='CDS.toString({ date: 10, month: 3, year: 2017 })' />
    <Row code='CDS.isEqual(date_a, date_a)' />
    <Row code='CDS.isLess(date_a, date_b)' />
    <Row code='CDS.isLessOrEqual(date_a, date_b)' />
    <Row code='CDS.isGreater(date_b, date_a)' />
    <Row code='CDS.isGreaterOrEqual(date_b, date_a)' />
    <Row code='CDS.isBetween(date_b, date_a, date_c)' />
</Table>

```

```typescript static
export interface CalendarDateShape {
  year: number;
  month: number;
  date: number;
}
export function create(date: number, month: number, year: number): CalendarDateShape;
export function fromString(dateString: string): CalendarDateShape;
export function toString({ date, month, year }: CalendarDateShape): string;
export function isEqual: Nullable<CalendarDateShape>, b: Nullable<CalendarDateShape>): boolean;
export function isLess(left: CalendarDateShape, right: CalendarDateShape): boolean;
export function isLessOrEqual(left: CalendarDateShape, right: CalendarDateShape): boolean;
export function isGreater(left: CalendarDateShape, right: CalendarDateShape): boolean;
export function isGreaterOrEqual(left: CalendarDateShape, right: CalendarDateShape): boolean;
export function isBetween(
  date: CalendarDateShape,
  left?: Nullable<CalendarDateShape>,
  right?: Nullable<CalendarDateShape>,
): boolean;
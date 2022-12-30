

Календарь с заданной датой

```jsx harmony
import { Checkbox } from '@skbkontur/react-ui';

const [value, setValue] = React.useState({ year: 2021, month: 11, date: 1 });
const [hasExtraStyles, setHasExtraStyles] = React.useState(true);

<div style={{ display: 'flex', flexDirection: 'column' }}>
  <Checkbox
    checked={hasExtraStyles}
    onValueChange={setHasExtraStyles}
  >
    Включить дополнительные стили
  </Checkbox>
  <div>
    <Calendar
      style={hasExtraStyles ? {
        border: '1px solid black',
      } : {
        border: '1px solid transparent',
      }}
      value={value}
      onValueChange={setValue}
      enableTodayLink
    />
  </div>
</div>;
```


#### Локали по умолчанию

```typescript static
interface DatePickerLocale {
  today?: string;
  months?: string[];


const ru_RU = {
  today: 'Сегодня',
  months: [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ],
;

const en_GB = {
  today: 'Today',
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
};
```

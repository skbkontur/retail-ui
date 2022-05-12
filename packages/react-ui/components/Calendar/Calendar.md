

```jsx harmony
const [value, setValue] = React.useState({ year: 2021, month: 11, date: 1 });
<Calendar value={value} onPick={setValue} enableTodayLink />;
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

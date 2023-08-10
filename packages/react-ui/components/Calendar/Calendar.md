

Календарь с заданной датой

```jsx harmony
const [date, setDate] = React.useState("01.11.2021");

<Calendar
  value={date}
  onValueChange={setDate}
/>
```

Вне зависимости от того, какая дата выбрана в календаре в данный момент - можно изменить отображение начального года и месяца с помощью пропов `initialMonth` и `initialYear`

```jsx harmony
import { Checkbox } from '@skbkontur/react-ui';

const [date, setDate] = React.useState("11.12.2021");
const initialMonth = 7;
const initialYear = 2000;

<div style={{ display: 'flex' }}>
  <Calendar
    value={date}
    onValueChange={setDate}
    initialMonth={initialMonth}
    initialYear={initialYear}
  />
  <div style={{ fontSize: '16px' }}>
    <p>Выбранная дата: {date}</p>
    <p>Начальный месяц: {initialMonth}</p>
    <p>Начальный год: {initialYear}</p>
  </div>
</div>
```

### `isHoliday`

В компонент можно передать функцию `isHoliday`, которая будет получать день строкой формата `dd.mm.yyyy` и флаг `isWeekend`, и должна вернуть `true` для выходного и `false` для рабочего дня.

```jsx harmony
import * as DatePickerHelpers from '../DatePicker/DatePickerHelpers';

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
  const today = new Date();
  const holiday = {
    date: today.getDate(),
    month: today.getMonth(),
    year: today.getFullYear(),
  };

  if (holidays.includes(day)) {
    return !isWeekend;
  }

  return isWeekend;
};

<Calendar isHoliday={isHoliday} value={date} onValueChange={setDate} />;
```


Календарю можно задать кастомную высоту с помощью переменной темы `calendarWrapperHeight`
- Базовая высота календаря - `330px`
- Максимальная высота календаря - `450px`
```jsx harmony
import { ThemeContext } from '@skbkontur/react-ui/lib/theming/ThemeContext';
import { ThemeFactory } from '@skbkontur/react-ui/lib/theming/ThemeFactory';

const [date, setDate] = React.useState("01.11.2021");
const theme = React.useContext(ThemeContext);

<ThemeContext.Provider
  value={ThemeFactory.create({ calendarWrapperHeight: '450px' }, theme)}
  >
  <Calendar
    value={date}
    onValueChange={setDate}
  />
</ThemeContext.Provider>
```

### Доступные описания элементов
`<Calendar />` по умолчанию предоставляет доступные описания, которые позволяют пользователям скрин-ридеров навигироваться по контролу. Все описания переведены на два языка: русский и английский.

У вас есть возможность контролировать текст описания с помощью механизма `LocaleContext`:
```jsx harmony
import { LocaleContext } from '@skbkontur/react-ui';

const [date, setDate] = React.useState('24.08.2022');

<LocaleContext.Provider value={{ locale: { Calendar: { 'day-cell-choose-date-aria-label' : 'Дата в фокусе' } } }}>
  <Calendar value={date} onValueChange={setDate} />
</LocaleContext.Provider>
```

#### Локали по умолчанию

```typescript static
interface CalendarLocale {
  months?: string[];
  'select-month-aria-label'?: string;
  'select-year-aria-label'?: string;
  'select-chosen-aria-label'?: string;
  'day-cell-choose-date-aria-label'?: string;
}

const ru_RU = {
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
  'select-month-aria-label': 'месяц',
  'select-year-aria-label': 'год',
  'select-chosen-aria-label': 'Выбранный',
  'day-cell-choose-date-aria-label': 'Выбрать дату',
};

const en_GB = {
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
  'select-month-aria-label': 'месяц',
  'select-year-aria-label': 'год',
  'select-chosen-aria-label': 'Выбранный',
  'day-cell-choose-date-aria-label': 'Выбрать дату',
};
```



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

В календаре можно задать период
```jsx harmony
const [min, setMin] = React.useState('05.08.2023');
const [max, setMax] = React.useState('30.08.2023');
const [periodStartDate, setPeriodStartDate] = React.useState('10.08.2023');
const [periodEndDate, setPeriodEndDate] = React.useState('20.08.2023');
const [focus, setFocus] = React.useState('periodStartDate');

const getFocusStyle = (type) => focus === type ? { background: '#80A6FF' } : {};

const periodClearing = () => {
  setFocus('periodStartDate');
  setPeriodStartDate('');
  setPeriodEndDate('');
};

const onValueChange = (date) => {
  if (focus === 'periodEndDate') {
    setPeriodEndDate(date);
    setFocus('periodStartDate');
  }
  if (focus === 'periodStartDate') {
    setPeriodStartDate(date);
    setFocus('periodEndDate');
  }
}

<div style={{ display: 'flex'}}>
  <Calendar
    value={periodStartDate || periodEndDate}
    periodStartDate={periodStartDate}
    periodEndDate={periodEndDate}
    minDate={min}
    maxDate={max}
    onValueChange={onValueChange}
  />
  <div style={{ display: 'flex', flexDirection: 'column'}}> 
    <label>
      Свободные дни с: <input type="text" value={min} onChange={(e) => setMin(e.target.value)} />
    </label>
    <label>
      Свободные дни до: <input type="text" value={max} onChange={(e) => setMax(e.target.value)} />
    </label>
    <br />
    <label>
      Начало периода:
      <input
        type="text"
        style={getFocusStyle('periodStartDate')}
        onClick={() => setFocus('periodStartDate')}
        value={periodStartDate}
        onChange={(e) => {
          setPeriodStartDate(e.target.value);
        }}
      />
    </label>
    <label>
      Окончание периода:
      <input
        type="text"
        onClick={() => setFocus('periodEndDate')}
        style={getFocusStyle('periodEndDate')}
        value={periodEndDate}
        onChange={(e) => setPeriodEndDate(e.target.value)}
      />
    </label>
    <br />
    <button data-tid="period_clearing" onClick={periodClearing} style={{width: 250}}>
      Очистить период
    </button>
  </div>
</div>
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

#### Локали по умолчанию

```typescript static
interface CalendarLocale {
  months?: string[];
  selectMonthAriaLabel?: string;
  selectYearAriaLabel?: string;
  selectChosenAriaLabel?: string;
  dayCellChooseDateAriaLabel?: string;
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
  selectMonthAriaLabel: 'месяц',
  selectYearAriaLabel: 'год',
  selectChosenAriaLabel: 'Выбранный',
  dayCellChooseDateAriaLabel: 'Выбрать дату',
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
  selectMonthAriaLabel: 'месяц',
  selectYearAriaLabel: 'год',
  selectChosenAriaLabel: 'Выбранный',
  dayCellChooseDateAriaLabel: 'Выбрать дату',
};
```

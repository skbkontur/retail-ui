

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
import { DateInput, Gapped, Radio, RadioGroup } from '@skbkontur/react-ui'

const [periodStartDate, setPeriodStartDate] = React.useState('10.08.2022');
const [periodEndDate, setPeriodEndDate] = React.useState('20.08.2022');
const [focus, setFocus] = React.useState('periodStartDate');

const getFocusStyle = (type) => focus === type ? { borderColor: '#80A6FF' } : {};

const onValueChange = (date) => {
  if (focus === 'periodEndDate') {
    setPeriodEndDate(date);
  }
  if (focus === 'periodStartDate') {
    setPeriodStartDate(date);
  }
}
<div style={{ display: 'flex' }}>
  <div style={{ display: 'flex', flexDirection: 'column'}}>
    <div style={{marginBottom: 2}}>
      <DateInput
        onValueChange={value => setPeriodStartDate(value)}
        style={getFocusStyle('periodStartDate')}
        onClick={() => setFocus('periodStartDate')}
        value={periodStartDate}
      />
      -
      <DateInput
        onValueChange={value => setPeriodEndDate(value)}
        onClick={() => setFocus('periodEndDate')}
        style={getFocusStyle('periodEndDate')}
        value={periodEndDate}
      />
    </div>
    <Calendar
      value={periodStartDate || periodEndDate}
      periodStartDate={periodStartDate}
      periodEndDate={periodEndDate}
      onValueChange={onValueChange}
      minDate={!periodEndDate && periodStartDate}
      maxDate={!periodStartDate && periodEndDate}
    />
  </div>
  <RadioGroup onValueChange={(value) => setFocus(value)} style={{marginLeft: 4}}>
    <Gapped gap={3} vertical>
      <Radio value="periodStartDate" checked={ focus === 'periodStartDate' }>
        Редактировать начало периода
      </Radio>
      <Radio value="periodEndDate" checked={ focus === 'periodEndDate' }>
        Редактировать конец периода
      </Radio>
    </Gapped>
  </RadioGroup>
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

### Кастомизирование отображения даты

```jsx harmony
import MagicWand from '@skbkontur/react-icons/MagicWand';

const [value, setValue] = React.useState('12.05.2022');

const CustomDayItem = ({ date }) => {
  const isEven = (num) => num % 2 === 0;

  return (
    <div>
      {isEven(date.date) ? <MagicWand /> : date.date}
    </div>
  );
};

const renderDay = (date) =>  <CustomDayItem date={date} />;

<Calendar value={value} onValueChange={setValue} renderDay={renderDay} />;
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

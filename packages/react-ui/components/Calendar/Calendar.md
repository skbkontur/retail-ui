

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

### Кастомный рендер дня

```jsx harmony
import { Tooltip, Hint, CalendarDay } from '@skbkontur/react-ui';

const initialValue = "02.09.2023";

const [value, setValue] = React.useState(initialValue);

const renderDay = (props) => {
  const { date, month, year } = props.date;

  if (month == 8 && date > 7 && date < 11) {
    return (
      <Tooltip render={() => "Кастомный день"}>
        <CalendarDay {...props} style={{ background: 'darkgray' }} />
      </Tooltip>
    );
  }

  if (month == 8 && date == 20) {
    return (
      <Hint text={date} pos="right middle">
        <CalendarDay {...props}>
          <b style={{color: 'orange'}}>#</b>
        </CalendarDay>
      </Hint>
    );
  }

  return <CalendarDay {...props} />
};

<Calendar
  value={value}
  onValueChange={setValue}
  renderDay={renderDay}
/>;
```

### Компонент CalendarDay
Доступен публичный компонет `CalendarDay` и интерфейс его пропов `CalendarDayProps`. Может быть полезен для использования вместе с пропом `renderDay`.

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

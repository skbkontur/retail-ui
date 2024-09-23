### Календарь с заданной датой

```jsx harmony
const [date, setDate] = React.useState("01.11.2021");

<Calendar
  value={date}
  onValueChange={setDate}
/>
```

### initialMonth и initialYear
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

### isHoliday

В компонент можно передать функцию `isHoliday`, которая будет получать день строкой формата `dd.mm.yyyy` и флаг `isWeekend`, и должна вернуть `true` для выходного и `false` для рабочего дня.

```jsx harmony
import * as DatePickerHelpers from '@skbkontur/react-ui/components/DatePicker/DatePickerHelpers';

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

### Высота
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
Для кастомнизации дней в календаре используется метод `renderDay` и компонент [Calendar.Day](#/Components/Calendar/Calendar.Day)

```jsx harmony
import { Tooltip, Hint, CalendarDay } from '@skbkontur/react-ui';

const initialValue = "02.09.2023";

const [value, setValue] = React.useState(initialValue);

const renderDay = (props) => {
  const [date, month, year] = props.date.split('.').map(Number);

  if (month == 9 && date > 12 && date < 16) {
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

### Календарь с ценами
Пример с кастомизацией темы и кастомным рендером дня.

```jsx harmony
import { CalendarDay } from '@skbkontur/react-ui';
import { ThemeContext } from '@skbkontur/react-ui/lib/theming/ThemeContext';
import { ThemeFactory } from '@skbkontur/react-ui/lib/theming/ThemeFactory';

const theme = React.useContext(ThemeContext);

function renderDay(props) {
  const [date, month] = props.date.split('.').map(Number);
  const randomDay = date % 6 === 0 || date % 7 === 0 || date % 8 === 0;
  const randomPrice = Math.round((date / month) * 1000);

  return (
    <CalendarDay {...props}>
      <div style={{ fontSize: theme.calendarCellFontSize }}>{date}</div>
      <div style={{ fontSize: '11px', fontFeatureSettings: 'tnum', fontVariantNumeric: 'tabular-nums' }}>
        {randomDay ? <>{randomPrice}&thinsp;₽</> : <span style={{ color: theme.tokenTextColorDisabled }}>—</span>}
      </div>
    </CalendarDay>
  );
}

const [value, setValue] = React.useState(null);

<ThemeContext.Provider
  value={ThemeFactory.create({
    calendarCellSize: '56px',
    calendarCellLineHeight: '1.5',
    calendarWrapperHeight: '600px',
    calendarCellBorderRadius: '8px'
  }, theme)}
>
  <Calendar value={value} renderDay={renderDay} onValueChange={setValue} />
</ThemeContext.Provider>
```

### Локали по умолчанию

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


### Скролл к месяцу

```jsx harmony
import { Button, Gapped } from '@skbkontur/react-ui';

const initialValue = "02.09.2023";
const [value, setValue] = React.useState(initialValue);
const calendarRef = React.useRef(null);

<>
  <Gapped gap={8} verticalAlign="top">
    <Calendar
      value={value}
      ref={calendarRef}
      onValueChange={setValue}
    />

    <Gapped vertical gap={8}>
      <Button onClick={() => calendarRef.current.scrollToMonth(1, 2023)}>
        I квартал
      </Button>
      <Button onClick={() => calendarRef.current.scrollToMonth(4, 2023)}>
        II квартал
      </Button>
      <Button onClick={() => calendarRef.current.scrollToMonth(7, 2023)}>
        III квартал
      </Button>
      <Button onClick={() => calendarRef.current.scrollToMonth(10, 2023)}>
        IV квартал
      </Button>
    </Gapped>
  </Gapped>
</>;
```

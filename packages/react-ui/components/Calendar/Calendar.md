

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

### Период дат

В календаре можно задать период пропами `periodStartDate` и `periodEndDate`.
Если задан только один из пропов, то при наведении мышью будет подсвечиваться период между заданным пропом и датой под указателем мыши.
```jsx harmony
import { Button, DateInput, Gapped, Radio, RadioGroup, Group } from '@skbkontur/react-ui';
import { XCircleIcon16Light } from '@skbkontur/icons/XCircleIcon16Light';
import { ArrowShapeALeftIcon16Solid } from '@skbkontur/icons/ArrowShapeALeftIcon16Solid';
import { ArrowShapeALeftIcon16Light } from '@skbkontur/icons/ArrowShapeALeftIcon16Light';

const [periodStartDate, setPeriodStartDate] = React.useState('10.08.2022');
const [periodEndDate, setPeriodEndDate] = React.useState('20.08.2022');
const [period, setPeriod] = React.useState('start');

const onValueChange = (date) => {
  if (period === 'start') {
    setPeriodStartDate(date);
  }
  if (period === 'end') {
    setPeriodEndDate(date);
  }
}
<Gapped verticalAlign="top" wrap>
  <Calendar
    value={periodStartDate || periodEndDate}
    periodStartDate={periodStartDate}
    periodEndDate={periodEndDate}
    onValueChange={onValueChange}
    minDate="05.08.2022"
  />
  <RadioGroup value={period} onValueChange={setPeriod}>
    <Gapped vertical gap={40}>
      <Gapped gap={0} vertical>
        <span>Как сохранять дату из <tt>onValueChange</tt></span>
        <Radio value="start">Как начало периода</Radio>
        <Radio value="end">Как окончание периода</Radio>
      </Gapped>
      <Gapped vertical>
        <span>Начало периода</span>
        <Gapped>
          <Group>
            <DateInput
              onValueChange={setPeriodStartDate}
              value={periodStartDate}
            />
            <Button icon={<XCircleIcon16Light />} onClick={() => setPeriodStartDate(null)} />
          </Group>
        </Gapped>
      </Gapped>
      <Gapped vertical>
        <span>Окончание периода</span>
        <Gapped>
          <Group>
            <DateInput
              onValueChange={setPeriodEndDate}
              value={periodEndDate}
            />
            <Button icon={<XCircleIcon16Light />} onClick={() => setPeriodEndDate(null)} />
          </Group>
        </Gapped>
      </Gapped>
    </Gapped>
  </RadioGroup>
</Gapped>
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
import { Tooltip, Hint } from '@skbkontur/react-ui';
import { ToolMagicWandIcon } from '@skbkontur/icons/ToolMagicWandIcon';
import { ShapeCircleMIcon } from '@skbkontur/icons/ShapeCircleMIcon';

const initialValue = "02.09.2023";
const [day, month, year] = initialValue.split('.').map(Number);

const [value, setValue] = React.useState(initialValue);

const renderDay = (date, defaultProps, RenderDefault) => {
  const [dd, mm, yyyy] = date.split('.').map(Number);

  if (mm === month && dd > 7 && dd < 11) {
    return (
      <Tooltip render={() => "Кастомный период"}>
        <RenderDefault
          {...defaultProps}
          isDayInSelectedPeriod={true}
          isPeriodStart={dd === 8}
          isPeriodEnd={dd === 10}
        />
      </Tooltip>
    );
  }

  if (mm === month && dd === 20) {
    return (
      <Hint text={date} pos="right middle">
        <RenderDefault {...defaultProps}>
          <ShapeCircleMIcon size={12} align="center" weight="solid" color="orange" />
        </RenderDefault>
      </Hint>
    );
  }

  return <RenderDefault {...defaultProps} />
};

<Calendar
  value={value}
  onValueChange={setValue}
  renderDay={renderDay}
/>;
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

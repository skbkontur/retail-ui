Компонент `DatePicker` принимает в `value` строку формата `dd.mm.yyyy`.
При вводе строки в поле ввода, возвращает строку без маски.

Имеется статический метод `DatePicker.validate`, который проверяет,
что введенная дата корректна

```ts static
DatePicker.validate: (value: string, range?: { minDate?: string; maxDate?: string }) => boolean
```

### Валидация

Пример с обработкой ошибок, когда пользователь ввел невалидную дату.

```jsx harmony
import { Gapped, Tooltip } from '@skbkontur/react-ui';
import { ViewDateInputValidateChecks } from '@skbkontur/react-ui/components/DateInput/ViewDateInputValidateChecks';

const [value, setValue] = React.useState();
const [error, setError] = React.useState(false);
const [tooltip, setTooltip] = React.useState(false);

const minDate = '22.12.2012';
const maxDate = '02.05.2018';

const unvalidate = () => {
  setError(false);
  setTooltip(false);
};

const validate = () => {
  const errorNew = !!value && !DatePicker.validate(value, { minDate: minDate, maxDate: maxDate });
  setError(errorNew);
  setTooltip(errorNew);
};

let removeTooltip = () => setTooltip(false);

<Gapped gap={10} vertical>
  <ViewDateInputValidateChecks value={value} minDate={minDate} maxDate={maxDate} />
  <pre>
    minDate = {minDate}
    <br />
    maxDate = {maxDate}
  </pre>

  <Tooltip trigger={tooltip ? 'opened' : 'closed'} render={() => 'Невалидная дата'} onCloseClick={removeTooltip}>
    <DatePicker
      error={error}
      value={value}
      onValueChange={setValue}
      onFocus={unvalidate}
      onBlur={validate}
      minDate={minDate}
      maxDate={maxDate}
      enableTodayLink
    />
  </Tooltip>
</Gapped>;
```

Очистить значение в `DatePicker`'е можно с помощью пустой строки, `null` или `undefined`
```jsx harmony
import { Button, Group } from '@skbkontur/react-ui';

const [value, setValue] = React.useState('24.08.2022');

<Group>
  <DatePicker
    value={value}
    onValueChange={setValue}
    enableTodayLink
  />
  <Button onClick={() => setValue(null)}>Null</Button>
  <Button onClick={() => setValue(undefined)}>Undefined</Button>
  <Button onClick={() => setValue('')}>Пустая строка</Button>
</Group>;
```

### `isHoliday`

В компонент можно передать функцию `isHoliday`, которая будет получать день строкой формата `dd.mm.yyyy` и флаг `isWeekend`, и должна вернуть `true` для выходного и `false` для рабочего дня.

```jsx harmony
import * as DatePickerHelpers from './DatePickerHelpers';

const [value, setValue] = React.useState();

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

<DatePicker isHoliday={isHoliday} value={value} onValueChange={setValue} enableTodayLink />;
```

### Производственный календарь

Пример обработки производственного календаря от `data.gov.ru`

<details><summary>`data.gov.ru`</summary>

Docs:
https://data.gov.ru/api-portala-otkrytyh-dannyh-rf-polnoe-rukovodstvo

Request:

```md
https://data.gov.ru/api/json/dataset/7708660670-proizvcalendar/version/20151123T183036/content?search=2021&access_token=31de6d0b90f51a7aa3ee2d518d50f4e9
```

Response:

```json
[
  {
    "Год/Месяц": "2021",
    "Январь": "1,2,3,4,5,6,7,8,9,10,16,17,23,24,30,31",
    "Февраль": "6,7,13,14,20,21,22*,23,27,28",
    "Март": "6,7,8*,13,14,20,21,27,28",
    "Апрель": "3,4,10,11,17,18,24,25,30*",
    "Май": "1,2,3+,8,9,10+,15,16,22,23,29,30",
    "Июнь": "5,6,11*,12,13,14+,19,20,26,27",
    "Июль": "3,4,10,11,17,18,24,25,31",
    "Август": "1,7,8,14,15,21,22,28,29",
    "Сентябрь": "4,5,11,12,18,19,25,26",
    "Октябрь": "2,3,9,10,16,17,23,24,30,31",
    "Ноябрь": "3*,4,6,7,13,14,20,21,27,28",
    "Декабрь": "4,5,11,12,18,19,25,26,31*",
    "Всего рабочих дней": "249",
    "Всего праздничных и выходных дней": "116",
    "Количество рабочих часов при 40-часовой рабочей неделе": "1987",
    "Количество рабочих часов при 36-часовой рабочей неделе": "1787.8",
    "Количество рабочих часов при 24-часовой рабочей неделе": "1190.2"
  }
]
```

</details>

```jsx harmony
const today = new Date();
const year = today.getFullYear();
const response = [
  {
    'Год/Месяц': '2021',
    Январь: '1,2,3,4,5,6,7,8,9,10,16,17,23,24,30,31',
    Февраль: '6,7,13,14,20,21,22*,23,27,28',
    Март: '6,7,8*,13,14,20,21,27,28',
    Апрель: '3,4,10,11,17,18,24,25,30*',
    Май: '1,2,3+,8,9,10+,15,16,22,23,29,30',
    Июнь: '5,6,11*,12,13,14+,19,20,26,27',
    Июль: '3,4,10,11,17,18,24,25,31',
    Август: '1,7,8,14,15,21,22,28,29',
    Сентябрь: '4,5,11,12,18,19,25,26',
    Октябрь: '2,3,9,10,16,17,23,24,30,31',
    Ноябрь: '3*,4,6,7,13,14,20,21,27,28',
    Декабрь: '4,5,11,12,18,19,25,26,31*',
    'Всего рабочих дней': '249',
    'Всего праздничных и выходных дней': '116',
    'Количество рабочих часов при 40-часовой рабочей неделе': '1987',
    'Количество рабочих часов при 36-часовой рабочей неделе': '1787.8',
    'Количество рабочих часов при 24-часовой рабочей неделе': '1190.2',
  },
];
let result = [];
let holidays = [];

if (response.length !== 0) {
  result = Object.values(
    response.length > 1 ? response.find(data => data['Год/Месяц'] === year.toString()) || response[0] : response[0],
  ).slice(1, 13);
}
result.forEach((month, index) => {
  month
    .split(',')
    .filter(item => /^\d*$/.test(item))
    .forEach(day => {
      holidays.push(`${day.padStart(2, 0)}.${(index + 1).toString().padStart(2, 0)}.${year}`);
    });
});

const isHoliday = (date, isWeekend) => holidays.includes(date) || isWeekend;

<DatePicker isHoliday={isHoliday} onValueChange={() => void 0} enableTodayLink />;
```

### Ручное форматирование даты

```jsx harmony
import { DateOrder, DateSeparator, Gapped, LocaleContext, Select, LangCodes } from '@skbkontur/react-ui';

class DatePickerFormatting extends React.Component {
  constructor() {
    this.state = {
      order: DateOrder.YMD,
      separator: 'Dot',
      value: '21.12.2012',
    };
  }

  render() {
    return (
      <Gapped vertical gap={10}>
        <div>
          <span style={{ width: '300px', display: 'inline-block' }}>
            Порядок компонентов (<tt>DateOrder</tt>)
          </span>
          <Select
            value={this.state.order}
            items={Object.keys(DateOrder)}
            onValueChange={order => this.setState({ order })}
          />
        </div>
        <div>
          <span style={{ width: '300px', display: 'inline-block' }}>
            Разделитель (<tt>DateSeparator</tt>)
          </span>
          <Select
            value={this.state.separator}
            items={Object.keys(DateSeparator)}
            onValueChange={separator => this.setState({ separator })}
          />
        </div>
        <LocaleContext.Provider
          value={{
            langCode: LangCodes.ru_RU,
            locale: {
              DatePicker: {
                separator: DateSeparator[this.state.separator],
                order: this.state.order,
              },
            },
          }}
        >
          <DatePicker onValueChange={value => this.setState({ value })} value={this.state.value} />
        </LocaleContext.Provider>
      </Gapped>
    );
  }
}

<DatePickerFormatting />;
```

#### Локали по умолчанию

```typescript static
interface DatePickerLocale {
  today?: string;
  months?: string[];
  order?: DateOrder;
  separator?: DateSeparator;
}

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
  order: DateOrder.DMY,
  separator: DateSeparator.Dot,
};

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
  order: DateOrder.MDY,
  separator: DateSeparator.Slash,
};
```

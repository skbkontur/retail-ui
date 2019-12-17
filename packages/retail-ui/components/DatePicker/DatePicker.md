Компонент `DatePicker` принимает в `value` строку формата `dd.mm.yyyy`.
При вводе строки в поле ввода, возвращает строку без маски.

Имеется статический метод `DatePicker.validate`, который проверяет,
что введенная дата корректна

```jsx static
DatePicker.validate: (value: string, range?: { minDate?: string; maxDate?: string }) => boolean
```

### Валидация

Пример с обработкой ошибок, когда пользователь ввел невалидную дату.

```jsx
const { ViewDateInputValidateChecks } = require('../DateInput/ViewDateInputValidateChecks');

let initialState = {
  value: '',
  error: false,
  tooltip: false,
  minDate: '22.12.2012',
  maxDate: '02.05.2018',
};

let handleChange = (_, value) => setState({ value });

let unvalidate = () => setState({ error: false, tooltip: false });

let validate = () =>
  setState(state => {
    const error =
      !!state.value && !DatePicker.validate(state.value, { minDate: state.minDate, maxDate: state.maxDate });
    return { error, tooltip: error };
  });

let removeTooltip = () => setState(state => ({ tooltip: false }));

<Gapped gap={10} vertical>
  <ViewDateInputValidateChecks value={state.value} minDate={state.minDate} maxDate={state.maxDate} />
  <pre>
    minDate = {state.minDate}
    <br />
    maxDate = {state.maxDate}
  </pre>

  <Tooltip trigger={state.tooltip ? 'opened' : 'closed'} render={() => 'Невалидная дата'} onCloseClick={removeTooltip}>
    <DatePicker
      error={state.error}
      value={state.value}
      onChange={handleChange}
      onFocus={unvalidate}
      onBlur={validate}
      minDate={state.minDate}
      maxDate={state.maxDate}
      enableTodayLink
    />
  </Tooltip>
</Gapped>;
```

### `isHoliday`

В компонент можно передать функцию `isHoliday`, которая будет получать день строкой формата `dd.mm.yyyy` и флаг `isWeekend`, и должна вернуть `true` для выходного и `false` для рабочего дня.

```jsx
const DatePickerHelpers = require('./DatePickerHelpers');
const initialState = {
  value: '',
};

const handleChange = (_, value) => setState({ value });

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

<DatePicker isHoliday={isHoliday} value={state.value} onChange={handleChange} enableTodayLink />;
```

### Производственный календарь

Пример обработки производственного календаря от `data.gov.ru`

<details><summary>`data.gov.ru`</summary>

Docs:
https://data.gov.ru/api-portala-otkrytyh-dannyh-rf-polnoe-rukovodstvo

API:

```jsx static
https://data.gov.ru/api/json/dataset/7708660670-proizvcalendar/version/20151123T183036/content?search=2019&access_token=31de6d0b90f51a7aa3ee2d518d50f4e9
```

Response:

```jsx static
[
  {
    'Год/Месяц': '2019',
    Январь: '1,2,3,4,5,6,7,8,12,13,19,20,26,27',
    Февраль: '2,3,9,10,16,17,22*,23,24',
    Март: '2,3,7*,8,9,10,16,17,23,24,30,31',
    Апрель: '6,7,13,14,20,21,27,28,30*',
    Май: '1,2,3,4,5,8*,9,10,11,12,18,19,25,26',
    Июнь: '1,2,8,9,11*,12,15,16,22,23,29,30',
    Июль: '6,7,13,14,20,21,27,28',
    Август: '3,4,10,11,17,18,24,25,31',
    Сентябрь: '1,7,8,14,15,21,22,28,29',
    Октябрь: '5,6,12,13,19,20,26,27',
    Ноябрь: '2,3,4,9,10,16,17,23,24,30',
    Декабрь: '1,7,8,14,15,21,22,28,29,31*',
    'Всего рабочих дней': '247',
    'Всего праздничных и выходных дней': '118',
    'Количество рабочих часов при 40-часовой рабочей неделе': '1970',
    'Количество рабочих часов при 36-часовой рабочей неделе': '1772.4',
    'Количество рабочих часов при 24-часовой рабочей неделе': '1179.6',
  },
];
```

</details>

```jsx
const today = new Date();
const year = today.getFullYear();
const response = [
  {
    'Год/Месяц': '2019',
    Январь: '1,2,3,4,5,6,7,8,12,13,19,20,26,27',
    Февраль: '2,3,9,10,16,17,22*,23,24',
    Март: '2,3,7*,8,9,10,16,17,23,24,30,31',
    Апрель: '6,7,13,14,20,21,27,28,30*',
    Май: '1,2,3,4,5,8*,9,10,11,12,18,19,25,26',
    Июнь: '1,2,8,9,11*,12,15,16,22,23,29,30',
    Июль: '6,7,13,14,20,21,27,28',
    Август: '3,4,10,11,17,18,24,25,31',
    Сентябрь: '1,7,8,14,15,21,22,28,29',
    Октябрь: '5,6,12,13,19,20,26,27',
    Ноябрь: '2,3,4,9,10,16,17,23,24,30',
    Декабрь: '1,7,8,14,15,21,22,28,29,31*',
    'Всего рабочих дней': '247',
    'Всего праздничных и выходных дней': '118',
    'Количество рабочих часов при 40-часовой рабочей неделе': '1970',
    'Количество рабочих часов при 36-часовой рабочей неделе': '1772.4',
    'Количество рабочих часов при 24-часовой рабочей неделе': '1179.6',
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

<DatePicker isHoliday={isHoliday} enableTodayLink />;
```

### Ручное форматирование даты

```jsx
const { default: LocaleProvider, DateOrder, DateSeparator } = require('../LocaleProvider');

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
            onChange={(_, order) => this.setState({ order })}
          />
        </div>
        <div>
          <span style={{ width: '300px', display: 'inline-block' }}>
            Разделитель (<tt>DateSeparator</tt>)
          </span>
          <Select
            value={this.state.separator}
            items={Object.keys(DateSeparator)}
            onChange={(_, separator) => this.setState({ separator })}
          />
        </div>
        <LocaleProvider
          locale={{
            DatePicker: {
              separator: DateSeparator[this.state.separator],
              order: this.state.order,
            },
          }}
        >
          <DatePicker onChange={(a, value) => this.setState({ value })} value={this.state.value} />
        </LocaleProvider>
      </Gapped>
    );
  }
}

<DatePickerFormatting />;
```

#### Локали по умолчанию (см. `LocaleProvider`)

```typescript
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

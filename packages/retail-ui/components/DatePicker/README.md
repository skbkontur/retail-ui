Компонент `DatePicker` принимает в `value` строку формата `dd.mm.yyyy`.
При вводе строки в поле ввода, возвращает строку без маски.

Имеется статический метод `DatePicker.validate`, который проверяет,
что введенная дата корректна

```jsx static
DatePicker.validate: (value: string) => boolean
```

Пример с обработкой ошибок, когда пользователь ввел невалидную дату.

```jsx
let initialState = {
  value: '',
  error: false,
  tooltip: false,
};

let handleChange = (_, value) => setState({ value });

let unvalidate = () => setState({ error: false, tooltip: false });

let validate = () =>
  setState(state => {
    const error = !!state.value && !DatePicker.validate(state.value);
    return { error, tooltip: error };
  });

let removeTooltip = () => setState(state => ({ tooltip: false }));

<Tooltip
  trigger={state.tooltip ? 'opened' : 'closed'}
  render={() => 'Такой даты не существует'}
  onCloseClick={removeTooltip}
>
  <DatePicker
    error={state.error}
    value={state.value}
    onChange={handleChange}
    onFocus={unvalidate}
    onBlur={validate}
    enableTodayLink
  />
</Tooltip>;
```

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

const isHoliday = (day, isWeekend) => {
  const today = new Date();
  const holiday = {
    date: today.getDate(),
    month: today.getMonth(),
    year: today.getFullYear(),
  };

  if (day === DatePickerHelpers.formatDate(holiday)) {
    return !isWeekend;
  }

  return isWeekend;
};

<DatePicker isHoliday={isHoliday} value={state.value} onChange={handleChange} enableTodayLink />;
```

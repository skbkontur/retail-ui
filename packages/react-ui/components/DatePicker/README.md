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
  tooltip: false
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

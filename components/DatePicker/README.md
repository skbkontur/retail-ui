Пример календаря с обработкой ошибок, когда пользователь ввел невалидную дату.
По умолчанию возвращает дату в UTC.

```jsx
<Gapped>
  <DatePicker
    error={state.error}
    value={state.date}
    onChange={(_, date) => setState({ date, error: false })}
    onUnexpectedInput={x =>
      setState({ error: true }, () =>
        Toast.push('Такая дата не существует: ' + x)
      )
    }
    enableTodayLink
  />
  {state.date && state.date.toLocaleString()}
</Gapped>
```

Пример календаря возвращающего дату в локальном часовом поясе

```jsx
<Gapped>
  <DatePicker
    dateTransformer={DatePicker.dateTransformers.localDateTransformer}
    error={state.error}
    value={state.date}
    onChange={(_, date) => setState({ date, error: false })}
    onUnexpectedInput={x => setState({ error: true })}
    enableTodayLink
  />
  {state.date && state.date.toLocaleString()}
</Gapped>
```

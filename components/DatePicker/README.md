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

Есть возможность работы со своим объектом даты, если указать `dateTransformer`

```jsx
const transformer = {
  to: ({ date, month, year }) => [date, month, year],
  from: ([date, month, year]) => ({ date, month, year })
};

<Gapped>
  <DatePicker
    dateTransformer={transformer}
    error={state.error}
    value={state.date}
    onChange={(_, date) => setState({ date, error: false })}
    onUnexpectedInput={x => setState({ error: true })}
    enableTodayLink
  />
  {state.date && JSON.stringify(state.date)}
</Gapped>;
```

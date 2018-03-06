```js
<DatePickerOld
  value={state.date}
  onChange={(_, date) => setState({ date })}
  onUnexpectedInput={x => (x.length ? x : null)}
/>
```

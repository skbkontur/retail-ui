```jsx
<CurrencyInput value={state.value} fractionDigits={3} onValueChange={value => setState({ value })} />
```

`fractionDigits={15}`

```jsx
<CurrencyInput value={state.value} fractionDigits={15} onValueChange={value => setState({ value })} />
```

---

### <a name="/CurrencyInput?id=why15" href="#/CurrencyInput?id=why15">Почему 15?</a>

Максимальное безопасное целочисленное значение - `9007199254740991` (16 цифр).
Убрав один разряд, мы получим "новое" максимальное безопасное значение - **`999999999999999` (15 цифр)**.

При этом десятичный резделитель может находиться в любом месте. Если целая часть равна `0`, то она не учитывается.

_Детали можно почитать здесь - <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER">MDN web docs</a>_

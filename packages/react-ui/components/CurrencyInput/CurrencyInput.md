```jsx harmony
const [value, setValue] = React.useState();

<CurrencyInput value={value} fractionDigits={3} onValueChange={setValue} />
```

Очистить значение в `CurrencyInput` можно с помощью `null` или `undefined`
```jsx harmony
import { Button, Group } from '@skbkontur/react-ui';

const [value, setValue] = React.useState();

<Group>
  <CurrencyInput value={value} onValueChange={setValue} />
  <Button onClick={() => setValue(null)}>Null</Button>
  <Button onClick={() => setValue(undefined)}>Undefined</Button>
</Group>
```

`fractionDigits={15}`

```jsx harmony
const [value, setValue] = React.useState();

<CurrencyInput value={value} fractionDigits={15} onValueChange={setValue} />
```

---

### <a name="/CurrencyInput?id=why15" href="#/CurrencyInput?id=why15">Почему 15?</a>

Максимальное безопасное целочисленное значение - `9007199254740991` (16 цифр).
Убрав один разряд, мы получим "новое" максимальное безопасное значение - **`999999999999999` (15 цифр)**.

При этом десятичный резделитель может находиться в любом месте. Если целая часть равна `0`, то она не учитывается.

_Детали можно почитать здесь - <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER">MDN web docs</a>_

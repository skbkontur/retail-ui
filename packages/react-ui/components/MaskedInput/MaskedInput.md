### Проп `mask`

Паттерн ввода. Пример с номером телефона.

```jsx harmony
const [value, setValue] = React.useState('');

<>
  <span>value: "{value}"</span>
  <br />
  <br />
  <MaskedInput
    mask="+7 (999) 999-99-99"
    placeholder="Номер телефона"
    value={value}
    onValueChange={setValue}
  />
</>
```

### Проп `alwaysShowMask`

Показывает маску всегда.

```jsx harmony
<MaskedInput mask="+7 (999) 999-99-99" alwaysShowMask />
```

### Проп `maskChar`

Символом маски может быть любой символ.

```jsx harmony
const [value, setValue] = React.useState('');

<>
  <span>value: "{value}"</span>
  <br />
  <br />
  <MaskedInput
    mask="9999 9999 9999 9999"
    maskChar="X"
    placeholder="Номер карты"
    alwaysShowMask
    value={value}
    onValueChange={setValue}
  />
</>
```

### Проп `formatChars`

При необходимости можно настроить собственный словарь.

```jsx harmony
const [value, setValue] = React.useState('');

<MaskedInput
  mask="Hh:Mm:Ss"
  alwaysShowMask
  formatChars={{
    H: '[0-2]',
    h: value.startsWith('2') ? '[0-3]' : '[0-9]',
    M: '[0-5]',
    m: '[0-9]',
    S: '[0-5]',
    s: '[0-9]',
  }}
  value={value}
  onValueChange={setValue}
/>
```

### Проп `unmask`

Можно сразу получать очищенный value, содержащий только введённый пользователем символы.

```jsx harmony
const [value, setValue] = React.useState('');

<>
  <span>value: "{value}"</span>
  <br />
  <br />
  <MaskedInput
    mask="+7 (999) 999-99-99"
    unmask
    alwaysShowMask
    value={value}
    onValueChange={setValue}
  />
</>
```

### Проп `unmask` с фигурными скобками

Если обернуть фиксированные символы в фигурные скобки, то они попадут в `value` при `unmask = true`.

```jsx harmony
const [value, setValue] = React.useState('');

<>
  <span>value: "{value}"</span>
  <br />
  <br />
  <MaskedInput
    mask="+{7} (999) 999-99-99"
    unmask
    alwaysShowMask
    value={value}
    onValueChange={setValue}
  />
</>
```

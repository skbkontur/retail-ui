#### `mask`

Маска телефона

```jsx harmony
<MaskedInput mask="+7 999 999 99 99" placeholder="Номер телефона" />
```

#### `maskChar`

может изменить символ значения с маской

```jsx harmony
<MaskedInput mask="9999 9999 9999 9999" maskChar={'X'} placeholder="Номер карты" />
```

#### `formatChars`

При необходимости можно настроить собственный словарь.

Обратите внимание на отличия со старой
- словарь прокинутый в `formatChars` сливается с дефолтными значениями, где остаётся такое **`0: /\d/`**.

Обратите внимание, что в `definitions` появляется **`0: /\d/`**.


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

#### `alwaysShowMask`

Показывает маску всегда. Placeholder в этом случае игнорируется.

```jsx harmony
<MaskedInput mask="+7 (999) 999-99-99" alwaysShowMask maskChar={'0'} placeholder="Номер телефона" />
```

#### `applyFixedPart`

Показывает фиксированную часть маски при фокусе. По умолчанию `true`.

```jsx harmony
<MaskedInput mask="+7 (999) 999-99-99" alwaysShowMask applyFixedPart={false} />
```

#### `imaskProps`*

Переопределяет пропы iMask.


Контрол используется внутри пакет [iMask](https://imask.js.org/). Пропы `mask`, `maskChar` и `formatChars` прокидываются
с необходимыми доработками. Также для обратной совместимости со старым поведением добавляется несколько других пропов.

В упрощённом виде они выглядят так:

```typescript static
mask: props.mask,
placeholderChar: props.maskChar || '_',
definitions: props.formatChars || { '9': /[0-9]/, a: /[A-Za-z]/, '*': /[A-Za-z0-9]/ },
eager: 'append',
overwrite: 'shift',
```


Это дефольное поле

##### `imaskProps.unmask`
Можно сразу получать value без фиксированных символов маски

```jsx harmony
const [value, setValue] = React.useState('');

<>
  <span>unmask value: {value}</span>
  <br />
  <MaskedInput
    mask="+7 (999) 999-99-99"
    imaskProps={{
      unmask: true
    }}
    alwaysShowMask
    value={value}
    onValueChange={setValue}
  />
</>
```

##### `imaskProps.blocks`

Пример маски времени

```jsx harmony
import IMask from 'imask';

const block = {
  mask: IMask.MaskedRange,
  from: 0,
  autofix: 'pad',
};

<MaskedInput
  mask="HH:MM:SS"
  imaskProps={{
    blocks: {
      HH: { ...block, to: 23, },
      MM: { ...block, to: 59, },
      SS: { ...block, to: 59, }
    }
  }}
  alwaysShowMask
/>
```

---


`MaskedInput` гарантирует поддержку работы 3 пропов: `mask`, `maskChar`, `formatChars` и `alwaysShowMask`.

Остальное поведение может меняться в мажорных релизах.

Используйте особенности пакета принимая всю ответственность на себя.

Например, iMask [позволяет добавлять](https://imask.js.org/guide.html#masked-pattern) в значения без форматирования
константы с помощью фигурных скобок. Использовать этот вариант **НЕ РЕКОМЕНДУЕТСЯ**.







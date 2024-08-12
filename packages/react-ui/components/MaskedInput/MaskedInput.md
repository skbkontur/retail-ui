#### `mask`

Паттерн ввода.

```jsx harmony

<>
  <MaskedInput mask="+7 (999) 999-99-99" placeholder="Номер телефона" />
</>
```

#### `showMask`

Способ отображения маски.

```jsx harmony
<>
  <code>always</code>
  <br/>
  <MaskedInput mask="+7 (999) 999-99-99" showMask="always" placeholder="Номер телефона" />
  <br/>
  <br/>
  <code>focus</code>
  <br/>
  <MaskedInput mask="+7 (999) 999-99-99" showMask="focus" placeholder="Номер телефона" />
  <br/>
  <br/>
  <code>never</code>
  <br/>
  <MaskedInput mask="+7 (999) 999-99-99" showMask="never" placeholder="Номер телефона" />
</>
```

#### `maskChar`

Символом маски может быть любой символ.

```jsx harmony
<MaskedInput
  mask="9999 9999 9999 9999"
  maskChar="X"
  placeholder="Номер карты"
  showMask="always"
/>
```

#### `formatChars`

При необходимости можно настроить собственный словарь.

Возможности `imaskProps.blocks` намного шире. Смотрите пример ниже.

```jsx harmony
const [value, setValue] = React.useState('');

<MaskedInput
  mask="Hh:Mm:Ss"
  showMask="always"
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

#### `imaskProps`*

Переопределяет пропы iMask.

---

Контрол используется внутри пакет [iMask](https://imask.js.org/). Пропы `mask`, `maskChar` и `formatChars` прокидываются
с необходимыми доработками. Также для обратной совместимости со старым поведением добавляется несколько других пропов.

Обратите внимание, что в `definitions` попадает **`0: /\d/`**. Это дефолтное поле, которое нельзя удалить. Но в старой
реализации `0` считался фиксированным символом, из-за чего приходится немного редактировать маску.

Конвертация пропов выглядит примерно так:

```typescript static
mask:            mask.replace(/0/g, '{\\0}'),
placeholderChar: props.maskChar || '_',
definitions:     props.formatChars || { '9': /[0-9]/, a: /[A-Za-z]/, '*': /[A-Za-z0-9]/ },
eager:           'append',
overwrite:       'shift',
lazy:            !(showMask === 'always' || (showMask === 'focus' && focused)),
...props.imaskProps,
```

---

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
    showMask="always"
    value={value}
    onValueChange={setValue}
  />
</>
```

##### `imaskProps.mask []`

Опциональные части маски.

```jsx harmony
const [value, setValue] = React.useState('');
const [complete, setComplete] = React.useState(false);


<MaskedInput
  mask="99-999999[99]-99"
  showMask="always"
  rightIcon={complete ? '✅' : '⬜'}
  imaskProps={{
    onAccept: (v, imask) => {
      setValue(v);
      setComplete(imask.masked.isComplete);
    }
  }}
/>
```

##### `imaskProps.mask {}`

Фиксированные части маски, которые попадут в `value` при `unmask = true`. Любой невалидный символ (например`пробел`)
переведёт каретку за фиксированный символ.

```jsx harmony
const [value, setValue] = React.useState('');
const [complete, setComplete] = React.useState(false);

<>
  <span>unmask value: {value}</span>
  <br />
  <MaskedInput
    mask="aa[aaaaaaaaaaaaaaaaa]{@}aa[aaaaaaaaaaaaaaaaa]{\.}aa[aaaa]"
    showMask="always"
    rightIcon={complete ? '✅' : '⬜'}
    imaskProps={{
      unmask: true,
      onAccept: (v, imask) => {
        setValue(v);
        setComplete(imask.masked.isComplete);
      }
    }}
  />
</>
```

##### `imaskProps.blocks`

Пример маски времени. Нажмите цифру `6`, чтобы сработало автозаполнение.

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
      SS: { ...block, to: 59, },
    }
  }}
  showMask="always"
/>
```

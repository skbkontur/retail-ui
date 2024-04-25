```jsx harmony
import { Gapped } from '@skbkontur/react-ui';

const fontStyles = [
  {
    fontStyle: 'normal',
    fontWeight: 100,
  },
  {
    fontStyle: 'normal',
    fontWeight: 300,
  },
  {
    fontStyle: 'normal',
    fontWeight: 400,
  },
  {
    fontStyle: 'normal',
    fontWeight: 500,
  },
  {
    fontStyle: 'normal',
    fontWeight: 600,
  },
  {
    fontStyle: 'normal',
    fontWeight: 700,
  },
  {
    fontStyle: 'normal',
    fontWeight: 900,
  },
  {
    fontStyle: 'italic',
    fontWeight: 100,
  },
  {
    fontStyle: 'italic',
    fontWeight: 300,
  },
  {
    fontStyle: 'italic',
    fontWeight: 400,
  },
  {
    fontStyle: 'italic',
    fontWeight: 500,
  },
  {
    fontStyle: 'italic',
    fontWeight: 600,
  },
  {
    fontStyle: 'italic',
    fontWeight: 700,
  },
  {
    fontStyle: 'italic',
    fontWeight: 900,
  }];


<Gapped vertical>
  <span>Lab Grotesque</span>
  <Gapped vertical>
    {[fontStyles.map((style, i) => <><MaskedInput key={i} mask='+7 999-999-99-99' value="123" imaskProps={{ lazy: false }}
                                               style={{ ...style }} /><tt>{JSON.stringify(style)}</tt></>)]}

  </Gapped>
</Gapped>
```

#### `mask`

Маска телефона

```jsx harmony
const [value, setValue] = React.useState('123');

<>
  <MaskedInput
    mask="+7 999-999-99-99"
    value={value}
    alwaysShowMask
    onValueChange={(v) => {
      console.log('onValueChange', v);
      // setValue(v);
    }}
    onUnexpectedInput={(v) => {
      console.log('onUnexpectedInput', v);
      // setValue(v);
    }}
    imaskProps={{ lazy: false }}
  />
</>
```

#### `maskChar`

может изменить символ значения с маской

```jsx harmony
<MaskedInput mask="9999 9999 9999 9999" maskChar={'X'} placeholder="Номер карты" />
```

#### `formatChars`

При необходимости можно настроить собственный словарь.

Возможности `imaskProps.blocks` намного шире. Смотрите пример ниже.

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
<MaskedInput mask="+7 (999) 999-99-99" alwaysShowMask placeholder="Номер телефона" />
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
mask: typeof props.mask === 'string' ? props.mask.replace(/0/g, '{\\0}') : props.mask,
placeholderChar: props.maskChar || '_',
definitions: props.formatChars || { '0': /\d/, '9': /[0-9]/, a: /[A-Za-z]/, '*': /[A-Za-z0-9]/ },
eager: 'remove',
overwrite: 'shift',
...props.imaskProps,
```

У iMask гараздо больше найстроек, и мы не можем гарантировать поддержку из всех. Но при возможности будем стараться.

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
    alwaysShowMask
    value={value}
    onValueChange={setValue}
  />
</>
```

##### `imaskProps.mask []`

Опциональные части маски

```jsx harmony
const [value, setValue] = React.useState('');
const [complete, setComplete] = React.useState(false);


<MaskedInput
  mask="99-999999[99]-99"
  alwaysShowMask
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

Фиксированные чисти маски, которые попадут в `value` при `unmask = true`. Нажимайте `пробел` для переключения области
ввода.

```jsx harmony
const [value, setValue] = React.useState('');
const [complete, setComplete] = React.useState(false);


<>
  <span>unmask value: {value}</span>
  <br />
  <MaskedInput
    mask="aa[aaaaaaaaaaaaaaaaa]{@}aa[aaaaaaaaaaaaaaaaa]{\.}aa[aaaa]"
    alwaysShowMask
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
  alwaysShowMask
/>
```

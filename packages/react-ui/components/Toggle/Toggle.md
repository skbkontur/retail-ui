### Базовый пример

```jsx harmony
const [checked, setChecked] = React.useState(false);

<Toggle checked={checked} onValueChange={setChecked}>
  {checked ? 'On' : 'Off'}
</Toggle>
```

### Тогл включенный по умолчанию

```jsx harmony
<Toggle defaultChecked>
  Включен по умолчанию
</Toggle>
```

### Надпись слева от переключателя

```jsx harmony
const [checked, setChecked] = React.useState(false);

<Toggle checked={checked} onValueChange={setChecked} captionPosition="left">
  Показывать уведомления
</Toggle>
```

### Тогл с внешним `<label/>`

```jsx harmony
import { Gapped } from '@skbkontur/react-ui';

const [checked, setChecked] = React.useState(false);

<Gapped>
  <Toggle id="toggle-1" checked={checked} onValueChange={setChecked}/>
  <label htmlFor="toggle-1">Внешний label</label>
</Gapped>
```

### Получение фокуса после загрузки страницы

```jsx harmony
<Toggle autoFocus>
  Сразу с фокусом
</Toggle>
```

### Стили

```jsx harmony
import { Gapped } from '@skbkontur/react-ui';

<Gapped gap="20px">
  <Toggle warning>
    Warning
  </Toggle>
  <Toggle error>
    Error
  </Toggle>
  <Toggle loading>
    Loading
  </Toggle>
  <Toggle disabled>
    Disabled
  </Toggle>
</Gapped>
```

### Размер

```jsx harmony
import { Gapped } from '@skbkontur/react-ui';

<Gapped vertical>
  <Toggle size="small">
    Маленький
  </Toggle>
  <Toggle size="medium">
    Средний
  </Toggle>
  <Toggle size="large">
    Большой
  </Toggle>
</Gapped>
```

### Кастомное действие при получении и потере фокуса

```jsx harmony
import { Toast } from '@skbkontur/react-ui';

<Toggle
  onFocus={() => Toast.push('Я получил фокус!')}
  onBlur={() => Toast.push('И потерял его...')}
  >
  С кастомными действиями при фокусе и его потере
</Toggle>
```

### Кастомное действие при переключении

```jsx harmony
import { Toast } from '@skbkontur/react-ui';

<Toggle onChange={() => Toast.push("Запускаю кастомное действие")}>
  Кастомное действие при переключении
</Toggle>
```

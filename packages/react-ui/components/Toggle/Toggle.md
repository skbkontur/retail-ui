Базовый пример тогла.

```jsx harmony
const [checked, setChecked] = React.useState(false);

<Toggle checked={checked} onValueChange={setChecked}>
  {checked ? 'On' : 'Off'}
</Toggle>
```

Пример тогла включенного по умолчанию.

```jsx harmony
<Toggle defaultChecked>
  Включен по умолчанию
</Toggle>
```

Тогл с надписью слева от переключателя.

```jsx harmony
const [checked, setChecked] = React.useState(false);

<Toggle checked={checked} onValueChange={setChecked} captionPosition="left">
  Показывать уведомления
</Toggle>
```

Тогл получающий фокус после загрузки страницы.

```jsx harmony
<Toggle autoFocus>
  Сразу с фокусом
</Toggle>
```

Тоглы в различных стилях.

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

Тогл с кастомным действием при получении и потере фокуса.


```jsx harmony
import { Toast } from '@skbkontur/react-ui';

<Toggle
  onFocus={() => Toast.push('Я получил фокус!')}
  onBlur={() => Toast.push('И потерял его...')}
  >
  С кастомными действиями при фокусе и его потере
</Toggle>
```


Тогл с кастомным действием при переключении.

```jsx harmony
import { Toast } from '@skbkontur/react-ui';

<Toggle onChange={() => Toast.push("Запускаю кастомное действие")}>
  Кастомное действие при переключении
</Toggle>
```

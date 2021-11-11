Базовый пример чекбокса.

```jsx harmony
const [checked, setChecked] = React.useState(false);

<Checkbox checked={checked} onValueChange={setChecked}>
  Обычный чекбокс
</Checkbox>;
```

У чекбокса есть несколько состояний.

```jsx harmony
import { Gapped } from '@skbkontur/react-ui';

const CheckboxWithState = ({children, ...props}) => {
  const [checked, setChecked] = React.useState(false);

  return (
    <Checkbox checked={checked} onValueChange={setChecked} {...props}>
      {children}
    </Checkbox>
  )
};

<Gapped vertical>
  <CheckboxWithState>
    Обычный чекбокс
  </CheckboxWithState>
  <CheckboxWithState error>
    Чекбокс в состоянии ошибки
  </CheckboxWithState>
  <CheckboxWithState warning>
    Чекбокс в состоянии предупреждения
  </CheckboxWithState>
</Gapped>
```

Пример использования методов чекбокса `focus()` и `blur()`.

```jsx harmony
import { Button, Checkbox, Gapped } from '@skbkontur/react-ui';

const [checked, setChecked] = React.useState(false);

let checkboxInstance = React.useRef(null);

<Gapped vertical>
  <Checkbox
    ref={el => checkboxInstance = el}
    checked={checked}
    onValueChange={setChecked}
    >
    Пример чекбокса с программным фокусом
  </Checkbox>
  <Gapped gap={12}>
    <Button
      onClick={() => {
        checkboxInstance.focus();
      }}
    >
      Дать фокус
    </Button>
    <Button
      onClick={() => {
        checkboxInstance.blur();
      }}
    >
      Забрать фокус
    </Button>
  </Gapped>
</Gapped>
```

Чекбокс может находится в неопределённом состоянии. <br/> Это состояние полностью копирует поведение состояния [`indeterminate`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#attr-indeterminate) из HTML.

Это состояние влияет только на внешний вид и не влияет на состояние `checked`.

```jsx harmony
import { Button, Checkbox, Gapped } from '@skbkontur/react-ui';

const [checked, setChecked] = React.useState(false);

let checkboxInstance = React.useRef(null);

<Gapped vertical>
  <Checkbox
    initialIndeterminate
    checked={checked}
    onValueChange={setChecked}
    ref={el => checkboxInstance = el}
  >
    Неопределённый чекбокс
  </Checkbox>
  <Gapped>
    <Button onClick={() => checkboxInstance.setIndeterminate()}>
      Перевести в неопределённое состояние
    </Button>
    <Button onClick={() => checkboxInstance.resetIndeterminate()}>
      Сбросить неопределённое состояние
    </Button>
  </Gapped>
</Gapped>
```

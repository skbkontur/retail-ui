Базовый пример всплывающей подсказки.

```jsx harmony
<Hint text="Подсказка">Базовая</Hint>
```

Пример подсказки, всегда всплывающей слева.

```jsx harmony
<Hint pos={"left"} text="Подсказка слева">Всегда всплывает слева</Hint>
```

Пример всплывающей подсказки с ограниченной шириной.
```jsx harmony
<Hint
  maxWidth="150px"
  text="Очень много текста, рассказывающего про этот очень непонятный элемент"
  >
  Очень непонятный элемент
</Hint>
```

Пример всплывающей подсказки, открытие которой контролируется кнопкой.

```jsx harmony
import { Button, Gapped } from '@skbkontur/react-ui';

const [isOpen, setIsOpen] = React.useState(false);

<Gapped>
  <Hint opened={isOpen} manual text="Подсказка">Управляемая удалённо</Hint>
  <Button onClick={() => setIsOpen(!isOpen)}>
    {isOpen ? "Закрыть подсказку" : "Открыть подсказку"}
  </Button>
</Gapped>
```

Пример подсказки, всплывающей без анимации.

```jsx harmony
<Hint disableAnimations text={"Нет анимации :("}>Есть анимация?</Hint>
```

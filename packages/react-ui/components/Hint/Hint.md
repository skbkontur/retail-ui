Базовый пример всплывающей подсказки.

```jsx harmony
<Hint text="Подсказка">Базовая</Hint>
```

Пример подсказки с иконкой.

```jsx harmony
<Hint text="Редактирование">
  <svg width="16" height="16" viewBox="0 0 16 16">
    <path
      fillRule="evenodd"
      d="M13 12V12.998H8V12H13ZM3 13V11L9 4.99999L11 6.99999L5 13H3ZM13 5L11.5 6.5L9.5 4.5L11 3L13 5Z"
      clipRule="evenodd"
    />
  </svg>
</Hint>
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

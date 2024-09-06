### Базовый пример

```jsx harmony
<Hint text="Подсказка">Базовая</Hint>
```

### Иконка

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

### Сторона всплытия

```jsx harmony
<Hint pos={"left"} text="Подсказка слева">Всегда всплывает слева</Hint>
```

### Ограниченная ширина
```jsx harmony
<Hint
  maxWidth="150px"
  text="Очень много текста, рассказывающего про этот очень непонятный элемент"
  >
  Очень непонятный элемент
</Hint>
```

### Открытие подсказки кнопкой

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

### Всплытие без анимации

```jsx harmony
<Hint disableAnimations text={"Нет анимации :("}>Есть анимация?</Hint>
```

### Встроеная обёртка

Подсказка должна отображаться даже на отключённых компонентах. Из коробки это работает только с контролами `react-ui`.

Нативные элементы, поддерживающие атрибут `disabled`, отключают необходимые события мыши.
В подобных случаях следуют использовать проп `useWrapper`:

```jsx harmony
<Hint useWrapper text="Подсказа всё равно отображается">
  <button disabled>native button</button>
</Hint>
```

### Кастомная обертка
Т.к. встроённая обёртка это `<span>` без стилей, то она может работать некорректно в определённых ситуациях.
В таких случаях стоит использовать собственную обётку:

```jsx harmony
<>
  <Hint useWrapper text="Подсказа">
    <button disabled style={{ height: 40 }}>useWrapper prop</button>
  </Hint>
  <Hint text="Подсказа">
    <span style={{ display: 'inline-block' }}>
      <button disabled style={{ height: 40 }}>custom wrapper</button>
    </span>
  </Hint>
</>
```

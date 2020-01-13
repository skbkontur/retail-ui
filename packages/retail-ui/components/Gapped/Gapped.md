Вывод элементов с горизонтальным расположением

```jsx
import Button from '@skbkontur/react-ui/Button';

<Gapped gap={20}>
  <Button use="primary">Сохранить</Button>
  <Button>Отмена</Button>
</Gapped>;
```

Вертикальное расположение

```jsx
import Checkbox from '@skbkontur/react-ui/Checkbox';

<Gapped vertical gap={20}>
  <Checkbox checked>Write todos</Checkbox>
  <Checkbox initialIndeterminate>Work in progress</Checkbox>
  <Checkbox>Make things done</Checkbox>
</Gapped>;
```

По умолчанию `Gapped` выстраивает элементы в одну строчку, но с помощью свойства `wrap` можно включить перенос элементов на новую строку.
При этом между строчками будет отступ равный значению свойста `gap`
В таком случае из-за особенности верстки `Gapped` может перекрывать элементы расположенные сверху-слева.

```jsx
import Button from '@skbkontur/react-ui/Button';
import Toggle from '@skbkontur/react-ui/Toggle';
import Checkbox from '@skbkontur/react-ui/Checkbox';

<>
  {"U Can't Touch This! => "}
  <Toggle />

  <div style={{ paddingTop: '10px', position: 'relative', width: '250px' }}>
    <Gapped wrap gap={50}>
      <Button use="primary">Сохранить</Button>
      <Button>Отмена</Button>
      <Checkbox>Я не робот</Checkbox>
    </Gapped>
  </div>
</>;
```

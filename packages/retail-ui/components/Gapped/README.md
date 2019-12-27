Вывод элементов с горизонтальным расположением

```js
const { default: Button } = require('../Button');

<Gapped gap={20}>
  <Button use="primary">Сохранить</Button>
  <Button>Отмена</Button>
</Gapped>;
```

Вертикальное расположение

```js
const { default: Checkbox } = require('../Checkbox');

<Gapped vertical gap={20}>
  <Checkbox checked>Write todos</Checkbox>
  <Checkbox initialIndeterminate>Work in progress</Checkbox>
  <Checkbox>Make things done</Checkbox>
</Gapped>;
```

По умолчанию `Gapped` выстраивает элементы в одну строчку, но с помощью свойства `wrap` можно включить перенос элементов на новую строку.
При этом между строчками будет отступ равный значению свойста `gap`
В таком случае из-за особенности верстки `Gapped` может перекрывать элементы расположенные сверху-слева.

```js
const { default: Button } = require('../Button');
const { default: Toggle } = require('../Toggle');

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

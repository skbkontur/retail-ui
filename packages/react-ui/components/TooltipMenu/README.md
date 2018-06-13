Простой пример

```js
<TooltipMenu
  caption={<Button use="primary">Открыть меню</Button>}
>
  <MenuHeader>Заголовок меню</MenuHeader>
  <MenuSeparator />
  <MenuItem>Раз</MenuItem>
  <MenuItem>Два</MenuItem>
  <MenuItem>Три</MenuItem>
  <MenuSeparator />
  <MenuItem>Раз</MenuItem>
  <MenuItem>Два</MenuItem>
  <MenuItem>Три</MenuItem>
</TooltipMenu>
```

С указанием ширины меню

```js
<TooltipMenu
  caption={<Button use="primary">Открыть меню</Button>}
  menuWidth={350}
>
  <MenuHeader>Заголовок меню</MenuHeader>
  <MenuSeparator />
  <MenuItem>Раз</MenuItem>
  <MenuItem>Два</MenuItem>
  <MenuItem>Три</MenuItem>
  <MenuSeparator />
  <MenuItem>Раз</MenuItem>
  <MenuItem>Два</MenuItem>
  <MenuItem>Три</MenuItem>
</TooltipMenu>
```

С указанием максимальной высоты меню

```js
<TooltipMenu
  caption={<Button use="primary">Открыть меню</Button>}
  menuMaxHeight={150}
>
  <MenuHeader>Заголовок меню</MenuHeader>
  <MenuSeparator />
  <MenuItem>Раз</MenuItem>
  <MenuItem>Два</MenuItem>
  <MenuItem>Три</MenuItem>
  <MenuSeparator />
  <MenuItem>Раз</MenuItem>
  <MenuItem>Два</MenuItem>
  <MenuItem>Три</MenuItem>
</TooltipMenu>
```

В ```caption``` можно передать любой элемент

```js
const Icon = require("../Icon").default;

<TooltipMenu
  caption={(
    <span
      style={{ display: 'inline-block' }}
      tabIndex="0"
    >
      <Icon name="Menu" size={32} />
    </span>
  )}
  menuWidth="300px"
>
  <MenuItem>Раз</MenuItem>
  <MenuItem>Два</MenuItem>
  <MenuItem>Три</MenuItem>
</TooltipMenu>
```

Только справа 

```js
const Icon = require("../Icon").default;

<TooltipMenu
  caption={(
    <span
      style={{ display: 'inline-block' }}
      tabIndex="0"
    >
      <Icon name="Lightbulb" size={32} />
    </span>
  )}
  menuWidth="300px"
  positions={[
    'right top',
    'right middle',
    'right bottom',
  ]}
>
  <MenuItem>Раз</MenuItem>
  <MenuItem>Два</MenuItem>
  <MenuItem>Три</MenuItem>
</TooltipMenu>

```
Меню только сверху выравненное по правому краю ```caption``` 

```js
const Icon = require("../Icon").default;

<TooltipMenu
  caption={(
    <span
      style={{ display: 'inline-block' }}
      tabIndex="0"
    >
      <Icon name="Lightbulb" size={32} />
    </span>
  )}
  menuWidth="300px"
  positions={[
    'top right',
  ]}
>
  <MenuItem>Раз</MenuItem>
  <MenuItem>Два</MenuItem>
  <MenuItem>Три</MenuItem>
</TooltipMenu>
```

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

<TooltipMenu caption={<Icon name="Menu" size={32} />} menuWidth="300px">
  <MenuItem>Раз</MenuItem>
  <MenuItem>Два</MenuItem>
  <MenuItem>Три</MenuItem>
</TooltipMenu>
```
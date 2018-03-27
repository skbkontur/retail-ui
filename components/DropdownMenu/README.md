Простой пример

```js
<DropdownMenu
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
</DropdownMenu>
```

С указанием ширины меню

```js
<DropdownMenu
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
</DropdownMenu>
```

С указанием максимальной высоты меню

```js
<DropdownMenu
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
</DropdownMenu>
```

В ```caption``` можно передать любой элемент

```js
const Icon = require("../Icon").default;

<DropdownMenu
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
</DropdownMenu>
```
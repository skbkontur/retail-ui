Sticky

```js
<DropdownMenu
  caption={<Button use="primary">Открыть меню</Button>}
  menuMaxHeight={150}
>
  <MenuItem>Раз</MenuItem>
  <Sticky side="top" absolute>
    {fixed =>
      !fixed ? (
        <div style={{ background: fixed ? '#333' : '#fff' }}>
          <MenuHeader>Заголовок меню</MenuHeader>
        </div>
      ) : (
        <div style={{ background: fixed ? '#333' : '#fff' }}>
          <MenuHeader>Заголовок меню</MenuHeader>
          <MenuHeader>Заголовок меню</MenuHeader>
          <MenuHeader>Заголовок меню</MenuHeader>
        </div>
      )
    }
  </Sticky>
  <MenuSeparator />
  <MenuItem>Два</MenuItem>
  <MenuItem>Три</MenuItem>
  <MenuSeparator />
  <MenuItem>Раз</MenuItem>
  <MenuItem>Два</MenuItem>
  <MenuItem>Три</MenuItem>
</DropdownMenu>
```

Sticky with Stop

```js
let stop = null;
let style = { background: 'red' };

<DropdownMenu
  caption={<Button use="primary">Открыть меню</Button>}
  menuMaxHeight={150}
>
  <Sticky side="top" getStop={() => stop} absolute>
    {fixed => (
      <div style={style}>
        Small loan of a million dollars
        {fixed ? ' fixed' : <div>not fixed</div>}
      </div>
    )}
  </Sticky>
  Great
  <div style={{ height: 300 }} />
  <div ref={el => (stop = el)} style={{ borderTop: '1px solid #000' }} />
  <div style={{ height: 300 }} />
  <Sticky side="bottom" getStop={() => stop} offset={0} absolute>
    <div style={style}>Make America Great Again</div>
  </Sticky>
</DropdownMenu>;
```

Простой пример

```js
<DropdownMenu caption={<Button use="primary">Открыть меню</Button>}>
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

В `caption` можно передать любой элемент

```js
const MenuIcon = require('@skbkontur/react-icons/Menu').default;

<DropdownMenu
  caption={
    <span style={{ display: 'inline-block' }} tabIndex="0">
      <MenuIcon size={32} />
    </span>
  }
  menuWidth="300px"
>
  <MenuItem>Раз</MenuItem>
  <MenuItem>Два</MenuItem>
  <MenuItem>Три</MenuItem>
</DropdownMenu>;
```

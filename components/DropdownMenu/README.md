DropdownMenu example

```js
const Gapped = require("../Gapped").default;
const Link = require("../Link").default;
const Menu = require("../Menu/Menu").default;
const Icon = require("../Icon").default;


<Gapped>
  <DropdownMenu
      caption={<Button use="primary">Открыть меню</Button>}
      menuMaxHeight={50}
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
  <DropdownMenu
      onItemClick={(any) => { console.log('Клик по айтему:', any); }}
      caption={<Link use="danger" >Ссылкой открыть меню</Link>}
  >
    <MenuHeader>Заголовок меню</MenuHeader>
    <MenuSeparator />
    <MenuItem>Раз</MenuItem>
    <MenuItem>Два</MenuItem>
    <MenuItem>Три</MenuItem>
  </DropdownMenu>
  <Menu>
    <MenuHeader>Заголовок меню</MenuHeader>
    <MenuSeparator />
    <DropdownMenu
        onItemClick={(any) => { console.log('Клик по айтему:', any); }}
        caption={<MenuItem>Пункт меню 1</MenuItem>}
    >
      <MenuHeader>Заголовок меню</MenuHeader>
      <MenuSeparator />
      <MenuItem>Раз</MenuItem>
      <MenuItem>Два</MenuItem>
      <MenuItem>Три</MenuItem>
    </DropdownMenu>
    <DropdownMenu
        onItemClick={(any) => { console.log('Клик по айтему:', any); }}
        caption={<MenuItem>Пункт меню 2</MenuItem>}
    >
      <MenuHeader>Заголовок меню</MenuHeader>
      <MenuSeparator />
      <MenuItem>Раз</MenuItem>
      <MenuItem>Два</MenuItem>
      <MenuItem>Три</MenuItem>
    </DropdownMenu>
    <DropdownMenu
        onItemClick={(any) => { console.log('Клик по айтему:', any); }}
        caption={<MenuItem>Пункт меню 3</MenuItem>}
    >
      <MenuHeader>Заголовок меню</MenuHeader>
      <MenuSeparator />
      <MenuItem>Раз</MenuItem>
      <MenuItem>Два</MenuItem>
      <MenuItem>Три</MenuItem>
    </DropdownMenu>
  </Menu>
  <DropdownMenu
    caption={<Icon name="Error" size={32} />}
  >
  </DropdownMenu>
  <DropdownMenu
    caption={<Icon name="Dot12" size={32} />}
    menuWidth="300px"
  >
    <MenuItem>Раз</MenuItem>
    <MenuSeparator />
    <MenuItem>Два</MenuItem>
    <MenuSeparator />
    <MenuItem>Три</MenuItem>
  </DropdownMenu>
</Gapped>
```
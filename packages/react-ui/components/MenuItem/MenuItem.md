Меню с базовыми элементами меню.

```jsx harmony
import { Button, MenuItem, DropdownMenu } from '@skbkontur/react-ui';

<DropdownMenu
  caption={<Button use="primary">Открыть меню с базовыми элементами меню</Button>}
  >
  <MenuItem>Базовый элемент меню</MenuItem>
  <MenuItem>Ещё один базовый элемент меню</MenuItem>
  <MenuItem>И ещё один</MenuItem>
</DropdownMenu>
```

Меню с отключёнными и базовыми элементами меню.
<br/>
К отключённым элементам меню не применяются стили при наведении и их нельзя затаргетить с клавиатуры.

```jsx harmony
import { Button, MenuItem, DropdownMenu } from '@skbkontur/react-ui';

<DropdownMenu
  caption={<Button use="primary">Открыть меню с базовыми и отключёнными элементами</Button>}
  >
  <MenuItem>Это базовый элемент меню</MenuItem>
  <MenuItem disabled>А это отключённый</MenuItem>
  <MenuItem>А это снова базовый</MenuItem>
  <MenuItem disabled>И снова отключённый</MenuItem>
  <MenuItem disabled>И вот ещё один отключённый</MenuItem>
</DropdownMenu>
```

Меню с элементами меню содержащими описание.

```jsx harmony
import { Button, MenuItem, DropdownMenu } from '@skbkontur/react-ui';

<DropdownMenu
  caption={<Button use="primary">Открыть меню с причастными к Pied Piper</Button>}
  >
  <MenuItem comment="Системный инженер">Bertram Gilfoyle</MenuItem>
  <MenuItem comment="Hooli CEO">Gavin Belson</MenuItem>
  <MenuItem comment="Java-разработчик">Dinesh Chugtai</MenuItem>
  <MenuItem comment="Основатель Pied Piper">Richard Hendricks</MenuItem>
  <MenuItem comment="Владелец инкубатора">Erlich Bachman</MenuItem>
</DropdownMenu>
```

Меню с элементами меню содержащими иконки.

```jsx harmony
import { Button, MenuItem, DropdownMenu } from '@skbkontur/react-ui';
import DeviceSmartphoneIcon from '@skbkontur/react-icons/DeviceSmartphone';
import OkIcon from '@skbkontur/react-icons/Ok';
import ThumbDownIcon from '@skbkontur/react-icons/ThumbDown';


<DropdownMenu
  caption={<Button use="primary">Открыть меню с иконками</Button>}
  >
  <MenuItem icon={<OkIcon />}>Базовый элемент меню c иконкой</MenuItem>
  <MenuItem
    disabled
    icon={<ThumbDownIcon />}
    >
    Отключённый элемент меню с иконкой
  </MenuItem>
  <MenuItem
    icon={<DeviceSmartphoneIcon />}
    comment="А слева вы можете видеть икону 21-го века"
    >
     Элемент меню с описанием и иконкой
  </MenuItem>
</DropdownMenu>
```

Меню с элементами меню обёрнутыми в контрол ссылки.

```jsx harmony
import { Button, MenuItem, DropdownMenu, Link } from '@skbkontur/react-ui';

const LinkMenuItem = ({link, title}) => {
  return <MenuItem
    href={link}
    component={({ href, ...rest }) => {
      return <Link target="_blank" rel="noopener noreferrer" href={href} {...rest} />
    }}
    >
    {title}
  </MenuItem>
}

<DropdownMenu
  caption={<Button use="primary">Открыть меню с ссылками</Button>}
  >
  <LinkMenuItem
    link="http://tech.skbkontur.ru/react-ui/"
    title="Начало документации"
    />
  <LinkMenuItem
    link="https://guides.kontur.ru/"
    title="Контур Гайды"
    />
  <LinkMenuItem
    link="https://github.com/skbkontur/retail-ui/graphs/contributors"
    title="Список прекрасных людей"
    />
</DropdownMenu>
```

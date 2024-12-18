### Меню с базовыми элементами меню

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

### Disabled

```jsx harmony
import { Button, MenuItem, DropdownMenu } from '@skbkontur/react-ui';

<DropdownMenu
  caption={<Button use="primary">Открыть меню с базовыми и заблокированными элементами</Button>}
  >
  <MenuItem>Это базовый элемент меню</MenuItem>
  <MenuItem disabled>А это заблокированный</MenuItem>
  <MenuItem>А это снова базовый</MenuItem>
  <MenuItem disabled>И снова заблокированный</MenuItem>
  <MenuItem disabled>И вот ещё один заблокированный</MenuItem>
</DropdownMenu>
```

### Запрет выделения
В пункты меню можно передать проп `isNotSelectable`, чтобы запретить выделение и выбор этого пункта меню

```jsx harmony
import { Button, MenuItem, DropdownMenu } from '@skbkontur/react-ui';

<DropdownMenu
  caption={<Button use="primary">Открыть меню с базовыми и отключёнными элементами</Button>}
  >
  <MenuItem>Это базовый элемент меню</MenuItem>
  <MenuItem isNotSelectable>А это отключённый</MenuItem>
  <MenuItem>А это снова базовый</MenuItem>
  <MenuItem isNotSelectable>И снова отключённый</MenuItem>
  <MenuItem isNotSelectable>И вот ещё один отключённый</MenuItem>
</DropdownMenu>
```

### Описание элементов

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

### Иконки в элементах

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

### Проп href

В элементы меню можно передавать проп `href`, чтобы превратить их в ссылку. Лучше выделять такие элементы иконками.

```jsx harmony
import { Button, MenuItem, DropdownMenu, MenuSeparator } from '@skbkontur/react-ui';
import { ArrowUiCornerOutUpRightIcon } from '@skbkontur/icons/icons/ArrowUiCornerOutUpRightIcon';

<DropdownMenu
  caption={<Button use="primary">Открыть меню с ссылками</Button>}
  >
  <MenuItem
    href="http://tech.skbkontur.ru/react-ui/"
    target="_blank"
    rel="noopener noreferrer"
  >
    Начало документации
  </MenuItem>
  <MenuItem
    href="https://github.com/skbkontur/retail-ui/graphs/contributors"
    target="_blank"
    rel="noopener noreferrer"
  >
    Список прекрасных людей
  </MenuItem>
  <MenuSeparator />
  <MenuItem
    icon={< ArrowUiCornerOutUpRightIcon />}
    href="https://guides.kontur.ru/"
    target="_blank"
    rel="noopener noreferrer"
  >
    Подробнее в Контур Гайдах
  </MenuItem>
</DropdownMenu>
```

### Размер

```jsx harmony
import { Gapped } from '@skbkontur/react-ui';

<Gapped vertical>
  <MenuItem size={'small'}>Маленький</MenuItem>
  <MenuItem size={'medium'}>Средний</MenuItem>
  <MenuItem size={'large'}>Большой</MenuItem>
</Gapped>
```

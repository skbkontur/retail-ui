### Базовый пример
```jsx harmony

<Input />;
```

### Иконка
```jsx harmony
import { SearchLoupeIcon16Regular } from '@skbkontur/icons/icons/SearchLoupeIcon/SearchLoupeIcon16Regular';

<Input leftIcon={<SearchLoupeIcon16Regular />} />;
```

### Очистка значения
Очистить значение в `Input`'е можно только с помощью пустой строки

```jsx harmony
import { Button, Group } from '@skbkontur/react-ui';

const [value, setValue] = React.useState('Значение');

<Group>
  <Input value={value} onValueChange={setValue} />
  <Button onClick={() => setValue('')}>Очистить</Button>
</Group>
```

### Префикс

```jsx harmony
import { SearchLoupeIcon16Regular } from '@skbkontur/icons/icons/SearchLoupeIcon/SearchLoupeIcon16Regular';

<Input
  width={400}
  prefix="https://kontur.ru/search?query="
  rightIcon={<SearchLoupeIcon16Regular />}
/>;
```

### type

```jsx harmony
import { Gapped, Input, Tooltip } from '@skbkontur/react-ui';

<Gapped vertical gap={20}>
  <Gapped gap={20}>
    <Input type="password" />
    <span>type = "password"</span>
  </Gapped>

  <Gapped gap={20}>
    <Input type="number" />
    <span>type = "number"</span>
  </Gapped>

  <Gapped gap={20}>
    <Input type="tel" />
    <span>type = "tel"</span>
  </Gapped>

  <Gapped gap={20}>
    <Input type="search" />
    <span>type = "search"</span>
  </Gapped>

  <Gapped gap={20}>
    <Input type="time" />
    <span>type = "time"</span>
  </Gapped>

  <Gapped gap={20}>
    <Input type="date" />
    <span>type = "date"</span>
  </Gapped>

  <Gapped gap={20}>
    <Input type="url" />
    <span>type = "url"</span>
  </Gapped>

  <Gapped gap={20}>
    <Input type="email" />
    <span>type = "email"</span>
  </Gapped>
</Gapped>
```

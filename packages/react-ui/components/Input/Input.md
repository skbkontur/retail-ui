### Базовый пример
```jsx harmony
import SearchIcon from '@skbkontur/react-icons/Search';

<Input />;
```

### Иконка
```jsx harmony
import SearchIcon from '@skbkontur/react-icons/Search';

<Input leftIcon={<SearchIcon />} />;
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
import SearchIcon from '@skbkontur/react-icons/Search';

<Input
  width={400}
  prefix="https://kontur.ru/search?query="
  rightIcon={<SearchIcon />}
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

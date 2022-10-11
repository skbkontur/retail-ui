```jsx harmony
import SearchIcon from '@skbkontur/react-icons/Search';

<Input leftIcon={<SearchIcon />} />;
```

Очистить значение в `Input`'е можно только с помощью пустой строки
```jsx harmony
import { Button, Group } from '@skbkontur/react-ui';

const [value, setValue] = React.useState('Значение');

<Group>
  <Input value={value} onValueChange={setValue} />
  <Button onClick={() => setValue('')}>Очистить</Button>
</Group>
```

Пример с префиксом:

```jsx harmony
import SearchIcon from '@skbkontur/react-icons/Search';

<Input
  width={400}
  prefix="https://kontur.ru/search?query="
  rightIcon={<SearchIcon />}
/>;
```

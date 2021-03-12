```jsx harmony
import SearchIcon from '@skbkontur/react-icons/Search';

<Input leftIcon={<SearchIcon />} />;
```

Пример с префиксом:

```jsx harmony
import SearchIcon from '@skbkontur/react-icons/Search';

<Input width={400} prefix="https://kontur.ru/search?query=" rightIcon={<SearchIcon />} />;
```

Различные значения пропа `type`:

```jsx harmony
import { Gapped } from '@skbkontur/react-ui';

const onChange = e => console.log(e.target.value);

<Gapped vertical>
  <Input onChange={onChange} type="date" placeholder="date" />
  <Input onChange={onChange} type="datetime-local" placeholder="datetime-local" />
  <Input onChange={onChange} type="email" placeholder="email" />
  <Input onChange={onChange} type="file" placeholder="file" />
  <Input onChange={onChange} type="month" placeholder="month" />
  <Input onChange={onChange} type="number" placeholder="number" />
  <Input onChange={onChange} type="password" placeholder="password" />
  <Input onChange={onChange} type="search" placeholder="search" />
  <Input onChange={onChange} type="tel" placeholder="tel" />
  <Input onChange={onChange} type="text" placeholder="text" />
  <Input onChange={onChange} type="time" placeholder="time" />
  <Input onChange={onChange} type="week" placeholder="week" />
  <Input onChange={onChange} type="color" placeholder="color" />
</Gapped>;
```

Нативная валидация:

```jsx harmony
import { Gapped, Button } from '@skbkontur/react-ui';

const onSubmit = e => e.preventDefault();

<form onSubmit={onSubmit}>
  <Gapped vertical>
    <Input name="email" type="email" placeholder="email" required />
    <Button type="submit">Submit</Button>
  </Gapped>
</form>;
```

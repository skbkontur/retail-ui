```jsx harmony
import SearchIcon from '@skbkontur/react-icons/Search';

<Input leftIcon={<SearchIcon />} />;
```

Пример с префиксом:

```jsx harmony
import SearchIcon from '@skbkontur/react-icons/Search';

const ref = React.useRef();

<>
  <button onClick={() => ref.current.focus()}>focus</button>
  <button onClick={() => ref.current.blur()}>blur</button>
  <Input ref={ref} width={400} prefix="https://kontur.ru/search?query=" rightIcon={<SearchIcon />} />
</>
```

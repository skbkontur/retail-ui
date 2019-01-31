```jsx
const SearchIcon = require('@skbkontur/react-icons/Search').default;

<Input leftIcon={<SearchIcon />} />;
```

Пример с префиксом:

```jsx
const SearchIcon = require('@skbkontur/react-icons/Search').default;

<Input
  width={400}
  prefix="https://kontur.ru/search?query="
  rightIcon={<SearchIcon />}
/>;
```

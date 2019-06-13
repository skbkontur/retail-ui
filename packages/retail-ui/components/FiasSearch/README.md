Базовое использование.

```jsx
let initialState = {
  home: {},
};

let handleChange = value => setState({ home: value });

<FiasSearch baseUrl={'https://api.kontur.ru/fias/v1/'} value={state.home} onChange={handleChange} />;
```

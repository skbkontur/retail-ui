Включение и отключение отдельных фич через `ReactUIFeatureFlagsContext`

Доступные флаги

```typescript static
export interface ReactUIFeatureFlags {
  tokenInputRemoveWhitespaceFromDefaultDelimiters?: boolean;
}
```

Механизм работы: новая функциональность применяется или не применяется в зависимости от того, был ли передан со значением true соответствующий флаг или нет.

Флаги задаются с помощью `ReactUIFeatureFlagsContext.Provider`.

```jsx static
import { ReactUIFeatureFlagsContext } from '@skbkontur/react-ui';

<ReactUIFeatureFlagsContext.Provider value={{ tokenInputRemoveWhitespaceFromDefaultDelimiters: true }}>{/* ... */}</ReactUIFeatureFlagsContext.Provider>;
```

## Использование

### tokenInputRemoveWhitespaceFromDefaultDelimiters

В TokenInput из дефолтных разделителей удалён пробел.
В React UI 5.0 фича будет применена по умолчанию.

```jsx harmony
import { TokenInput, TokenInputType, Token, ReactUIFeatureFlagsContext } from '@skbkontur/react-ui';

const [selectedItems, setSelectedItems] = React.useState([]);
const getItems = () => {};

<ReactUIFeatureFlagsContext.Provider value={{ tokenInputRemoveWhitespaceFromDefaultDelimiters: true }}>
  <TokenInput
    type={TokenInputType.Combined}
    getItems={getItems}
    selectedItems={selectedItems}
    onValueChange={setSelectedItems}
  />
</ReactUIFeatureFlagsContext.Provider>
```

## Объект со всеми флагами

Чтобы получить объект со всеми флагами, необходимо применить вспомогательную функцию getFullValidationsFlagsContext к объекту заданных флагов:

```typescript static
const allFlags = getFullValidationsFlagsContext(useContext(ReactUIFeatureFlagsContext));
```

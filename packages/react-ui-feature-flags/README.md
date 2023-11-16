Включение и отключение отдельных фич через `FeatureFlagsContext`

Доступные флаги

```typescript static
export interface FeatureFlags {
  TokenInputRemoveWhitespaceFromDefaultDelimiters?: boolean;
}
```

Механизм работы: новая функциональность применяется или не применяется в зависимости от того, был ли передан со значением true соответствующий флаг или нет.

Флаги задаются с помощью `FeatureFlagsContext.Provider`.

```jsx static
import { FeatureFlagsContext } from '@skbkontur/react-ui-feature-flags';

<FeatureFlagsContext.Provider value={{ TokenInputRemoveWhitespaceFromDefaultDelimiters: true }}>{/* ... */}</FeatureFlagsContext.Provider>;
```

## Использование

### TokenInputRemoveWhitespaceFromDefaultDelimiters

В TokenInput из дефолтных разделителей удалён пробел.
В React UI 5.0 фича будет применена по умолчанию.

```jsx harmony
import { TokenInput, TokenInputType, Token } from '@skbkontur/react-ui';
import { FeatureFlagsContextn } from '@skbkontur/react-ui-feature-flags';

const [selectedItems, setSelectedItems] = React.useState([]);
const getItems = () => {};

<FeatureFlagsContext.Provider value={{ TokenInputRemoveWhitespaceFromDefaultDelimiters: true }}>
  <TokenInput
    type={TokenInputType.Combined}
    getItems={getItems}
    selectedItems={selectedItems}
    onValueChange={setSelectedItems}
  />
</FeatureFlagsContext.Provider>
```

## Объект со всеми флагами

Чтобы получить объект со всеми флагами, необходимо применить вспомогательную функцию getFullFlagsContext к объекту заданных флагов:

```typescript static
const allFlags = getFullFlagsContext(useContext(FeatureFlagsContext));
```

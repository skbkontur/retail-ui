Внедрение или пропуск новых фич через `React.Context<FeatureFlags>`

Доступные флаги

```typescript static
export interface FeatureFlags {
  ValidationTooltipRemoveWrapper: boolean;
}
```

Механизм работы: новая функциональность применяется или не применяется в зависимости от того, был ли передан со значением true соответствующий флаг или нет.

Флаги задаются с помощью `FeatureFlagsContext.Provider`. При необходимости можно передать несколько флагов через запятую.

```jsx static
import { FeatureFlagsContext } from '@skbkontur/react-ui';

<FeatureFlagsContext.Provider value={{ ValidationTooltipRemoveWrapper: true }}>{/* ... */}</FeatureFlagsContext.Provider>;
```

## Использование

### ValidationTooltipRemoveWrapper

```jsx harmony
import { useContext } from 'react';
import { FeatureFlagsContext, TestComponent, getFullFlagContext } from '@skbkontur/react-ui';

function FlagUsedByHook() {
  const flagContext = getFullFlagContext(useContext(FeatureFlagsContext));
  return <div>{flagContext.ValidationTooltipRemoveWrapper ? 'flag on' : 'flag off'}</div>;
}

<FeatureFlagsContext.Provider value={{ ValidationTooltipRemoveWrapper: true }}>
  <FlagUsedByHook />
</FeatureFlagsContext.Provider>
```

Включение и отключение отдельных фич через `FeatureFlagsContext`

Доступные флаги

```typescript static
export interface FeatureFlags {
  ValidationTooltipRemoveWrapper?: boolean;
}
```

Механизм работы: новая функциональность применяется или не применяется в зависимости от того, был ли передан со значением true соответствующий флаг или нет.

Флаги задаются с помощью `FeatureFlagsContext.Provider`.

```jsx static
import { FeatureFlagsContext } from '@skbkontur/react-ui';

<FeatureFlagsContext.Provider value={{ ValidationTooltipRemoveWrapper: true }}>{/* ... */}</FeatureFlagsContext.Provider>;
```

## Использование

### ValidationTooltipRemoveWrapper

В React UI 5.0 фича будет применена по умолчанию.

```jsx harmony
import { useContext } from 'react';
import { FeatureFlagsContext, TestComponent, getFullFlagsContext } from '@skbkontur/react-ui';

function FlagUsedByHook() {
  const flagContext = getFullFlagsContext(useContext(FeatureFlagsContext));
  return <div>{flagContext.ValidationTooltipRemoveWrapper ? 'flag on' : 'flag off'}</div>;
}

<FeatureFlagsContext.Provider value={{ ValidationTooltipRemoveWrapper: true }}>
  <FlagUsedByHook />
</FeatureFlagsContext.Provider>
```

## Объект со всеми флагами

Чтобы получить объект со всеми флагами, необходимо применить вспомогательную функцию getFullFlagsContext к объекту заданных флагов:

```typescript static
const allFlags = getFullFlagsContext(useContext(FeatureFlagsContext));
```

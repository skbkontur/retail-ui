Применение или неприменение новых ломающих изменений реализуется через `React.Context<FeatureFlagIn>`

```typescript static
export type FeatureFlagIn = Partial<featureFlagObject>;
```

Доступные флаги

```typescript static
export interface featureFlagObject {
  ValidationsWrapperAlignTooltip: boolean;
}
```

Механизм работы: новая функциональность применяется или не применяется в зависимости от того, был ли передан со значением true соответствующий флаг или нет.

Флаги задаются с помощью `FeatureFlagContext.Provider`:

```jsx static
import { FeatureFlagContext } from '@skbkontur/react-ui';

<FeatureFlagContext.Provider value={{ firestFlag, secondFlag }}>{/* ... */}</FeatureFlagContext.Provider>;
```

Получить заданные флаги в компоненте можно через `FeatureFlagContext.Consumer`:

```jsx static
import { FeatureFlagContext, Button } from '@skbkontur/react-ui';

<FeatureFlagContext.Consumer>
  {flags => {/* ... */} }
</FeatureFlagContext.Consumer>
```

`useContext` в функциональных компонентах:

```typescript static
const flags = useContext(FeatureFlagContext);
```

Чтобы получить объект со всеми флагами, необходимо применить вспомогательную функцию getFullFlagContext к объекту заданных флагов:

```typescript static
const allFlage = getFullFlagContext(useContext(FeatureFlagContext));
```

Список существующих флагов:

| Имя                                      | Описание                                                                                     |
|------------------------------------------|----------------------------------------------------------------------------------------------|
| `Имя`                                    | Описание                                                                                     |

## Использование

### ValidationsWrapperAlignTooltip

```jsx harmony
import { useContext } from 'react';
import { FeatureFlagContext, TestComponent, getFullFlagContext } from '@skbkontur/react-ui';

function FlagUsedByHook() {
    const flagContext = getFullFlagContext(useContext(FeatureFlagContext));
    return <div>{flagContext.ValidationsWrapperAlignTooltip ? 'flag on' : 'flag off'}</div>;
}

<FeatureFlagContext.Provider value={{ ValidationsWrapperAlignTooltip: true }}>
  <FlagUsedByHook />
</FeatureFlagContext.Provider>
```

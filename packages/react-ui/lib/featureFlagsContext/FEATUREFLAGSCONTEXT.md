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

### textareaUseSafari17Workaround

В браузере Safari версии 17.* возник баг в реактовом элементе `<textarea />`. Баг не позволяет нормально вводить текст в пустые строки.
Но только если эти пустые строки были при монтировании элемента.
Если пустые строки добавить сразу после монтирования, то проблема не наблюдается.

Мы можем купировать этот баг на своей стороне, но только в рамках контрола `Textarea`.
Также баг могут поправить на стороне Safari или React, из-за чего уже наше обходное решение может вызвать другой баг.
Поэтому лучше добавить возможность выключить в любой момент наше обходное решение.

Обходное решение само отслеживает Safari версии 17.*, и применяется только для него.

```jsx harmony
import { Textarea, ReactUIFeatureFlagsContext } from '@skbkontur/react-ui';

const [value, setValue] = React.useState('1\n\n\n\n2');

<ReactUIFeatureFlagsContext.Provider value={{ textareaUseSafari17Workaround: true }}>
  <Textarea
    value={value}
    onValueChange={setValue}
    rows={5}
  />
</ReactUIFeatureFlagsContext.Provider>
```

## Объект со всеми флагами

Чтобы получить объект со всеми флагами, необходимо применить вспомогательную функцию getFullValidationsFlagsContext к объекту заданных флагов:

```typescript static
const allFlags = getFullValidationsFlagsContext(useContext(ReactUIFeatureFlagsContext));
```

Включение и отключение отдельных фич через `ReactUIFeatureFlagsContext`

Доступные флаги

```typescript static
export interface ReactUIFeatureFlags {
  tokenInputRemoveWhitespaceFromDefaultDelimiters?: boolean;
  kebabHintRemovePin?: boolean;
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

### kebabHintRemovePin

В TokenInput из дефолтных разделителей удалён пробел.
В React UI 5.0 фича будет применена по умолчанию.
```jsx harmony
import { Hint, ReactUIFeatureFlagsContext } from '@skbkontur/react-ui';

<ReactUIFeatureFlagsContext.Provider value={{ kebabHintRemovePin: true }}>
  <Hint text="Подсказка">Пример с Hint</Hint>
</ReactUIFeatureFlagsContext.Provider>
```
```jsx harmony
import EditIcon from '@skbkontur/react-icons/Edit';
import TrashIcon from '@skbkontur/react-icons/Trash';
import { Kebab, MenuItem, Toast, ReactUIFeatureFlagsContext } from '@skbkontur/react-ui';

let style = {
  alignItems: 'center',
  border: '1px solid #dfdede',
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0 20px',
  width: 250,
};

<ReactUIFeatureFlagsContext.Provider value={{ kebabHintRemovePin: true }}>
  <div style={style}>
    <div>
      <h3>Пример с Kebab</h3>
    </div>

    <Kebab positions={['left middle']} >
      <MenuItem icon={<EditIcon />} onClick={() => Toast.push('Отредактировано')}>
        Редактировать
      </MenuItem>
      <MenuItem icon={<TrashIcon />} onClick={() => Toast.push('Удалено')}>
        Удалить
      </MenuItem>
    </Kebab>
  </div>
</ReactUIFeatureFlagsContext.Provider>
```

## Объект со всеми флагами

Чтобы получить объект со всеми флагами, необходимо применить вспомогательную функцию getFullValidationsFlagsContext к объекту заданных флагов:

```typescript static
const allFlags = getFullValidationsFlagsContext(useContext(ReactUIFeatureFlagsContext));
```

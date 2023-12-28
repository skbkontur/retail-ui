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

### menuItemsAtAnyLevel

Mожно использовать различные обертки для пунктов меню

```jsx harmony
import { DropdownMenu, Button, MenuHeader, MenuItem, MenuSeparator, ReactUIFeatureFlagsContext } from '@skbkontur/react-ui';

const groupedMenuItems = (
  <div>
    <MenuItem>MenuItem1</MenuItem>
    <MenuItem>MenuItem2</MenuItem>
  </div>
);

<ReactUIFeatureFlagsContext.Provider value={{ menuItemsAtAnyLevel: true }}>
  <DropdownMenu caption={<Button use="primary">Открыть меню</Button>}>
    <>
      <MenuHeader>Заголовок меню</MenuHeader>
      <MenuSeparator />
      <div>
        {groupedMenuItems}
      </div>
    </>
    <MenuItem>MenuItem3</MenuItem>
  </DropdownMenu>
</ReactUIFeatureFlagsContext.Provider>
```

В пункты меню можно передать проп `isNotSelectable`, чтобы запретить выделение и выбор этого пункта меню

```jsx harmony
import { Select, DropdownMenu, Button, MenuHeader, MenuItem, MenuSeparator, ReactUIFeatureFlagsContext } from '@skbkontur/react-ui';

const [value, setValue] = React.useState();

const items = [<Select.Item isNotSelectable={true}>Not selectable</Select.Item>, 'One', 'Two', 'Three', Select.SEP, 'Four'];

<ReactUIFeatureFlagsContext.Provider value={{ menuItemsAtAnyLevel: true }}>
  <Select items={items} value={value} onValueChange={setValue} />;
</ReactUIFeatureFlagsContext.Provider>
```

## Объект со всеми флагами

Чтобы получить объект со всеми флагами, необходимо применить вспомогательную функцию getFullValidationsFlagsContext к объекту заданных флагов:

```typescript static
const allFlags = getFullValidationsFlagsContext(useContext(ReactUIFeatureFlagsContext));
```

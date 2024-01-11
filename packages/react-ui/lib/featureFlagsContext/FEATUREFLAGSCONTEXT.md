Включение и отключение отдельных фич через `ReactUIFeatureFlagsContext`

Доступные флаги

```typescript static
export interface ReactUIFeatureFlags {
  tokenInputRemoveWhitespaceFromDefaultDelimiters?: boolean;
  comboBoxAllowValueChangeInEditingState?: boolean;
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

### comboBoxAllowValueChangeInEditingState

Этот флаг позволяет менять значение value в Combobox, когда тот находится в режиме редактирования.
В примере ниже, при нажатии на кнопку "Обновить" без флага, в функции handleValueChange приходилось бы дополнительно вызывать метод Combobox'a reset.

В React UI 5.0 фича будет применена по умолчанию.

```jsx harmony
import { Button, ComboBox, ReactUIFeatureFlagsContext } from `@skbkontur/react-ui`;

const [value, setValue] = React.useState({ value: '', label: '' });
const comboboxRef = React.useRef<ComboBox | null>(null);

const handleValueChange = () => {
  setValue({ value: `Update ${new Date().toLocaleString()}`, label: `Update ${new Date().toLocaleString()}` });
};

const getItems = () =>
  Promise.resolve([
    { value: 'Первый', label: 'Первый' },
    { value: 'Второй', label: 'Второй' },
  ]);
const renderItem = (item: { value: string; label: string }) => <div key={item?.value}>{item?.value}</div>;

return (
  <ReactUIFeatureFlagsContext.Provider value={{ comboBoxAllowValueChangeInEditingState: true }}>
    <Button onClick={handleValueChange}>Обновить</Button>
    <ComboBox
      ref={comboboxRef}
      value={value}
      maxLength={40}
      width={200}
      maxMenuHeight={150}
      drawArrow={false}
      searchOnFocus={false}
      getItems={getItems}
      onValueChange={(value) => setValue(value)}
      onInputValueChange={(value) => {
        setValue({ value, label: value });
      }}
      renderItem={renderItem}
      renderNotFound={() => undefined}
    />
  </ReactUIFeatureFlagsContext.Provider>
);
```

## Объект со всеми флагами

Чтобы получить объект со всеми флагами, необходимо применить вспомогательную функцию getFullValidationsFlagsContext к объекту заданных флагов:

```typescript static
const allFlags = getFullValidationsFlagsContext(useContext(ReactUIFeatureFlagsContext));
```

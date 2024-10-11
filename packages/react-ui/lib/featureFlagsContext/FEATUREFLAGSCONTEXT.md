Включение и отключение отдельных фич через `ReactUIFeatureFlagsContext`

Доступные флаги

```typescript static
export interface ReactUIFeatureFlags {
  comboBoxAllowValueChangeInEditingState?: boolean;
}
```

Механизм работы: новая функциональность применяется или не применяется в зависимости от того, был ли передан со значением true соответствующий флаг или нет.

Флаги задаются с помощью `ReactUIFeatureFlagsContext.Provider`.

```jsx static
import { ReactUIFeatureFlagsContext } from '@skbkontur/react-ui';

<ReactUIFeatureFlagsContext.Provider value={{ textareaUseSafari17Workaround: true }}>{/* ... */}</ReactUIFeatureFlagsContext.Provider>;
```

## Использование

### comboBoxAllowValueChangeInEditingState

Этот флаг позволяет менять значение value в Combobox в режиме редактирования. Теперь при изменении value в этом режиме, Combobox примет и корректно отрисует новое значение. А в случае, если при этом было открыто выпадающее меню, данные в нём тоже будут обновлены без принудительного закрытия.

В примере ниже, при нажатии на кнопку "Обновить" после редактирования текста без флага, в функции handleValueChange приходилось бы дополнительно вызывать метод Combobox'a reset.

В React UI 5.0 фича будет применена по умолчанию.

```jsx harmony
import { Button, ComboBox, ReactUIFeatureFlagsContext } from '@skbkontur/react-ui';

const [value, setValue] = React.useState({ value: '', label: '' });

const handleValueChange = () => {
  setValue({ value: `Update ${new Date().toLocaleString()}`, label: `Update ${new Date().toLocaleString()}` });
};

const getItems = () =>
  Promise.resolve([
    { value: 'Первый', label: 'Первый' },
    { value: 'Второй', label: 'Второй' },
  ]);

<ReactUIFeatureFlagsContext.Provider value={{ comboBoxAllowValueChangeInEditingState: true }}>
  <Button onClick={handleValueChange}>Обновить</Button>
  <ComboBox
    value={value}
    searchOnFocus={false}
    getItems={getItems}
    onValueChange={(value) => setValue(value)}
    onInputValueChange={(value) => {
      setValue({ value, label: value });
     }}
  />
</ReactUIFeatureFlagsContext.Provider>
```

## Объект со всеми флагами

Чтобы получить объект со всеми флагами, необходимо применить вспомогательную функцию getFullValidationsFlagsContext к объекту заданных флагов:

```typescript static
const allFlags = getFullValidationsFlagsContext(useContext(ReactUIFeatureFlagsContext));
```

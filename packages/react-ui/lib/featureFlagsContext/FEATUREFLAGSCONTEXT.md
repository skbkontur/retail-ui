Включение и отключение отдельных фич через `ReactUIFeatureFlagsContext`

Доступные флаги

```typescript static
export interface ReactUIFeatureFlags {
  tokenInputRemoveWhitespaceFromDefaultDelimiters?: boolean;
  kebabHintRemovePin?: boolean;
  sidePageEnableFocusLockWhenBackgroundBlocked?: boolean;
  spinnerLoaderRemoveDefaultCaption?: boolean;
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

### kebabHintRemovePin

В Hint и Kebab будет убран "клювик" в THEME_2022.
В React UI 5.0 фича будет применена по умолчанию.
```jsx harmony
import { Hint, Kebab, MenuItem, Gapped, ReactUIFeatureFlagsContext } from '@skbkontur/react-ui';

<ReactUIFeatureFlagsContext.Provider value={{ kebabHintRemovePin: true }}>
  <Gapped vertical>
    <Hint text="Подсказка">Hint</Hint>
    <Kebab>
      <MenuItem>
        Редактировать
      </MenuItem>
      <MenuItem>
        Удалить
      </MenuItem>
    </Kebab>
  </Gapped>
</ReactUIFeatureFlagsContext.Provider>
```

### spinnerLoaderRemoveDefaultCaption

В Spinner и Loader убран дефолтный caption.
В React UI 5.0 фича будет применена по умолчанию.

```jsx harmony
import { Loader, ReactUIFeatureFlagsContext } from '@skbkontur/react-ui';

<ReactUIFeatureFlagsContext.Provider value={{ spinnerLoaderRemoveDefaultCaption: true }}>
  <Loader active>
    <div style={{ padding: '16px' }}>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat.
    </div>
  </Loader>
</ReactUIFeatureFlagsContext.Provider>
```

```jsx harmony
import { Spinner, ReactUIFeatureFlagsContext } from '@skbkontur/react-ui';


<ReactUIFeatureFlagsContext.Provider value={{ spinnerLoaderRemoveDefaultCaption: true }}>
  <Spinner/>
</ReactUIFeatureFlagsContext.Provider>
```

### sidePageEnableFocusLockWhenBackgroundBlocked

В SidePage при пропе blockBackground равном true, FocusLock будет применяться по умолчанию. Поведение FocusLock можно настроить вручную с помощью пропа disableFocusLock.
В React UI 5.0 фича будет применена по умолчанию.

```jsx harmony
import { SidePage, Button, ReactUIFeatureFlagsContext } from '@skbkontur/react-ui';

const [opened, setOpened] = React.useState(false);

function renderSidePage() {
  return (
    <ReactUIFeatureFlagsContext.Provider value={{ sidePageEnableFocusLockWhenBackgroundBlocked: true }}>
      <SidePage onClose={close} blockBackground>
        <SidePage.Header>SidePage</SidePage.Header>
        <SidePage.Body>
          <div
            style={{
              background: `repeating-linear-gradient(60deg, #808080, #808080 20px, #d3d3d3 20px, #d3d3d3 40px)`,
              height: 600,
              padding: '20px 0',
            }}
          >
            <SidePage.Container>
              <p>Content</p>
            </SidePage.Container>
          </div>
        </SidePage.Body>
        <SidePage.Footer panel>
          <Button onClick={close}>Close</Button>
        </SidePage.Footer>
      </SidePage>
    </ReactUIFeatureFlagsContext.Provider>
  );
}

function open() {
  setOpened(true);
}

function close() {
  setOpened(false);
}

<div>
  {opened && renderSidePage()}
  <Button onClick={open}>Open</Button>
</div>
```

### menuItemsAtAnyLevel

Mожно использовать различные обертки для пунктов меню

```jsx harmony
import { DropdownMenu, Button, MenuHeader, MenuItem, MenuSeparator, ReactUIFeatureFlagsContext } from '@skbkontur/react-ui';

const groupedMenuItems = (
  <div>
    <MenuItem>MenuItem1</MenuItem>
    <MenuItem>MenuItem2</MenuItem>
    <MenuItem isNotSelectable>Not Selectable</MenuItem>
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

### linkFocusOutline

Для компонентов `<Link />` и `<Button use="link" />` в THEME_2022 добавлена обводка при фокусе.
В React UI 5.0 фича будет применена по умолчанию.

```jsx harmony
import { Link, Button, Gapped, ThemeContext, THEME_2022, DEFAULT_THEME, ReactUIFeatureFlagsContext } from '@skbkontur/react-ui';

<ThemeContext.Provider value={THEME_2022}>
  <Gapped vertical>
    <ReactUIFeatureFlagsContext.Provider value={{ linkFocusOutline: true }}>
      <Gapped>
        <Button use="link">Кнопка</Button>
        <Link>Ссылка</Link>
      </Gapped>
    </ReactUIFeatureFlagsContext.Provider>
    <Link>Старая ссылка</Link>
  </Gapped>
</ThemeContext.Provider>
```

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

### hintAddDynamicPositioning

Этот флаг включает у Hint'а изменение положения, если Hint не попадает во viewport. Если существует положение, в котором Hint будет виден полностью, то Hint будет занимать его.
При включении флага могут потребоваться обновления скриншотных тестов.
В React UI 5.0 фича будет применена по умолчанию.

```jsx harmony
import { Hint, Button, ReactUIFeatureFlagsContext } from '@skbkontur/react-ui';

<ReactUIFeatureFlagsContext.Provider value={{ hintAddDynamicPositioning: true }}>
  <Hint text={'Example!'} pos="bottom center" manual opened>
    <Button use="success" size="medium" disabled>
      Пригласить
    </Button>
  </Hint>
</ReactUIFeatureFlagsContext.Provider>
```

## Объект со всеми флагами

Чтобы получить объект со всеми флагами, необходимо применить вспомогательную функцию getFullValidationsFlagsContext к объекту заданных флагов:

```typescript static
const allFlags = getFullValidationsFlagsContext(useContext(ReactUIFeatureFlagsContext));
```

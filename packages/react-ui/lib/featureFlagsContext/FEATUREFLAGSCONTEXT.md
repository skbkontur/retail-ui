Включение и отключение отдельных фич через `ReactUIFeatureFlagsContext`

Доступные флаги

```typescript static
export interface ReactUIFeatureFlags {
  tokenInputRemoveWhitespaceFromDefaultDelimiters?: boolean;
  sidePageEnableFocusLockWhenBackgroundBlocked?: boolean;
  spinnerLoaderRemoveDefaultCaption?: boolean;
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

## Объект со всеми флагами

Чтобы получить объект со всеми флагами, необходимо применить вспомогательную функцию getFullValidationsFlagsContext к объекту заданных флагов:

```typescript static
const allFlags = getFullValidationsFlagsContext(useContext(ReactUIFeatureFlagsContext));
```

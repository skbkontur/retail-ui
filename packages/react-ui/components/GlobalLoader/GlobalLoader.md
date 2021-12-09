Является индикатором загрузки данных с сервера.

Глобальный лоадер может быть только один в приложении. Если их несколько - работать будет последний.

Родителю глобального лоадера нужно указать position: relative для того чтобы глобальный лоадер позиционировался относительно него.
Также через переменную темы globalLoaderPosition = 'fixed' можно задать фиксированное положение для глобального лоадера.

Глобальным лоадером можно управлять путем передачи необходимых переменных в качестве пропсов, а также с помощью статических методов:

```jsx harmony
import { Button, ThemeContext, ThemeFactory } from '@skbkontur/react-ui';
import { GlobalLoader } from './GlobalLoader';

const myTheme = ThemeFactory.create({ globalLoaderColor: 'green' });

function showGlobalLoader() {
  GlobalLoader.start();
}

function sendSuccess() {
  GlobalLoader.done();
}

function sendError() {
  GlobalLoader.reject();
}

function cancelError() {
  GlobalLoader.accept();
}
<ThemeContext.Provider value={myTheme}>
  <div>
    <p>Управление с помощью статических методов:</p>
    <Button onClick={showGlobalLoader}>Start</Button>
    <Button onClick={sendSuccess}>Success</Button>
    <Button onClick={sendError}>Error</Button>
    <Button onClick={cancelError}>Cancel Error</Button>

    <GlobalLoader expectedResponseTime={2000} delayBeforeShow={0} />
  </div>
</ThemeContext.Provider>
```

```jsx harmony
import {Button, Toggle, ThemeContext, ThemeFactory} from '@skbkontur/react-ui';
import {GlobalLoader} from './GlobalLoader';

const myTheme = ThemeFactory.create({ globalLoaderColor: '#1F87EF' });

const [error, setError] = React.useState(false);
const [active, setActive] = React.useState(false);

<ThemeContext.Provider value={myTheme}>
  <div>
    <p>Управление с помощью пропсов:</p>
    <Toggle checked={active} onValueChange={setActive}>
      Active
    </Toggle>
    <Toggle checked={error} onValueChange={setError}>
      rejected
    </Toggle>
    <GlobalLoader expectedResponseTime={2000} delayBeforeShow={0} active={active} rejected={error}/>
  </div>
</ThemeContext.Provider>
```







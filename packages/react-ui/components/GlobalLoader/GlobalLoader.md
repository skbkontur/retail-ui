Глобальным лоадером можно управлять путем передачи необходимых переменных в качестве пропсов, а также с помощью статических методов:

```jsx harmony
import { Button, ThemeContext, ThemeFactory } from '@skbkontur/react-ui';
import { GlobalLoader } from './GlobalLoader';

const myTheme = ThemeFactory.create({ globalLoaderPosition: 'fixed' });

const [success, setSuccess] = React.useState(false);
const [error, setError] = React.useState(false);
const [active, setActive] = React.useState(false);

function showGlobalLoader() {
  GlobalLoader.start();
}

function sendSuccess() {
  GlobalLoader.done();
}

function sendError() {
  GlobalLoader.reject();
}
function showGlobalLoaderWithProps() {
    setActive(true);
    setError(false);
}

function setErrorProp() {
    setError(true);
}

function setSuccessProp() {
    setActive(false);
}

<div>
  <ThemeContext.Provider value={myTheme}>
    <p>Управление с помощью пропсов:</p>
    <Button onClick={showGlobalLoaderWithProps}>Show GlobalLoader with props</Button>
    <Button onClick={setSuccessProp}>Success</Button>
    <Button onClick={setErrorProp}>Error</Button>
    <p>Управление с помощью статических методов:</p>
    <Button onClick={showGlobalLoader}>Start</Button>
    <Button onClick={sendSuccess}>Success</Button>
    <Button onClick={sendError}>Error</Button>
      <GlobalLoader expectedResponseTime={2000} delayBeforeShow={0} active={active} rejected={error} />
  </ThemeContext.Provider>
</div>
```







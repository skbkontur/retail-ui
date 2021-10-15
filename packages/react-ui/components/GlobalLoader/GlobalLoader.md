Глобальным лоадером можно управлять путем передачи необходимых переменных в качестве пропсов, а также с помощью статических методов:

```jsx harmony
import { Button } from '@skbkontur/react-ui';
import { GlobalLoader } from './GlobalLoader';

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
  setTimeout(() => {
    setActive(true)
  }, 1000);

  setTimeout(() => {
    setError(true)
  }, 10000);

  setTimeout(() => {
    setActive(false)
  }, 30000);
}

<div>
  <p>Управление с помощью пропсов:</p>
  <Button onClick={showGlobalLoaderWithProps}>Show GlobalLoader with props</Button>
  <p>Управление с помощью статических методов:</p>
  <Button onClick={showGlobalLoader}>Start</Button>
  <Button onClick={sendSuccess}>Success</Button>
  <Button onClick={sendError}>Error</Button>
  <GlobalLoader expectedResponseTime={2000} delayBeforeShow={0} active={active} rejected={error} />
</div>
```







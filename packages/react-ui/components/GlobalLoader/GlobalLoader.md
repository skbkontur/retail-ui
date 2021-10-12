Глобальным лоадером можно управлять путем передачи необходимых переменных в качестве пропсов, а также с помощью статических методов:

```jsx harmony
import { Button } from '@skbkontur/react-ui';
import { GlobalLoader } from './GlobalLoader';

const [success, setSuccess] = React.useState(false);
const [error, setError] = React.useState(false);
const [loading, setLoading] = React.useState(false);

setTimeout(() => {
  setLoading(true)
}, 5000);

setTimeout(() => {
  setError(true)
}, 10000);

setTimeout(() => {
  setSuccess(true)
}, 30000);

function showGlobalLoader() {
  GlobalLoader.start();
}

function sendSuccess() {
  GlobalLoader.done();
}

function sendError() {
  GlobalLoader.reject();
}

<div>
  <Button onClick={showGlobalLoader}>Start</Button>
  <Button onClick={sendSuccess}>Success</Button>
  <Button onClick={sendError}>Error</Button>
  <GlobalLoader expectedResponseTime={2000} delayBeforeShow={0} active={loading} downloadSuccess={success}
                rejected={error} />
</div>
```








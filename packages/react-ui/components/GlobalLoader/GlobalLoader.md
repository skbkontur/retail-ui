Глобальным лоадером можно управлять путем передачи необходимых переменных в качестве пропсов:
```jsx harmony
import { GlobalLoader } from './GlobalLoader';

const [success, setSuccess] = React.useState(false);
const [error, setError] = React.useState(false);
const [active, setActive] = React.useState(false);

setTimeout(() => {
  setActive(true)
}, 5000);

setTimeout(() => {
  setSuccess(true)
}, 30000);


<GlobalLoader expectedDownloadTime={2000} delayBeforeGlobalLoaderShow={0} isActive={active} downloadSuccess={success} downloadError={error} />
```

А также Глобальным лоадером можно управлять с помощью статических методов
```jsx harmony
import { Button } from '@skbkontur/react-ui';
import { GlobalLoader } from './GlobalLoader';

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
  <GlobalLoader expectedDownloadTime={2000}/>
</div>

```








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
  }, 5000);

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

Глобальный лоадер можно позиционировать внутри родительского компонента. Для этого родителю необходимо указать position: relative
Чтобы увидеть следующий пример, раскомментируйте импорт и сам компенент (т.к. глобальный лоадер может быть только один)
```jsx harmony
import { Button, Toggle, Modal } from '@skbkontur/react-ui';
// import { GlobalLoader } from './GlobalLoader';
import { position } from 'polished';

const [opened, setOpened] = React.useState(false);

function showGlobalLoader() {
  GlobalLoader.start();
}

function sendSuccess() {
  GlobalLoader.done();
}

function sendError() {
  GlobalLoader.reject();
}

function renderModal() {
  return (
    <Modal onClose={close}>
      <Modal.Header>Title</Modal.Header>
      <Modal.Body style={{position: 'relative'}}>
        {/*<GlobalLoader expectedResponseTime={2000}/>*/}
        <p>Use rxjs operators with react hooks</p>
        <Button onClick={showGlobalLoader}>Start</Button>
        <Button onClick={sendSuccess}>Success</Button>
        <Button onClick={sendError}>Error</Button>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={close}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function open() {
  setOpened(true);
}

function close() {
  setOpened(false);
}

<div>
  {opened && renderModal()}
  <Button onClick={open}>Open</Button>
</div>;
```








```jsx harmony
import { Button, Toggle } from '@skbkontur/react-ui';

let initialState = { opened: false };

function renderModal() {
  return (
    <Modal onClose={close}>
      <Modal.Header>Title</Modal.Header>
      <Modal.Body>
        <p>Use rxjs operators with react hooks</p>

        <div>
          <Toggle checked={state.panel} onValueChange={() => setState(({ panel }) => ({ panel: !panel }))} /> Panel{' '}
          {state.panel ? 'enabled' : 'disabled'}
        </div>
      </Modal.Body>
      <Modal.Footer panel={state.panel}>
        <Button onClick={close}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function open() {
  setState({ opened: true });
}

function close() {
  setState({ opened: false });
}

<div>
  {state.opened && renderModal()}
  <Button onClick={open}>Open</Button>
</div>;
```

```jsx harmony
import { Button, Toggle } from '@skbkontur/react-ui';

const [opened, setOpened] = React.useState(false);
const [panel, setPanel] = React.useState(false);

function renderModal() {
  return (
    <Modal onClose={close}>
      <Modal.Header>Title</Modal.Header>
      <Modal.Body>
        <p>Use rxjs operators with react hooks</p>

        <div>
          <Toggle checked={panel} onValueChange={setPanel} /> Panel{' '}
          {panel ? 'enabled' : 'disabled'}
        </div>
      </Modal.Body>
      <Modal.Footer panel={panel}>
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

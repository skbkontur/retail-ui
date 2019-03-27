```js
const { default: Toggle } = require('../Toggle');
const { default: Button } = require('../Button');

let initialState = { opened: false };

function renderModal() {
  return (
    <Modal onClose={close}>
      <Modal.Header>Title</Modal.Header>
      <Modal.Body>
        <p>Use rxjs operators with react hooks</p>

        <div>
          <Toggle checked={state.panel} onChange={() => setState(({ panel }) => ({ panel: !panel }))} /> Panel{' '}
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

```js
const { default: Toggle } = require('../Toggle');
const { default: Button } = require('../Button');

let initialState = { opened: false };

function renderSidePage() {
  return (
    <SidePage onClose={close} blockBackground>
      <SidePage.Header>Title</SidePage.Header>
      <SidePage.Body>
        <div style={{ padding: '0 30px' }}>
          <p>
            A lotta people ask me where the fuck I've been at the last few
            years.
          </p>
        </div>
      </SidePage.Body>
      <SidePage.Footer panel>
        <Button onClick={close}>Close</Button>
      </SidePage.Footer>
    </SidePage>
  );
}

function open() {
  setState({ opened: true });
}

function close() {
  setState({ opened: false });
}

<div>
  {state.opened && renderSidePage()}
  <Button onClick={open}>Open</Button>
</div>;
```

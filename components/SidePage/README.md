```js
const { default: Toggle } = require("../Toggle");
const { default: Button } = require("../Button");

let initialState = { opened: false };

function renderSidePage() {
  return (
    <SidePage onClose={close}>
      <SidePage.Header>Title</SidePage.Header>
      <SidePage.Body>
        <p>
          A lotta people ask me where the fuck I've been at the last few years.
        </p>

        <div>
          <Toggle
            checked={state.panel}
            onChange={() => setState(({ panel }) => ({ panel: !panel }))}
          />{" "}
          Panel {state.panel ? "enabled" : "disabled"}
        </div>
      </SidePage.Body>
      <SidePage.Footer panel={state.panel}>
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

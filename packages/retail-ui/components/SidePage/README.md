```jsx
let initialState = { opened: false };

function renderSidePage() {
  return (
    <SidePage onClose={close} blockBackground>
      <SidePage.Header>Title</SidePage.Header>
      <SidePage.Body>
        <div
          style={{
            background: `repeating-linear-gradient(
                          60deg,
                          #fafafa,
                          #fafafa 20px,
                          #dfdede 20px,
                          #dfdede 40px
                        )`,
            height: 600,
            padding: '20px 0'
          }}
        >
          <SidePage.Container>
            <p>
              A lotta people ask me where the fuck I've been at the last few
              years.
            </p>
          </SidePage.Container>
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

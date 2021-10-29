```jsx harmony
import { Button } from '@skbkontur/react-ui';

const [opened, setOpened] = React.useState(false);
const [height, setHeight] = React.useState('100%');

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
            height: height,
            boxSizing: 'border-box',
            borderTop: '10px solid red',
            borderBottom: '10px solid blue',
          }}
        >
          <SidePage.Container>
            <Button onClick={() => setHeight(height === '100%' ? 1600 : '100%')}>height ({height})</Button>
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
  setOpened(true);
}

function close() {
  setOpened(false);
}

<div>
  {opened && renderSidePage()}
  <Button onClick={open}>Open</Button>
</div>;
```

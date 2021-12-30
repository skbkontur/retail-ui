```jsx harmony
import { ThemeContext, Button } from '@skbkontur/react-ui';

const [opened, setOpened] = React.useState(false);

const linearLightGradient = `repeating-linear-gradient(
                                60deg,
                                #fafafa,
                                #fafafa 20px,
                                #dfdede 20px,
                                #dfdede 40px
                              )`;
const linearDarkGradient = `repeating-linear-gradient(
                                60deg,
                                #868b8e,
                                #868b8e 20px,
                                #444 20px,
                                #444 40px
                              )`;

function renderSidePage() {
  return (
    <ThemeContext.Consumer>
      {theme => {
        return(
          <SidePage onClose={close} blockBackground>
            <SidePage.Header>Title</SidePage.Header>
            <SidePage.Body>
              <div
                style={{
                  background:  theme.prototype.constructor.name === 'DarkTheme'
                    ? '' + linearDarkGradient + ''
                    : '' + linearLightGradient + '',
                  height: 600,
                  padding: '20px 0',
                }}
              >
                <SidePage.Container>
                  <p>Use rxjs operators with react hooks</p>
                </SidePage.Container>
              </div>
            </SidePage.Body>
            <SidePage.Footer panel>
              <Button onClick={close}>Close</Button>
            </SidePage.Footer>
          </SidePage>
        )
      }}
    </ThemeContext.Consumer>
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

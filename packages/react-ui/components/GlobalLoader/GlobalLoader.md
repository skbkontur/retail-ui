Индикатор обмена данными с сервером.

Глобальный Лоадер может быть только один в приложении. Поэтому, каждый новый экземпляр компонента
"убивает" предыдущий
экземпляр, и начинает перехватывать статические методы.

Предполагается монтирование компонента в единственном месте. И управление им через статические методы, либо через пропы.

Все статические методы:
```jsx harmony
import { Button, Gapped } from '@skbkontur/react-ui';

<Gapped>
  <Button onClick={GlobalLoader.start} use="primary">start</Button>
  <Button onClick={GlobalLoader.done} use="success">done</Button>
  <Button onClick={GlobalLoader.reject} use="danger">reject</Button>
  <Button onClick={GlobalLoader.accept} use="pay">accept</Button>
</Gapped>
```

Монтирование и кастомизация:
```jsx harmony
import { Button, Toggle, Gapped, ThemeContext, ThemeFactory } from '@skbkontur/react-ui';
import { GlobalLoader } from './GlobalLoader';

const myTheme = ThemeFactory.create({ globalLoaderColor: 'red' });

const [manually, setManually] = React.useState(false);
const [active, setActive] = React.useState(false);
const [error, setError] = React.useState(false);

const handleChange= () => {
    if (manually) {
        setManually(false);
        setError(false);
        setActive(false);
    } else {
        setManually(true);
    }
}

<Gapped vertical>
  <Toggle checked={manually} onValueChange={handleChange}>
    Управление пропами
  </Toggle>
  <Toggle checked={active} onValueChange={setActive} disabled={!manually}>
    <code>active</code>
  </Toggle>
  <Toggle checked={error} onValueChange={setError} disabled={!manually}>
    <code>rejected</code>
  </Toggle>

  <ThemeContext.Provider value={myTheme}>
    <GlobalLoader expectedResponseTime={2000} delayBeforeShow={1000} active={active} rejected={error}
      onStart={(s) => console.log('start', s)}
      onDone={(s) => console.log('done', s)}
      onReject={() => console.log('reject')}
      onAccept={() => console.log('accept')}
    />
  </ThemeContext.Provider>

</Gapped>
```


Статические методы в модалке:
```jsx harmony
import { Button, Gapped, Modal } from '@skbkontur/react-ui';

const [opened, setOpened] = React.useState(false);

function renderModal() {
  return (
    <Modal onClose={close}>
      <Modal.Header>Заголовок</Modal.Header>
      <Modal.Body>
        <Gapped>
          <Button onClick={GlobalLoader.start} use="primary">start</Button>
          <Button onClick={GlobalLoader.done} use="success">done</Button>
        </Gapped>
      </Modal.Body>
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
  <Button onClick={open}>Открыть</Button>
</div>;
```

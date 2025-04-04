import React from 'react';
import { GlobalLoader, Button, Gapped, Toggle, ThemeContext, ThemeFactory, Modal } from '@skbkontur/react-ui';

import { Meta, Story } from '../../../typings/stories';

export default {
  title: 'Display data/GlobalLoader',
  component: GlobalLoader,
  parameters: { creevey: { skip: true } },
} as Meta;

export const Example1: Story = () => {
  return (
    <Gapped>
      <Button onClick={GlobalLoader.start} use="primary">
        start
      </Button>
      <Button onClick={GlobalLoader.done} use="success">
        done
      </Button>
      <Button onClick={GlobalLoader.reject} use="danger">
        reject
      </Button>
      <Button onClick={GlobalLoader.accept} use="pay">
        accept
      </Button>
    </Gapped>
  );
};
Example1.storyName = 'Все статические методы';

export const Example2: Story = () => {
  const myTheme = ThemeFactory.create({ globalLoaderColor: 'red' });

  const [manually, setManually] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const [error, setError] = React.useState(false);

  const reset = () => {
    if (manually) {
      setManually(false);
      setError(false);
      setActive(false);
    } else {
      setManually(true);
    }
  };

  return (
    <Gapped vertical>
      <Toggle checked={manually} onValueChange={reset}>
        Управление пропами
      </Toggle>
      <Toggle checked={active} onValueChange={setActive} disabled={!manually}>
        <code>active</code>
      </Toggle>
      <Toggle checked={error} onValueChange={setError} disabled={!manually}>
        <code>rejected</code>
      </Toggle>

      <ThemeContext.Provider value={myTheme}>
        <GlobalLoader
          expectedResponseTime={2000}
          delayBeforeShow={1000}
          active={active}
          rejected={error}
          onStart={() => console.log('start')}
          onDone={() => console.log('done')}
          onReject={() => console.log('reject')}
          onAccept={() => console.log('accept')}
        />
      </ThemeContext.Provider>
    </Gapped>
  );
};
Example2.storyName = 'Монтирование и кастомизация';

export const Example3: Story = () => {
  const [opened, setOpened] = React.useState(false);

  function renderModal() {
    return (
      <Modal onClose={close}>
        <Modal.Header>Заголовок</Modal.Header>
        <Modal.Body>
          <Gapped>
            <Button onClick={GlobalLoader.start} use="primary">
              start
            </Button>
            <Button onClick={GlobalLoader.done} use="success">
              done
            </Button>
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

  return (
    <div>
      {opened && renderModal()}
      <Button onClick={open}>Открыть</Button>
    </div>
  );
};
Example3.storyName = 'Статические методы в модалке';

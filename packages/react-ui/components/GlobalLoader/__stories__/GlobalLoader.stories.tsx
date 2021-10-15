import React from 'react';

import { Story } from '../../../typings/stories';
import { GlobalLoader } from '../GlobalLoader';
import { Button } from '../../Button';
import { Modal } from '../../Modal';

function GlobalLoaderWithProps() {
  const [error, setError] = React.useState(false);
  const [active, setActive] = React.useState(false);

  return (
    <div>
      <Button onClick={showGlobalLoaderWithProps}>Show Global Loader</Button>
      <GlobalLoader expectedResponseTime={2000} delayBeforeShow={0} active={active} rejected={error} />
    </div>
  );

  function showGlobalLoaderWithProps() {
    setTimeout(() => {
      setActive(true);
    }, 1000);

    setTimeout(() => {
      setError(true);
    }, 10000);

    setTimeout(() => {
      setActive(false);
    }, 30000);
  }
}

function GlobalLoaderWithStaticMethods() {
  return (
    <div>
      <Button onClick={showGlobalLoader}>Start</Button>
      <Button onClick={sendSuccess}>Success</Button>
      <Button onClick={sendError}>Error</Button>
      <GlobalLoader expectedResponseTime={2000} />
    </div>
  );

  function showGlobalLoader() {
    GlobalLoader.start();
  }

  function sendSuccess() {
    GlobalLoader.done();
  }

  function sendError() {
    GlobalLoader.reject();
  }
}

function GlobalLoaderInsideModalBody() {
  const [opened, setOpened] = React.useState(false);

  return (
    <div>
      {opened && renderModal()}
      <Button onClick={open}>Open</Button>
    </div>
  );

  function showGlobalLoader() {
    GlobalLoader.start();
  }

  function sendSuccess() {
    GlobalLoader.done();
  }

  function sendError() {
    GlobalLoader.reject();
  }

  function renderModal() {
    return (
      <Modal onClose={close}>
        <Modal.Header>Title</Modal.Header>
        <Modal.Body style={{ position: 'relative' }}>
          <GlobalLoader expectedResponseTime={2000} />
          <p>Use rxjs operators with react hooks</p>
          <Button onClick={showGlobalLoader}>Start</Button>
          <Button onClick={sendSuccess}>Success</Button>
          <Button onClick={sendError}>Error</Button>
        </Modal.Body>
        <Modal.Footer>
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
}

export default { title: 'GlobalLoader' };

export const GlobalLoaderWithPropsContent: Story = () => <GlobalLoaderWithProps />;
GlobalLoaderWithPropsContent.storyName = 'with props';
GlobalLoaderWithPropsContent.parameters = { creevey: { skip: true } };

export const GlobalLoaderWithStaticMethodsContent: Story = () => <GlobalLoaderWithStaticMethods />;
GlobalLoaderWithStaticMethodsContent.storyName = 'with static methods';
GlobalLoaderWithStaticMethodsContent.parameters = { creevey: { skip: true } };

export const GlobalLoaderInsideModalBodyContent: Story = () => <GlobalLoaderInsideModalBody />;
GlobalLoaderInsideModalBodyContent.storyName = 'inside parent';
GlobalLoaderInsideModalBodyContent.parameters = { creevey: { skip: true } };

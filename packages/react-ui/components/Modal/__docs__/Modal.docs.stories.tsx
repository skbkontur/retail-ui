import React from 'react';
import { Modal, Button, Toggle } from '@skbkontur/react-ui';

import { Story } from '../../../typings/stories';

export default {
  title: 'Overlay/Modal/Modal',
  component: Modal,
  parameters: { creevey: { skip: true } },
};

export const Example1: Story = () => {
  const [opened, setOpened] = React.useState(false);
  const [panel, setPanel] = React.useState(false);

  function renderModal() {
    return (
      <Modal onClose={close}>
        <Modal.Header>Title</Modal.Header>
        <Modal.Body>
          <p>Use rxjs operators with react hooks</p>

          <div>
            <Toggle checked={panel} onValueChange={setPanel} /> Panel {panel ? 'enabled' : 'disabled'}
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

  return (
    <div>
      {opened && renderModal()}
      <Button onClick={open}>Open</Button>
    </div>
  );
};
Example1.storyName = 'Базовый пример';

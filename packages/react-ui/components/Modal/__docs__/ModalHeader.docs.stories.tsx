import { Button, Gapped, Modal, Toggle } from '@skbkontur/react-ui';
import React from 'react';

import type { Meta } from '../../../typings/stories.js';
import type { Story } from '../../../typings/stories.js';
import { ModalHeader } from '../ModalHeader.js';

const meta: Meta = {
  title: 'Overlay/Modal',
  component: ModalHeader,
  parameters: { creevey: { skip: true } },
};

export default meta;

/** Проп `sticky` закрепляет заголовок вверху модального окна. */
export const ExampleStickyHeader: Story = () => {
  const [opened, setOpened] = React.useState(false);
  const [sticky, setSticky] = React.useState(false);

  function renderModal() {
    return (
      <Modal onClose={close}>
        <Modal.Header sticky={sticky}>Заголовок</Modal.Header>
        <Modal.Body>
          <Gapped vertical>
            <div>
              <Toggle checked={sticky} onValueChange={setSticky} /> "sticky" {sticky ? 'true' : 'false'}
            </div>
            <div
              style={{
                width: 300,
                height: 1700,
                backgroundColor: '#eee',
                background: 'repeating-linear-gradient(-45deg, #ccc, #ccc 25px, #eee 25px, #eee 225px)',
              }}
            />
          </Gapped>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={close}>Закрыть</Button>
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
      <Button onClick={open}>Открыть модальное окно</Button>
    </div>
  );
};
ExampleStickyHeader.storyName = 'Закрепление заголовка';

/** Проп `cutTitleOnStuck` обрезает часть длинного заголовка, если включен проп закрепления — `sticky`.  */
export const ExampleCutHeader: Story = () => {
  const [opened, setOpened] = React.useState(false);

  function renderModal() {
    return (
      <Modal onClose={close} width={'400px'}>
        <Modal.Header sticky cutTitleOnStuck>
          Очень длинный заголовок в несколько строк
        </Modal.Header>
        <Modal.Body>
          <Gapped vertical>
            <div
              style={{
                width: 300,
                height: 1700,
                backgroundColor: '#eee',
                background: 'repeating-linear-gradient(-45deg, #ccc, #ccc 25px, #eee 25px, #eee 225px)',
              }}
            />
          </Gapped>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={close}>Закрыть</Button>
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
      <Button onClick={open}>Открыть модальное окно</Button>
    </div>
  );
};
ExampleCutHeader.storyName = 'Транкейт заголовка при закреплении через sticky';

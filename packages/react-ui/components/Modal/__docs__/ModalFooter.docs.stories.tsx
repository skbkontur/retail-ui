import { Button, Gapped, Modal, Toggle } from '@skbkontur/react-ui';
import React from 'react';

import type { Meta } from '../../../typings/stories.js';
import type { Story } from '../../../typings/stories.js';
import { ModalFooter } from '../ModalFooter.js';

const meta: Meta = {
  title: 'Overlay/Modal',
  component: ModalFooter,
  parameters: { creevey: { skip: true } },
};

export default meta;

/** Проп `sticky` для закрепляет футер снизу модального окна. На десктопе — `true`, на мобильных — `false`. */
export const ExampleStickyFooter: Story = () => {
  const [opened, setOpened] = React.useState(false);

  function renderModal() {
    return (
      <Modal onClose={close}>
        <Modal.Header>Заголовок</Modal.Header>
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
        <Modal.Footer sticky>
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
ExampleStickyFooter.storyName = 'Закрепление футера';

/** Проп `panel` визуально отделяет футер от остальной части модального окна с помощью разделителя. */
export const ExamplePanel: Story = () => {
  const [opened, setOpened] = React.useState(false);
  const [panel, setPanel] = React.useState(true);

  function renderModal() {
    return (
      <Modal onClose={close}>
        <Modal.Header>Заголовок</Modal.Header>
        <Modal.Body>
          <p>Контент-зона модального окна</p>

          <div>
            <Toggle checked={panel} onValueChange={setPanel} /> "panel" {panel ? 'enabled' : 'disabled'}
          </div>
        </Modal.Body>
        <Modal.Footer panel={panel}>
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
ExamplePanel.storyName = 'Разделитель перед футером';

/** Проп `gap` задаёт расстояние между элементами футера в пикселях. */
export const ExampleGap: Story = () => {
  const [opened, setOpened] = React.useState(false);

  function renderModal() {
    return (
      <Modal onClose={close}>
        <Modal.Header>Заголовок</Modal.Header>
        <Modal.Body>
          <p>Контент-зона модального окна</p>
        </Modal.Body>
        <Modal.Footer gap={15}>
          <Button use="primary" onClick={close}>
            Отправить
          </Button>
          <Button onClick={close}>Отменить</Button>
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
ExampleGap.storyName = 'Расстояние между элементами в футере';

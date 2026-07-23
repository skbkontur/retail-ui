import { Button, Modal } from '@skbkontur/react-ui';
import React from 'react';

import type { Story } from '../../../typings/stories.js';

export default {
  title: 'Overlay/Modal',
  component: Modal,
  parameters: { creevey: { skip: true } },
};

export const ExampleBasic: Story = () => {
  const [opened, setOpened] = React.useState(false);

  function renderModal() {
    return (
      <Modal onClose={close}>
        <Modal.Header>Заголовок</Modal.Header>
        <Modal.Body>
          <p>Контент-зона модального окна</p>
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

/** Проп `width` задаёт ширину модального окна. */
export const ExampleWidth: Story = () => {
  const [opened, setOpened] = React.useState(false);

  function renderModal() {
    return (
      <Modal width={'400px'} onClose={close}>
        <Modal.Header>Заголовок</Modal.Header>
        <Modal.Body>
          <p>Контент-зона модального окна</p>
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
ExampleWidth.storyName = 'Ширина';

/** Проп `alignTop` перемещает модальное окно в верхнюю часть страницы. */
export const ExampleAlignTop: Story = () => {
  const [opened, setOpened] = React.useState(false);

  function renderModal() {
    return (
      <Modal alignTop onClose={close}>
        <Modal.Header>Заголовок</Modal.Header>
        <Modal.Body>
          <p>Контент-зона модального окна</p>
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
ExampleAlignTop.storyName = 'Расположение в верхней части страницы';

/** Cобытие `onClose` задаёт функцию, которая вызывается, когда пользователь запросил закрытие окна — нажал на фон, Escape или крестик. */
export const ExampleOnClose: Story = () => {
  const [opened, setOpened] = React.useState(false);

  function renderModal() {
    return (
      <Modal onClose={close}>
        <Modal.Header>Заголовок</Modal.Header>
        <Modal.Body>
          <p>Контент-зона модального окна</p>
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
ExampleOnClose.storyName = 'Закрытие модального окна';

/** Проп `disableClose` отключает событие `onClose` и блокирует кнопку закрытия модального окна. */
export const ExampleDisableClose: Story = () => {
  const [opened, setOpened] = React.useState(false);

  function renderModal() {
    return (
      <Modal onClose={close} disableClose>
        <Modal.Header>Заголовок</Modal.Header>
        <Modal.Body>
          <p>Контент-зона модального окна</p>
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
ExampleDisableClose.storyName = 'Блокировка крестика и отключение события onClose';

/** Проп `ignoreBackgroundClick` оставляет модальное окно открытым, когда пользователь кликнул на фон. */
export const ExampleIgnoreBackgroundClick: Story = () => {
  const [opened, setOpened] = React.useState(false);

  function renderModal() {
    return (
      <Modal onClose={close} ignoreBackgroundClick>
        <Modal.Header>Заголовок</Modal.Header>
        <Modal.Body>
          <p>Контент-зона модального окна</p>
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
ExampleIgnoreBackgroundClick.storyName = 'Блокировка закрытия при клике вне модального окна';

/** Проп `noClose` скрывает крестик закрытия. */
export const ExampleNoClose: Story = () => {
  const [opened, setOpened] = React.useState(false);

  function renderModal() {
    return (
      <Modal onClose={close} noClose>
        <Modal.Header>Заголовок</Modal.Header>
        <Modal.Body>
          <p>Контент-зона модального окна</p>
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
ExampleNoClose.storyName = 'Скрытие крестика закрытия';

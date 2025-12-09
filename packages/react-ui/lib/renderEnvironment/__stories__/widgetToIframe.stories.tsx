import React from 'react';

import type { Meta, Story } from '../../../typings/stories';
import { WithIframeInIframe } from '../../../.storybook/decorators/Widget/withIframe';
import { Hint } from '../../../components/Hint';
import { Modal } from '../../../components/Modal';
import { Toggle } from '../../../components/Toggle';
import { Button } from '../../../components/Button';
import { HideBodyVerticalScroll } from '../../../internal/HideBodyVerticalScroll';

export default {
  title: 'widgetToIframe',
  decorators: [WithIframeInIframe],
  parameters: {
    creevey: {
      skip: {
        firefox: {
          in: /firefox/,
        },
        chromeDark: {
          in: /chrome2022Dark/,
        },
      },
    },
  },
} as Meta;

// Обработка событий + Использование в методах жизненного цикла (didMount/didUpdate/didUnmount)
export const ModalStory: Story = () => {
  const [opened, setOpened] = React.useState(true);

  function renderModal() {
    return (
      <Modal onClose={close}>
        <Modal.Header>Title</Modal.Header>
        <Modal.Body>
          <p>Use rxjs operators with react hooks</p>
        </Modal.Body>
      </Modal>
    );
  }

  function close() {
    setOpened(false);
  }

  return <>{opened && renderModal()}</>;
};

// Таймеры
export const HintStory: Story = () => (
  <Hint pos={'right'} text="Подсказка">
    <span>Базовая</span>
  </Hint>
);

// компоненты без DOM представления
export const ScrollIsHiddenStory: Story = () => (
  <>
    <HideBodyVerticalScroll />
    <div style={{ height: '1000px', background: 'lightgrey' }}>Этот блок вызывает скроллбар</div>
  </>
);

// Глобальное состояние на окно (затемнение у модалок)
export const ModalStackStory: Story = () => {
  const [modal1Opened, setModal1Opened] = React.useState(false);

  const [modal2Opened, setModal2Opened] = React.useState(false);

  const openModal1 = () => setModal1Opened(true);
  const closeModal1 = () => setModal1Opened(false);

  const openModal2 = () => setModal2Opened(true);
  const closeModal2 = () => setModal2Opened(false);

  return (
    <div>
      <Button onClick={openModal1}>Открыть</Button>

      {modal1Opened && (
        <Modal onClose={closeModal1} width={500}>
          <Modal.Header>Модальное окно 1</Modal.Header>
          <Modal.Body>
            <p>Это первое модальное окно.</p>
            <Button onClick={openModal2}>Открыть</Button>
          </Modal.Body>
        </Modal>
      )}

      {modal2Opened && (
        <Modal onClose={closeModal2} width={350}>
          <Modal.Header>Модальное окно 2</Modal.Header>
          <Modal.Body>
            <p>Это второе модальное окно.</p>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

// При импорте модуля. Проверка работы keyListener на примере активации Toggle по Tab
export const ToggleStory: Story = () => <Toggle />;

import React from 'react';
import { Modal, Button, Toggle, Gapped } from '@skbkontur/react-ui';

import type { Story } from '../../../typings/stories';

export default {
  title: 'Overlay/Modal/Modal',
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

/** Проп `panel` для [Modal.Footer](https://tech.skbkontur.ru/kontur-ui/?path=/docs/react-ui_overlay-modal-modalfooter--docs) визуально отделяет футер от остальной части модального окна с помощью разделителя. */
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

/** Проп `sticky` для [Modal.Header](https://tech.skbkontur.ru/kontur-ui/?path=/docs/react-ui_overlay-modal-modalheader--docs) закрепляет заголовок вверху модального окна. */
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

/** Проп `cutTitleOnStuck` для [Modal.Header](https://tech.skbkontur.ru/kontur-ui/?path=/docs/react-ui_overlay-modal-modalheader--docs) обрезает часть длинного заголовка, если включен проп закрепления — `sticky`  */
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

/** Проп `sticky` для [Modal.Footer](https://tech.skbkontur.ru/kontur-ui/?path=/docs/react-ui_overlay-modal-modalfooter--docs) закрепляет футер снизу модального окна. На десктопе — `true`, на мобильных — `false`. */
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

/** Отключает событие `onClose` и блокирует кнопку закрытия модального окна. */
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

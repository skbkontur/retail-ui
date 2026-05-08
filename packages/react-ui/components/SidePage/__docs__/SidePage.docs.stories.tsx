import { Button, Gapped, SidePage } from '@skbkontur/react-ui';
import React from 'react';

import type { Meta, Story } from '../../../typings/stories.js';

const meta: Meta = {
  title: 'Overlay/SidePage/SidePage',
  component: SidePage,
  parameters: { creevey: { skip: true } },
};

export default meta;

export const ExampleBasic: Story = () => {
  const [opened, setOpened] = React.useState(false);

  function renderSidePage() {
    return (
      <SidePage onClose={close} blockBackground>
        <SidePage.Header>Заголовок</SidePage.Header>
        <SidePage.Body>
          <div
            style={{
              background: `#d6d6d6`,
              height: 600,
              padding: '20px 0',
            }}
          >
            <SidePage.Container>
              <p>Контент-блок в контейнере с отступами </p>
            </SidePage.Container>
          </div>
        </SidePage.Body>
        <SidePage.Footer>
          <Button onClick={close}>Закрыть</Button>
        </SidePage.Footer>
      </SidePage>
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
      {opened && renderSidePage()}
      <Button onClick={open}>Открыть сайдпейдж</Button>
    </div>
  );
};

/**
 * Проп `width` задаёт ширину сайдпейджа.
 */
export const ExampleWidth: Story = () => {
  const [opened, setOpened] = React.useState(false);

  function renderSidePage() {
    return (
      <SidePage width={'600px'} onClose={close} blockBackground>
        <SidePage.Header>Заголовок</SidePage.Header>
        <SidePage.Body>
          <div
            style={{
              background: `#d6d6d6`,
              height: 600,
              padding: '20px 0',
            }}
          >
            <SidePage.Container>
              <p>Контент-зона </p>
            </SidePage.Container>
          </div>
        </SidePage.Body>
        <SidePage.Footer>
          <Button onClick={close}>Закрыть</Button>
        </SidePage.Footer>
      </SidePage>
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
      {opened && renderSidePage()}
      <Button onClick={open}>Открыть сайдпейдж</Button>
    </div>
  );
};
ExampleWidth.storyName = 'Ширина';

/**
 * Проп `fromLeft` отображает сайдпейдж слева.
 */
export const ExampleFromLeft: Story = () => {
  const [opened, setOpened] = React.useState(false);

  function renderSidePage() {
    return (
      <SidePage fromLeft onClose={close} blockBackground>
        <SidePage.Header>Заголовок</SidePage.Header>
        <SidePage.Body>
          <div
            style={{
              background: `#d6d6d6`,
              height: 600,
              padding: '20px 0',
            }}
          >
            <SidePage.Container>
              <p>Контент-зона </p>
            </SidePage.Container>
          </div>
        </SidePage.Body>
        <SidePage.Footer>
          <Button onClick={close}>Закрыть</Button>
        </SidePage.Footer>
      </SidePage>
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
      {opened && renderSidePage()}
      <Button onClick={open}>Открыть сайдпейдж</Button>
    </div>
  );
};
ExampleFromLeft.storyName = 'Расположение слева';

/**
 * Проп `sticky` для [SidePage.Header](https://tech.skbkontur.ru/kontur-ui/?path=/docs/react-ui_overlay-sidepage-sidepageheader--docs) закрепляет заголовок при прокрутке содержимого.
 * По умолчанию закрепление включено.
 */
export const ExampleSticky: Story = () => {
  const [opened, setOpened] = React.useState(false);
  const [sticky, setSticky] = React.useState(false);

  function renderSidePage() {
    return (
      <SidePage onClose={close} blockBackground>
        <SidePage.Header sticky={sticky}>Заголовок</SidePage.Header>
        <SidePage.Body>
          <div
            style={{
              background: `#d6d6d6`,
              height: 1600,
              padding: '20px 0',
            }}
          >
            <SidePage.Container>
              <p>Контент-зона</p>
            </SidePage.Container>
          </div>
        </SidePage.Body>
        <SidePage.Footer>
          <Button onClick={close}>Закрыть</Button>
        </SidePage.Footer>
      </SidePage>
    );
  }

  function open(sticky: boolean) {
    setOpened(true);
    setSticky(sticky);
  }

  function close() {
    setOpened(false);
  }

  return (
    <div>
      {opened && renderSidePage()}
      <Gapped>
        <Button onClick={() => open(true)}>С закреплением</Button>
        <Button onClick={() => open(false)}>Без закрепления</Button>
      </Gapped>
    </div>
  );
};
ExampleSticky.storyName = 'Закрепление заголовка';

/**
 * Проп `cutTitleOnStuck` для [SidePage.Header](https://tech.skbkontur.ru/kontur-ui/?path=/docs/react-ui_overlay-sidepage-sidepageheader--docs) обрезает часть длинного заголовка в шапке при прокрутке содержимого, если включен проп закрепления заголовка — `sticky`.
 */
export const ExampleCutTitleOnStuck: Story = () => {
  const [opened, setOpened] = React.useState(false);
  const [cutTitleOnStuck, setСutTitleOnStuck] = React.useState(false);

  function renderSidePage() {
    return (
      <SidePage onClose={close} blockBackground>
        <SidePage.Header cutTitleOnStuck={cutTitleOnStuck}>
          Очень длинный заголовок в несколько строк для примера работы транкейта
        </SidePage.Header>
        <SidePage.Body>
          <div
            style={{
              background: `#d6d6d6`,
              height: 1600,
              padding: '20px 0',
            }}
          >
            <SidePage.Container>
              <p>Контент-зона</p>
            </SidePage.Container>
          </div>
        </SidePage.Body>
        <SidePage.Footer>
          <Button onClick={close}>Закрыть</Button>
        </SidePage.Footer>
      </SidePage>
    );
  }

  function open(cutTitleOnStuck: boolean) {
    setOpened(true);
    setСutTitleOnStuck(cutTitleOnStuck);
  }

  function close() {
    setOpened(false);
  }

  return (
    <div>
      {opened && renderSidePage()}
      <Gapped>
        <Button onClick={() => open(true)}>С транкейтом</Button>
        <Button onClick={() => open(false)}>Без транкейта</Button>
      </Gapped>
    </div>
  );
};
ExampleCutTitleOnStuck.storyName = 'Транкейт заголовка при закреплении заголовка';

/**
 * Проп `panel` для [SidePage.Footer](https://tech.skbkontur.ru/kontur-ui/?path=/docs/react-ui_overlay-sidepage-sidepagefooter--docs) визуально отделяет футер от остальной части сайдпейджа с помощью разделителя.
 */
export const ExamplePanel: Story = () => {
  const [opened, setOpened] = React.useState(false);

  function renderSidePage() {
    return (
      <SidePage onClose={close} blockBackground>
        <SidePage.Header>Заголовок</SidePage.Header>
        <SidePage.Body>
          <div>
            <SidePage.Container>
              <p>Контент-зона </p>
            </SidePage.Container>
          </div>
        </SidePage.Body>
        <SidePage.Footer panel>
          <Button onClick={close}>Закрыть</Button>
        </SidePage.Footer>
      </SidePage>
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
      {opened && renderSidePage()}
      <Button onClick={open}>Открыть сайдпейдж</Button>
    </div>
  );
};
ExamplePanel.storyName = 'Разделитель перед футером';

/**
 * Проп `sticky` для [SidePage.Footer]() закрепляет футер при прокрутке содержимого.
 * По умолчанию закрепление включено.
 */
export const ExampleStickyFooter: Story = () => {
  const [opened, setOpened] = React.useState(false);
  const [sticky, setSticky] = React.useState(false);

  function renderSidePage() {
    return (
      <SidePage onClose={close} blockBackground>
        <SidePage.Header sticky={sticky}>Заголовок</SidePage.Header>
        <SidePage.Body>
          <div
            style={{
              background: `#d6d6d6`,
              height: 1600,
              padding: '20px 0',
            }}
          >
            <SidePage.Container>
              <p>Контент-зона</p>
            </SidePage.Container>
          </div>
        </SidePage.Body>
        <SidePage.Footer sticky={sticky}>
          <Button onClick={close}>Закрыть</Button>
        </SidePage.Footer>
      </SidePage>
    );
  }

  function open(sticky: boolean) {
    setOpened(true);
    setSticky(sticky);
  }

  function close() {
    setOpened(false);
  }

  return (
    <div>
      {opened && renderSidePage()}
      <Gapped>
        <Button onClick={() => open(true)}>С закреплением</Button>
        <Button onClick={() => open(false)}>Без закрепления</Button>
      </Gapped>
    </div>
  );
};
ExampleStickyFooter.storyName = 'Закрепление футера';

/**
 * Проп `blockBackground` блокирует фон, когда сайдпейдж открыт: основная страница затемняется, действия на ней становятся недоступны.
 */
export const ExampleBlockBackground: Story = () => {
  const [opened, setOpened] = React.useState(false);
  const [blockBackground, setBlockBackground] = React.useState(false);

  function renderSidePage() {
    return (
      <SidePage onClose={close} blockBackground={blockBackground}>
        <SidePage.Header>Заголовок</SidePage.Header>
        <SidePage.Body>
          <div
            style={{
              background: `#d6d6d6`,
              height: 1600,
              padding: '20px 0',
            }}
          >
            <SidePage.Container>
              <p>Контент-зона</p>
            </SidePage.Container>
          </div>
        </SidePage.Body>
        <SidePage.Footer>
          <Button onClick={close}>Закрыть</Button>
        </SidePage.Footer>
      </SidePage>
    );
  }

  function open(blockBackground: boolean) {
    setOpened(true);
    setBlockBackground(blockBackground);
  }

  function close() {
    setOpened(false);
  }

  return (
    <div>
      {opened && renderSidePage()}
      <Gapped>
        <Button onClick={() => open(true)}>С блокировкой фона</Button>
        <Button onClick={() => open(false)}>Без блокировки фона</Button>
      </Gapped>
    </div>
  );
};
ExampleBlockBackground.storyName = 'Блокировка фона';

/**
 * Проп `ignoreOutsideClick` игнорирует нажатие на фон, сайдпейдж остаётся открытым.
 */
export const ExampleIgnoreOutsideClick: Story = () => {
  const [opened, setOpened] = React.useState(false);

  function renderSidePage() {
    return (
      <SidePage onClose={close} blockBackground ignoreOutsideClick>
        <SidePage.Header>Заголовок</SidePage.Header>
        <SidePage.Body>
          <div
            style={{
              background: `#d6d6d6`,
              height: 600,
              padding: '20px 0',
            }}
          >
            <SidePage.Container>
              <p>Контент-зона </p>
            </SidePage.Container>
          </div>
        </SidePage.Body>
        <SidePage.Footer>
          <Button onClick={close}>Закрыть</Button>
        </SidePage.Footer>
      </SidePage>
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
      {opened && renderSidePage()}
      <Button onClick={open}>Открыть сайдпейдж</Button>
    </div>
  );
};
ExampleIgnoreOutsideClick.storyName = 'Отключение закрытия сайдпейджа при нажатии на фон';

/**
 * Проп `disableClose` отключает событие `onClose` и блокирует кнопку закрытия сайдпейджа.
 */
export const ExampleDisableClose: Story = () => {
  const [opened, setOpened] = React.useState(false);

  function renderSidePage() {
    return (
      <SidePage onClose={close} blockBackground disableClose>
        <SidePage.Header>Заголовок</SidePage.Header>
        <SidePage.Body>
          <div
            style={{
              background: `#d6d6d6`,
              height: 600,
              padding: '20px 0',
            }}
          >
            <SidePage.Container>
              <p>Контент-зона </p>
            </SidePage.Container>
          </div>
        </SidePage.Body>
        <SidePage.Footer>
          <Button onClick={close}>Закрыть</Button>
        </SidePage.Footer>
      </SidePage>
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
      {opened && renderSidePage()}
      <Button onClick={open}>Открыть сайдпейдж</Button>
    </div>
  );
};
ExampleDisableClose.storyName = 'Блокировка крестика и отключение события onClose';

/**
 * Проп `disableAnimations` отключает анимацию открытия сайдпейджа.
 */
export const ExampleDisableAnimations: Story = () => {
  const [opened, setOpened] = React.useState(false);

  function renderSidePage() {
    return (
      <SidePage onClose={close} blockBackground disableAnimations>
        <SidePage.Header>Заголовок</SidePage.Header>
        <SidePage.Body>
          <div
            style={{
              background: `#d6d6d6`,
              height: 600,
              padding: '20px 0',
            }}
          >
            <SidePage.Container>
              <p>Контент-зона </p>
            </SidePage.Container>
          </div>
        </SidePage.Body>
        <SidePage.Footer>
          <Button onClick={close}>Закрыть</Button>
        </SidePage.Footer>
      </SidePage>
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
      {opened && renderSidePage()}
      <Button onClick={open}>Открыть сайдпейдж</Button>
    </div>
  );
};
ExampleDisableAnimations.storyName = 'Отключение анимации';

/**
 * Проп `onOutsideClick` управляет поведением при нажатии по фону.
 *
 * Например, можно перезадать поведение и не закрывать сайдпейдж при нажатии на определённый элемент на странице.
 */
export const ExampleOnOutsideClick: Story = () => {
  const [opened, setOpened] = React.useState(false);

  function renderSidePage() {
    return (
      <SidePage onClose={close} onOutsideClick={handleIgnoredElementClick}>
        <SidePage.Header>Заголовок</SidePage.Header>
        <SidePage.Body>
          <div style={{ padding: 20 }}>Контент-зона</div>
        </SidePage.Body>
        <SidePage.Footer>
          <Button onClick={close}>Закрыть</Button>
        </SidePage.Footer>
      </SidePage>
    );
  }

  function open() {
    setOpened(true);
  }

  function close() {
    setOpened(false);
  }

  function handleIgnoredElementClick(e: Event) {
    if (e.target instanceof HTMLElement) {
      const ignoredElement = e.target.closest('#bg-ignore');
      if (ignoredElement) {
        e.preventDefault();
      }
    }
  }

  return (
    <div>
      {opened && renderSidePage()}
      <Button type="submit" id="bg-ignore" onClick={open}>
        {opened ? `Нажатие на эту кнопку игнорируется` : 'Открыть сайдпейдж'}
      </Button>
    </div>
  );
};

ExampleOnOutsideClick.storyName = 'Поведение при нажатии по фону';

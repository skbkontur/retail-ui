import React from 'react';
import { SidePage, Button, Gapped } from '@skbkontur/react-ui';

import type { Meta, Story } from '../../../typings/stories.js';

const meta: Meta = {
  title: 'Overlay/SidePage/SidePage',
  component: SidePage,
  parameters: { creevey: { skip: true } },
};

export default meta;

export const Example1: Story = () => {
  const [opened, setOpened] = React.useState(false);

  function renderSidePage() {
    return (
      <SidePage onClose={close} blockBackground>
        <SidePage.Header>Title</SidePage.Header>
        <SidePage.Body>
          <div
            style={{
              background: `#d6d6d6`,
              height: 600,
              padding: '20px 0',
            }}
          >
            <SidePage.Container>
              <p>Use rxjs operators with react hooks</p>
            </SidePage.Container>
          </div>
        </SidePage.Body>
        <SidePage.Footer panel>
          <Button onClick={close}>Close</Button>
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
      <Button onClick={open}>Open</Button>
    </div>
  );
};
Example1.storyName = 'Базовый пример';

/**
 * Проп `cutTitleOnStuck` позволяет регулировать - нужно ли обрезать длинное название в шапке `<SidePage />` при прокрутке содержимого.
 */
export const Example2: Story = () => {
  const [opened, setOpened] = React.useState(false);
  const [cutTitleOnStuck, setСutTitleOnStuck] = React.useState(false);

  function renderSidePage() {
    return (
      <SidePage onClose={close} blockBackground>
        <SidePage.Header cutTitleOnStuck={cutTitleOnStuck}>
          Very very very very very very very very very very very very very very very very very very very very long title
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
              <p>SidePage Body Content</p>
            </SidePage.Container>
          </div>
        </SidePage.Body>
        <SidePage.Footer panel>
          <Button onClick={close}>Close</Button>
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
        <Button onClick={() => open(true)}>With Title Cutting</Button>
        <Button onClick={() => open(false)}>Without Title Cutting</Button>
      </Gapped>
    </div>
  );
};
Example2.storyName = 'Обрезание заголовка при залипании шапки';

/**
 * При помощи пропа `sticky` можно регулировать - будет ли залипать `<SidePage.Header />` при прокрутке содержимого.
 */
export const Example3: Story = () => {
  const [opened, setOpened] = React.useState(false);

  function renderSidePage() {
    return (
      <SidePage onClose={close} blockBackground>
        <SidePage.Header sticky={false}>Title</SidePage.Header>
        <SidePage.Body>
          <div
            style={{
              background: `#d6d6d6`,
              height: 1600,
              padding: '20px 0',
            }}
          >
            <SidePage.Container>
              <p>SidePage Body Content</p>
            </SidePage.Container>
          </div>
        </SidePage.Body>
        <SidePage.Footer panel>
          <Button onClick={close}>Close</Button>
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
      <Button onClick={open}>Open</Button>
    </div>
  );
};
Example3.storyName = 'Отключение залипания шапки';

/**
 * При помощи пропа `onOutsideClick` можно управлять поведением при клике по фону.
 *
 * Например, не закрывать при клике на определённый элемент.
 */
export const Example4: Story = () => {
  const [opened, setOpened] = React.useState(false);

  function renderSidePage() {
    return (
      <SidePage onClose={close} onOutsideClick={handleIgnoredElementClick}>
        <SidePage.Header>Голова</SidePage.Header>
        <SidePage.Body>
          <div style={{ padding: 20 }}>Туловище</div>
        </SidePage.Body>
        <SidePage.Footer>
          <Button onClick={close}>Close</Button>
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
        {opened ? `Will not close` : 'Open'}
      </Button>
    </div>
  );
};

Example4.storyName = 'Игнорирование элемента при клике по фону';

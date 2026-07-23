import { Button, Gapped, SidePage } from '@skbkontur/react-ui';
import React from 'react';

import type { Meta, Story } from '../../../typings/stories.js';
import { SidePageFooter } from '../SidePageFooter.js';

const meta: Meta = {
  title: 'Overlay/SidePage',
  component: SidePageFooter,
  parameters: { creevey: { skip: true } },
};

export default meta;

/**
 * Проп `panel` визуально отделяет футер от остальной части сайдпейджа с помощью разделителя.
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
 * Проп `sticky` закрепляет футер при прокрутке содержимого.
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

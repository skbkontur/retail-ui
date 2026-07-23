import { Button, SidePage } from '@skbkontur/react-ui';
import React from 'react';

import type { Meta, Story } from '../../../typings/stories.js';
import { SidePageContainer } from '../SidePageContainer.js';

const meta: Meta = {
  title: 'Overlay/SidePage',
  component: SidePageContainer,
  parameters: { creevey: { skip: true } },
};

export default meta;

export const ExampleContainerBasic: Story = () => {
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

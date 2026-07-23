import { Button, Gapped, SidePage, SidePageHeader } from '@skbkontur/react-ui';
import React from 'react';

import type { Meta, Story } from '../../../typings/stories.js';

const meta: Meta = {
  title: 'Overlay/SidePage',
  component: SidePageHeader,
  parameters: { creevey: { skip: true } },
};

export default meta;

/**
 * Проп `sticky` закрепляет заголовок при прокрутке содержимого.
 * По умолчанию закрепление включено.
 */
export const ExampleHeaderSticky: Story = () => {
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
ExampleHeaderSticky.storyName = 'Закрепление заголовка';

/**
 * Проп `cutTitleOnStuck` обрезает часть длинного заголовка в шапке при прокрутке содержимого, если включен проп закрепления заголовка — `sticky`.
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

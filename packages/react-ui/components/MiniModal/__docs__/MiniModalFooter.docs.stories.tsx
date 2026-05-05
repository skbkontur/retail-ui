import React from 'react';

import type { Meta, Story } from '../../../typings/stories.js';
import { Button } from '../../Button/index.js';
import { MiniModal } from '../MiniModal.js';
import { MiniModalFooter } from '../MiniModalFooter.js';
import { MiniModalHeader } from '../MiniModalHeader.js';

const meta: Meta = {
  title: 'Overlay/MiniModal/MiniModalFooter',
  component: MiniModalFooter,
  parameters: { creevey: { skip: true } },
};

export default meta;

/** Две кнопки — два прямых ребёнка: раскладка `row` (при `direction="row"`). */
export const ExampleBasic: Story = () => {
  const [opened, setOpened] = React.useState(false);
  const close = () => setOpened(false);

  return (
    <>
      {opened && (
        <MiniModal onClose={close}>
          <MiniModalHeader>Две кнопки в ряд</MiniModalHeader>
          <MiniModalFooter>
            <Button size="medium" use="accent" onClick={close}>
              Сохранить
            </Button>
            <Button size="medium" onClick={close}>
              Отменить
            </Button>
          </MiniModalFooter>
        </MiniModal>
      )}
      <Button onClick={() => setOpened(true)}>Открыть пример</Button>
    </>
  );
};
ExampleBasic.storyName = 'Базовый пример';

/** Три кнопки — принудительно column. */
export const ExampleThreeButtons: Story = () => {
  const [opened, setOpened] = React.useState(false);
  const close = () => setOpened(false);

  return (
    <>
      {opened && (
        <MiniModal onClose={close}>
          <MiniModalHeader>Три действия</MiniModalHeader>
          <MiniModalFooter>
            <Button size="medium" use="accent" onClick={close}>
              Основное
            </Button>
            <Button size="medium" onClick={close}>
              Второе
            </Button>
            <Button size="medium" onClick={close}>
              Отмена
            </Button>
          </MiniModalFooter>
        </MiniModal>
      )}
      <Button onClick={() => setOpened(true)}>Открыть пример</Button>
    </>
  );
};
ExampleThreeButtons.storyName = 'Три кнопки столбиком';

/** Две кнопки в одном Fragment — для футера один child, будет column (см. документацию MiniModal). */
export const ExampleTwoButtonsInsideFragment: Story = () => {
  const [opened, setOpened] = React.useState(false);
  const close = () => setOpened(false);

  return (
    <>
      {opened && (
        <MiniModal onClose={close}>
          <MiniModalHeader>Две кнопки во Fragment</MiniModalHeader>
          <MiniModalFooter direction="row">
            <React.Fragment>
              <Button size="medium" use="accent" onClick={close}>
                Да
              </Button>
              <Button size="medium" onClick={close}>
                Нет
              </Button>
            </React.Fragment>
          </MiniModalFooter>
        </MiniModal>
      )}
      <Button onClick={() => setOpened(true)}>Открыть пример</Button>
    </>
  );
};
ExampleTwoButtonsInsideFragment.storyName = 'Две кнопки в ряд через Fragment';

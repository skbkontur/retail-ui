import React from 'react';

import type { Meta, Story } from '../../../typings/stories.js';
import { Button } from '../../Button/index.js';
import { MiniModal } from '../MiniModal.js';
import { MiniModalHeader } from '../MiniModalHeader.js';
import { MiniModalIndent } from '../MiniModalIndent.js';

const meta: Meta = {
  title: 'Overlay/MiniModal/MiniModalIndent',
  component: MiniModalIndent,
  parameters: { creevey: { skip: true } },
};

export default meta;

export const ExampleBasic: Story = () => {
  const [opened, setOpened] = React.useState(false);
  const close = () => setOpened(false);

  return (
    <>
      {opened && (
        <MiniModal onClose={close}>
          <MiniModalHeader>Группы кнопок</MiniModalHeader>
          <MiniModal.Footer>
            <Button size="medium" use="accent" onClick={close}>
              Разрешить все
            </Button>
            <Button size="medium" onClick={close}>
              Только основные
            </Button>
            <MiniModalIndent />
            <Button size="medium" onClick={close}>
              Запретить
            </Button>
          </MiniModal.Footer>
        </MiniModal>
      )}
      <Button onClick={() => setOpened(true)}>Открыть пример</Button>
    </>
  );
};
ExampleBasic.storyName = 'Базовый пример';

export const ExampleTwoGroups: Story = () => {
  const [opened, setOpened] = React.useState(false);
  const close = () => setOpened(false);

  return (
    <>
      {opened && (
        <MiniModal onClose={close}>
          <MiniModalHeader>Продолжить?</MiniModalHeader>
          <MiniModal.Footer>
            <Button size="medium" use="accent" onClick={close}>
              Да
            </Button>
            <MiniModalIndent />
            <Button size="medium" onClick={close}>
              Нет
            </Button>
          </MiniModal.Footer>
        </MiniModal>
      )}
      <Button onClick={() => setOpened(true)}>Открыть пример</Button>
    </>
  );
};
ExampleTwoGroups.storyName = 'Две группы кнопок';

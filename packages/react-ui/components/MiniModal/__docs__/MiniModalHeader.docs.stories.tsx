import React from 'react';

import type { Meta, Story } from '../../../typings/stories.js';
import { Button } from '../../Button/index.js';
import { MiniModal } from '../MiniModal.js';
import { MiniModalHeader } from '../MiniModalHeader.js';

const meta: Meta = {
  title: 'Overlay/MiniModal/MiniModalHeader',
  component: MiniModalHeader,
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
          <MiniModalHeader>Заголовок с иконкой по умолчанию</MiniModalHeader>
          <MiniModal.Footer>
            <Button size="medium" use="accent" onClick={close}>
              Ок
            </Button>
          </MiniModal.Footer>
        </MiniModal>
      )}
      <Button onClick={() => setOpened(true)}>Открыть пример</Button>
    </>
  );
};
ExampleBasic.storyName = 'Базовый пример';

export const ExampleWithoutIcon: Story = () => {
  const [opened, setOpened] = React.useState(false);
  const close = () => setOpened(false);

  return (
    <>
      {opened && (
        <MiniModal onClose={close}>
          <MiniModalHeader icon={null}>Только текст, без иконки</MiniModalHeader>
          <MiniModal.Footer>
            <Button size="medium" use="accent" onClick={close}>
              Ок
            </Button>
          </MiniModal.Footer>
        </MiniModal>
      )}
      <Button onClick={() => setOpened(true)}>Открыть пример</Button>
    </>
  );
};
ExampleWithoutIcon.storyName = 'Только текст, без иконки';

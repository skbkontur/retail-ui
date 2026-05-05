import React from 'react';

import type { Meta, Story } from '../../../typings/stories.js';
import { Button } from '../../Button/index.js';
import { MiniModal } from '../MiniModal.js';
import { MiniModalBody } from '../MiniModalBody.js';
import { MiniModalHeader } from '../MiniModalHeader.js';

const meta: Meta = {
  title: 'Overlay/MiniModal/MiniModalBody',
  component: MiniModalBody,
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
          <MiniModalHeader>Заголовок</MiniModalHeader>
          <MiniModalBody>Краткое пояснение к действию во футере.</MiniModalBody>
          <MiniModal.Footer>
            <Button size="medium" use="accent" onClick={close}>
              Понятно
            </Button>
          </MiniModal.Footer>
        </MiniModal>
      )}
      <Button onClick={() => setOpened(true)}>Открыть пример</Button>
    </>
  );
};
ExampleBasic.storyName = 'Базовый пример';

export const ExampleLongerText: Story = () => {
  const [opened, setOpened] = React.useState(false);
  const close = () => setOpened(false);

  return (
    <>
      {opened && (
        <MiniModal onClose={close}>
          <MiniModalHeader>Обновить данные?</MiniModalHeader>
          <MiniModalBody>
            После подтверждения список будет перезапрошен с сервера. Несохранённые изменения на странице не затронуты,
            но текущая позиция прокрутки может сброситься.
          </MiniModalBody>
          <MiniModal.Footer>
            <Button size="medium" use="accent" onClick={close}>
              Обновить
            </Button>
            <Button size="medium" onClick={close}>
              Отмена
            </Button>
          </MiniModal.Footer>
        </MiniModal>
      )}
      <Button onClick={() => setOpened(true)}>Открыть пример</Button>
    </>
  );
};
ExampleLongerText.storyName = 'Длинный текст в теле модалки';

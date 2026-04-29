import { Button, Gapped, SingleToast } from '@skbkontur/react-ui';
import React from 'react';

import type { Meta, Story } from '../../../typings/stories.js';

const meta: Meta = {
  title: 'Overlay/SingleToast',
  component: SingleToast,
  parameters: { creevey: { skip: true } },
};

export default meta;

export const BasicExample: Story = () => (
  <>
    <SingleToast />
    <Button onClick={() => SingleToast.push('Текст тоста')}>Показать тост</Button>
  </>
);
BasicExample.storyName = 'Базовый пример';

/**
 * Поле `showTime` из второго аргумента метода `push` задаёт длительность показа тоста в миллисекундах.
 */
export const PushShowTimeExample: Story = () => (
  <Button onClick={() => SingleToast.push('Текст', { showTime: 15_000 })}>Показать 15 с</Button>
);
PushShowTimeExample.storyName = 'Длительность показа тоста';

/**
 * Поле `use` из второго аргумента метода `push` задаёт стиль оформления тоста: он будет выглядеть как предупреждение, а не как обычное нейтральное сообщение.
 */
export const PushWithUseErrorExample: Story = () => (
  <Button onClick={() => SingleToast.push('Ошибка', { use: 'error' })}>Показать ошибку</Button>
);
PushWithUseErrorExample.storyName = 'Тост в состоянии ошибки';

/**
 * Поле `showCloseIcon` из второго аргумента метода `push` добавляет крестик закрытия рядом с текстом.
 */
export const PushWithCloseIconExample: Story = () => (
  <Button onClick={() => SingleToast.push('Текст', { showCloseIcon: true })}>Показать с крестиком</Button>
);
PushWithCloseIconExample.storyName = 'Иконка закрытия рядом с текстом';

/**
 * Поле `action` из второго аргумента метода `push` добавляет кнопку с вашим `label` и `handler`;
 *
 * При необходимости поле `aria-label` задаёт понятную подпись для скринридеров, если короткий текст на кнопке недостаточен.
 */
export const PushWithActionExample: Story = () => (
  <Gapped vertical>
    <Gapped>
      <Button
        onClick={() =>
          SingleToast.push('Текст', {
            action: { label: 'Отмена', handler: () => SingleToast.close() },
          })
        }
      >
        С action
      </Button>
      <Button
        onClick={() =>
          SingleToast.push('Текст', {
            action: {
              label: 'Ок',
              handler: () => SingleToast.close(),
              'aria-label': 'Закрыть уведомление',
            },
          })
        }
      >
        С action и aria-label
      </Button>
    </Gapped>
  </Gapped>
);
PushWithActionExample.storyName = 'Кнопка действия в тосте';

/**
 * Метод `push` принимает как строку, так и `ReactNode`.
 */
export const PushWithReactNodeExample: Story = () => (
  <Button onClick={() => SingleToast.push(<span style={{ color: 'red' }}>Произвольная разметка</span>)}>
    Показать ReactNode
  </Button>
);
PushWithReactNodeExample.storyName = 'Произвольная разметка в тосте';

/**
 * Метод `close` сразу убирает тост с экрана — вызывайте его, когда тост нужно снять из кода, минуя таймер, крестик или кнопку действия.
 */
export const CloseMethodExample: Story = () => (
  <Gapped>
    <Button onClick={() => SingleToast.push('Текст')}>Показать тост</Button>
    <Button onClick={() => SingleToast.close()}>close()</Button>
  </Gapped>
);
CloseMethodExample.storyName = 'Ручное управление закрытием тоста';

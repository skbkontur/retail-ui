import { Button, Gapped, Toast } from '@skbkontur/react-ui';
import React from 'react';

import type { Meta, Story } from '../../../typings/stories.js';

const meta: Meta = {
  title: 'Overlay/Toast',
  component: Toast,
  parameters: { creevey: { skip: true } },
};

export default meta;

export const BasicExample: Story = () => {
  const toastRef = React.useRef<Toast>(null);

  return (
    <>
      <Toast ref={toastRef} />
      <Button onClick={() => toastRef.current?.push('Текст тоста')}>Показать тост</Button>
    </>
  );
};
BasicExample.storyName = 'Базовый пример';

/**
 * Поле `showTime` из второго аргумента метода`push` задаёт длительность показа тоста в миллисекундах.
 */
export const PushShowTimeExample: Story = () => {
  const toastRef = React.useRef<Toast>(null);

  return (
    <>
      <Toast ref={toastRef} />
      <Button onClick={() => toastRef.current?.push('Текст', { showTime: 15_000 })}>Показать 15 с</Button>
    </>
  );
};
PushShowTimeExample.storyName = 'Длительность показа тоста';

/**
 * Поле `use` из второго аргумента метода `push` задаёт стиль оформления тоста: он будет выглядеть как предупреждение, а не как обычное нейтральное сообщение.
 */
export const PushWithUseErrorExample: Story = () => {
  const toastRef = React.useRef<Toast>(null);

  return (
    <>
      <Toast ref={toastRef} />
      <Button onClick={() => toastRef.current?.push('Ошибка', { use: 'error' })}>Показать ошибку</Button>
    </>
  );
};
PushWithUseErrorExample.storyName = 'Тост в состоянии ошибки';

/**
 * Поле `showCloseIcon` из второго аргумента метода`push` добавляет крестик закрытия рядом с текстом.
 */
export const PushWithCloseIconExample: Story = () => {
  const toastRef = React.useRef<Toast>(null);

  return (
    <>
      <Toast ref={toastRef} />
      <Button onClick={() => toastRef.current?.push('Текст', { showCloseIcon: true })}>Показать с крестиком</Button>
    </>
  );
};
PushWithCloseIconExample.storyName = 'Иконка закрытия рядом с текстом';

/**
 * Поле `action` из второго аргумента метода`push` добавляет кнопку с вашим `label` и `handler`;
 *
 * При необходимости поле `aria-label` задаёт понятную подпись для скринридеров, если короткий текст на кнопке недостаточен.
 */
export const PushWithActionExample: Story = () => {
  const toastRef = React.useRef<Toast>(null);

  return (
    <Gapped vertical>
      <Toast ref={toastRef} />
      <Gapped>
        <Button
          onClick={() =>
            toastRef.current?.push('Текст', {
              action: { label: 'Отмена', handler: () => toastRef.current?.close() },
            })
          }
        >
          С action
        </Button>
        <Button
          onClick={() =>
            toastRef.current?.push('Текст', {
              action: {
                label: 'Ок',
                handler: () => toastRef.current?.close(),
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
};
PushWithActionExample.storyName = 'Кнопка действия в тосте';

/**
 * Метод `push` принимает как строку, так и `ReactNode`.
 */
export const PushWithReactNodeExample: Story = () => {
  const toastRef = React.useRef<Toast>(null);

  return (
    <>
      <Toast ref={toastRef} />
      <Button onClick={() => toastRef.current?.push(<span style={{ color: 'red' }}>Произвольная разметка</span>)}>
        Показать ReactNode
      </Button>
    </>
  );
};
PushWithReactNodeExample.storyName = 'Произвольная разметка в тосте';

/**
 * Метод `close` сразу убирает тост с экрана — вызывайте его, когда тост нужно снять из кода, минуя таймер, крестик или кнопку действия.
 */
export const CloseMethodExample: Story = () => {
  const toastRef = React.useRef<Toast>(null);

  return (
    <Gapped>
      <Toast ref={toastRef} />
      <Button onClick={() => toastRef.current?.push('Текст')}>Показать тост</Button>
      <Button onClick={() => toastRef.current?.close()}>close()</Button>
    </Gapped>
  );
};
CloseMethodExample.storyName = 'Ручное управление закрытием тоста';

/**
 * Проп `onPush` вызывается сразу после каждого `push`: можно залогировать показ, обновить своё состояние или запомнить последнее уведомление.
 */
export const OnPushExample: Story = () => {
  const toastRef = React.useRef<Toast>(null);
  const [last, setLast] = React.useState('—');

  return (
    <Gapped vertical>
      <Toast
        ref={toastRef}
        onPush={(notification) => setLast(typeof notification === 'string' ? notification : 'ReactNode')}
      />
      <div>onPush: {last}</div>
      <Button onClick={() => toastRef.current?.push('Текст')}>Показать тост</Button>
    </Gapped>
  );
};
OnPushExample.storyName = 'Реакция на показ тоста';

/**
 * Проп `onClose` срабатывает при любом закрытии — по таймеру, по крестику, по кнопке действия или после вызова `close`.
 */
export const OnCloseExample: Story = () => {
  const toastRef = React.useRef<Toast>(null);
  const [last, setLast] = React.useState('—');

  return (
    <Gapped vertical>
      <Toast ref={toastRef} onClose={() => setLast(String(Date.now()))} />
      <div>onClose (метка): {last}</div>
      <Button onClick={() => toastRef.current?.push('Текст')}>Показать тост</Button>
    </Gapped>
  );
};
OnCloseExample.storyName = 'Реакция на закрытие тоста';

/**
 * Проп `ref` даёт ссылку на экземпляр `Toast`: из класса с `createRef` так же вызываются методы `push` и `close`, как из функции с `useRef`.
 */
export const RefExample: Story = () => {
  class Toaster extends React.Component {
    private notifier = React.createRef<Toast>();

    showNotification() {
      this.notifier.current?.push('Текст');
    }

    render() {
      return (
        <div>
          <Toast ref={this.notifier} />
          <Button onClick={() => this.showNotification()}>Показать тост</Button>
        </div>
      );
    }
  }

  return <Toaster />;
};
RefExample.storyName = 'Вызов тоста из классового компонента';

/**
 * Проп `theme` подмешивает свои переменные к теме из контекста — например, другой фон и цвет текста именно у этого тоста.
 */
export const CustomizationThemeExample: Story = () => {
  const toastRef = React.useRef<Toast>(null);

  return (
    <>
      <Toast ref={toastRef} theme={{ toastBg: '#00BEA2', toastColor: '#ffffff' }} />
      <Button onClick={() => toastRef.current?.push('Текст')}>Показать тост</Button>
    </>
  );
};
CustomizationThemeExample.storyName = 'Кастомизация: переменные темы';

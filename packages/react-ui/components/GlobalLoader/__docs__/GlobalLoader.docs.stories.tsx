import { Button, Gapped, GlobalLoader, Modal, ThemeContext, ThemeFactory, Toggle } from '@skbkontur/react-ui';
import React from 'react';

import type { Meta, Story } from '../../../typings/stories.js';

const meta: Meta = {
  title: 'Display data/GlobalLoader',
  component: GlobalLoader,
  parameters: { creevey: { skip: true } },
};

export default meta;

export const ExampleBasic: Story = () => {
  return (
    <Gapped>
      <Button onClick={() => GlobalLoader.start()} use="primary">
        Запустить лоадер
      </Button>
      <Button onClick={() => GlobalLoader.done()}>Завершить</Button>
    </Gapped>
  );
};
ExampleBasic.storyName = 'Базовый пример';

/** У компонента есть набор статических методов: `GlobalLoader.start()`, `GlobalLoader.done()`, `GlobalLoader.reject()`, `GlobalLoader.accept()`.
 * Запустить лоадер `"start"` — активирует анимацию загрузки.
 * Завершить `"done"` — переведёт глобальный лоадер в успешное завершённое состояние.
 * Эмулировать проблему `"reject"` — переведёт глобальный лоадер в состояние с ошибкой.
 * Вернуться в состояние загрузки `"accept"` — запустит глобальный лоадер с момента остановки при ошибке.
 */
export const ExampleStaticMethods: Story = () => {
  return (
    <Gapped>
      <Button onClick={() => GlobalLoader.start()} use="primary">
        Запустить лоадер
      </Button>
      <Button onClick={() => GlobalLoader.done()}>Завершить</Button>
      <Button onClick={() => GlobalLoader.reject()}>Эмулировать проблему</Button>
      <Button onClick={() => GlobalLoader.accept()}>Вернуться в состояние загрузки</Button>
    </Gapped>
  );
};
ExampleStaticMethods.storyName = 'Cтатические методы';

/** Вместо статических методов можно воспользоваться управлением через пропсы. */
export const ExampleMount: Story = () => {
  const [manually, setManually] = React.useState<boolean>(false);
  const [active, setActive] = React.useState<boolean>(false);
  const [error, setError] = React.useState<boolean>(false);

  const reset = () => {
    if (manually) {
      setManually(false);
      setError(false);
      setActive(false);
    } else {
      setManually(true);
    }
  };

  return (
    <Gapped vertical>
      <Toggle checked={manually} onValueChange={reset}>
        Активировать управление пропсами
      </Toggle>
      <Toggle checked={active} onValueChange={setActive} disabled={!manually}>
        Запустить лоадер
      </Toggle>
      <Toggle checked={error} onValueChange={setError} disabled={!manually}>
        Эмулировать ошибку
      </Toggle>

      {manually && (
        <GlobalLoader
          active={active}
          rejected={error}
          onStart={() => console.log('start')}
          onDone={() => console.log('done')}
          onReject={() => console.log('reject')}
          onAccept={() => console.log('accept')}
        />
      )}
    </Gapped>
  );
};
ExampleMount.storyName = 'Монтирование';

/** Глобальный лоадер можно запустить в модальном окне. Тогда он перекроет вуаль. */
export const ExampleInModal: Story = () => {
  const [opened, setOpened] = React.useState<boolean>(false);

  function renderModal() {
    return (
      <Modal onClose={close}>
        <Modal.Header>Заголовок</Modal.Header>
        <Modal.Body>
          <Gapped>
            <Button onClick={() => GlobalLoader.start()} use="primary">
              Запустить лоадер
            </Button>
            <Button onClick={() => GlobalLoader.done()}>Завершить</Button>
          </Gapped>
        </Modal.Body>
      </Modal>
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
      {opened && renderModal()}
      <Button onClick={open}>Открыть модальное окно</Button>
    </div>
  );
};
ExampleInModal.storyName = 'Статические методы в модальном окне';

/** Через переменные темы можно изменять параметры глобального лоадера. Например, цвет индикатора загрузки. */
export const ExampleCustomizeColor: Story = () => {
  const [enableTheme, setEnableTheme] = React.useState<boolean>(false);
  const [active, setActive] = React.useState<boolean>(false);

  const globalLoaderCustomTheme = ThemeFactory.create(
    enableTheme
      ? {
          globalLoaderColor: 'cyan',
        }
      : {},
  );

  return (
    <Gapped vertical gap={16}>
      <Toggle checked={enableTheme} onValueChange={setEnableTheme}>
        Изменить цвет индикатора загрузки на 'cyan'
      </Toggle>
      <Gapped>
        <Button onClick={() => setActive(true)} use="primary">
          Запустить лоадер
        </Button>
        <Button onClick={() => setActive(false)}>Завершить</Button>
      </Gapped>
      <ThemeContext.Provider value={globalLoaderCustomTheme}>
        <GlobalLoader active={active} />
      </ThemeContext.Provider>
    </Gapped>
  );
};
ExampleCustomizeColor.storyName = 'Кастомизация: изменение цвета индикатора загрузки';

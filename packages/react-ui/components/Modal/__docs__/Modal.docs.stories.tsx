import React from 'react';
import type { MobileModalAppearance } from '@skbkontur/react-ui';
import {
  Modal,
  Button,
  Toggle,
  Gapped,
  Checkbox,
  ResponsiveLayout,
  RadioGroup,
  ThemeContext,
  ThemeFactory,
} from '@skbkontur/react-ui';

import type { Story } from '../../../typings/stories';

export default {
  title: 'Overlay/Modal/Modal',
  component: Modal,
  parameters: { creevey: { skip: true } },
};

export const Example1: Story = () => {
  const [opened, setOpened] = React.useState(false);
  const [panel, setPanel] = React.useState(false);

  function renderModal() {
    return (
      <Modal onClose={close}>
        <Modal.Header>Title</Modal.Header>
        <Modal.Body>
          <p>Use rxjs operators with react hooks</p>

          <div>
            <Toggle checked={panel} onValueChange={setPanel} /> Panel {panel ? 'enabled' : 'disabled'}
          </div>
        </Modal.Body>
        <Modal.Footer panel={panel}>
          <Button onClick={close}>Close</Button>
        </Modal.Footer>
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
      <Button onClick={open}>Открыть</Button>
    </div>
  );
};
Example1.storyName = 'Базовый пример';

/** `alignTop` —  выравнивание модалки в верхней части страницы */
export const Example2: Story = () => {
  const [opened, setOpened] = React.useState(false);
  const [panel, setPanel] = React.useState(false);

  function renderModal() {
    return (
      <Modal alignTop onClose={close}>
        <Modal.Header>Title</Modal.Header>
        <Modal.Body>
          <p>Use rxjs operators with react hooks</p>

          <div>
            <Toggle checked={panel} onValueChange={setPanel} /> Panel {panel ? 'enabled' : 'disabled'}
          </div>
        </Modal.Body>
        <Modal.Footer panel={panel}>
          <Button onClick={close}>Открыть наверху</Button>
        </Modal.Footer>
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
      <Button onClick={open}>Открыть наверху</Button>
    </div>
  );
};
Example2.storyName = 'Модалка наверху страницы';

/** По умолчанию мобильная версия доступна на экранах меньше 576 px по ширине */
export const Example3: Story = () => {
  const [opened, setOpened] = React.useState(false);
  const [position, setPosition] = React.useState<MobileModalAppearance | undefined>('auto');
  const [hasHeader, setHasHeader] = React.useState(false);
  const [stickyHeader, setStickyHeader] = React.useState(false);
  const header = <Modal.Header sticky={stickyHeader}>Title</Modal.Header>;
  const [hasFooter, setHasFooter] = React.useState(false);
  const [stickyFooter, setStickyFooter] = React.useState(false);
  const [showSecondButton, setShowSecondButton] = React.useState(false);
  const footer = (
    <ResponsiveLayout>
      {({ isMobile }) => {
        return (
          <Modal.Footer sticky={stickyFooter}>
            <Button
              style={isMobile ? { width: '100%' } : undefined}
              onClick={() => setShowSecondButton(!showSecondButton)}
            >
              show/hide second button
            </Button>
            {showSecondButton && <Button style={isMobile ? { width: '100%' } : undefined}>i'm second button</Button>}
          </Modal.Footer>
        );
      }}
    </ResponsiveLayout>
  );

  const [isLongContent, setIsLongContent] = React.useState(false);
  const body = isLongContent ? (
    <Modal.Body>
      <div>
        * Навигация – используйте верхнее меню для быстрого перехода к основным разделам.
        <br />
        * Фильтрация и поиск – применяйте фильтры и строку поиска, чтобы быстрее находить нужные данные. <br />
        * Настройки – персонализируйте интерфейс под свои нужды, изменяя темы, уведомления и другие параметры. <br />
        ❓ Часто задаваемые вопросы: <br />
        🔹 Как сохранить изменения? – После внесения правок нажмите кнопку «Сохранить». Все данные обновятся
        автоматически. <br />
        🔹 Можно ли отменить действие? – Да! Используйте кнопку «Отмена» или сочетание клавиш Ctrl + Z (для ПК). <br />
        🔗 Дополнительные ресурсы: Если у вас возникли вопросы или сложности, вы можете: <br />
        * Ознакомиться с подробной документацией (доступна в разделе «Помощь»). <br />
        * Обратиться в техническую поддержку через чат или по email. <br />* Посетить форум сообщества, где пользователи
        делятся советами и решениями. Спасибо, что пользуетесь нашим сервисом! 🚀
        <div style={{ height: '700px', backgroundColor: 'aquamarine' }}></div>
      </div>
    </Modal.Body>
  ) : (
    <Modal.Body>
      Текст сообщения в лайтбоксе, достаточно длинный, чтобы занять несколько строк. Если в лайтбоксе только это
      сообщение и нет других контролов, то лайтбокс не нуждается в терминальной плашке и может даже не содержать кнопок.
    </Modal.Body>
  );

  function renderModal() {
    return (
      <ThemeContext.Provider
        value={ThemeFactory.create({
          mobileMediaQuery: '(max-width: 576px)',
        })}
      >
        <Modal mobileAppearance={position} onClose={() => setOpened(false)}>
          {hasHeader && header}
          {body}
          {hasFooter && footer}
        </Modal>
      </ThemeContext.Provider>
    );
  }
  return (
    <Gapped gap={16} vertical>
      {opened && renderModal()}
      <div>
        <b>Отображение mobileAppearance</b>
        <br />
        <br />
        <RadioGroup
          items={['auto', 'top', 'center', 'bottom', 'fullscreen-spacing', 'fullscreen']}
          onValueChange={setPosition}
        />
      </div>
      <div>
        <b>Настройки</b>
        <br />
        <br />
        <Gapped vertical gap={0}>
          <Checkbox checked={hasHeader} onValueChange={setHasHeader} children={'Шапка'} />
          <Checkbox checked={hasFooter} onValueChange={setHasFooter} children={'Подвал'} />
          <Checkbox checked={stickyHeader} onValueChange={setStickyHeader} children={'Залипаюшая шапка'} />
          <Checkbox checked={stickyFooter} onValueChange={setStickyFooter} children={'Залипающий подвал'} />
          <Checkbox
            checked={isLongContent}
            onValueChange={setIsLongContent}
            children={'Длинный текст для появления скролла'}
          />
        </Gapped>
      </div>
      <Button onClick={() => setOpened(true)}>Открыть</Button>
    </Gapped>
  );
};
Example3.storyName = 'Мобильная версия модалки';

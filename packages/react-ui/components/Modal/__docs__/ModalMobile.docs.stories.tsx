import React from 'react';
import {
  Modal,
  Button,
  ResponsiveLayout,
  ThemeContext,
  RadioGroup,
  Checkbox,
  Gapped,
  ThemeFactory,
} from '@skbkontur/react-ui';
import type { MobileModalAppearance } from '@skbkontur/react-ui';

import type { Meta, Story } from '../../../typings/stories';

export default {
  title: 'Overlay/Modal',
  component: Modal,
  parameters: { creevey: { skip: true } },
} as Meta;

export const ExampleMobile: Story = () => {
  const [opened, setOpened] = React.useState(false);
  const [position, setPosition] = React.useState<MobileModalAppearance | undefined>('auto');
  const [hasHeader, setHasHeader] = React.useState(false);
  const [stickyHeader, setStickyHeader] = React.useState(false);
  const header = <Modal.Header sticky={stickyHeader}>Заголовок</Modal.Header>;
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
              Показать/скрыть вторую кнопку
            </Button>
            {showSecondButton && <Button style={isMobile ? { width: '100%' } : undefined}>Вторая кнопка</Button>}
          </Modal.Footer>
        );
      }}
    </ResponsiveLayout>
  );

  const [isLongContent, setIsLongContent] = React.useState(false);
  const body = isLongContent ? (
    <Modal.Body>
      <div
        style={{
          width: 300,
          height: 1700,
          backgroundColor: '#eee',
          background: 'repeating-linear-gradient(-45deg, #ccc, #ccc 25px, #eee 25px, #eee 225px)',
        }}
      />
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
          <Checkbox checked={hasHeader} onValueChange={setHasHeader} children={'Заголовок'} />
          <Checkbox checked={hasFooter} onValueChange={setHasFooter} children={'Футер'} />
          <Checkbox checked={stickyHeader} onValueChange={setStickyHeader} children={'Закреплённый заголовок'} />
          <Checkbox checked={stickyFooter} onValueChange={setStickyFooter} children={'Закреплённый футер'} />
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

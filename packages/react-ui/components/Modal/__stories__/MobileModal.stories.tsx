import React, { useState } from 'react';

import type { Story } from '../../../typings/stories.js';
import type { MobileModalAppearance } from '../Modal.js';
import { Modal } from '../Modal.js';
import { Button } from '../../Button/index.js';
import { ResponsiveLayout } from '../../ResponsiveLayout/index.js';
import { Checkbox } from '../../Checkbox/index.js';
import { MiniModal } from '../../MiniModal/index.js';
import { RadioGroup } from '../../RadioGroup/index.js';
import { Gapped } from '../../Gapped/index.js';

interface SuperModalProps {
  isOpened?: boolean;
  isMini?: boolean;
  appearance?: MobileModalAppearance | undefined;
  hasHeader?: boolean;
  stickyHeader?: boolean;
  hasFooter?: boolean;
  stickyFooter?: boolean;
  isLongContent?: boolean;
  hasPanel?: boolean;
}

interface ModalWithVariableHeightState {
  isOpened: boolean;
}
class MobileModalWithSettings extends React.Component<SuperModalProps> {
  public state: ModalWithVariableHeightState = {
    isOpened: !!this.props.isOpened,
  };

  public render() {
    const { isMini, appearance, hasHeader, stickyHeader, hasFooter, stickyFooter, isLongContent, hasPanel } =
      this.props;
    const header = <Modal.Header sticky={stickyHeader}>Title</Modal.Header>;
    const footer = (
      <ResponsiveLayout>
        {({ isMobile }) => {
          return (
            <Modal.Footer panel={hasPanel} sticky={stickyFooter}>
              <Button style={isMobile ? { width: '100%' } : undefined}>i'm first button</Button>
              <Button style={isMobile ? { width: '100%' } : undefined}>i'm second button</Button>
            </Modal.Footer>
          );
        }}
      </ResponsiveLayout>
    );

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
          🔹 Можно ли отменить действие? – Да! Используйте кнопку «Отмена» или сочетание клавиш Ctrl + Z (для ПК).{' '}
          <br />
          🔗 Дополнительные ресурсы: Если у вас возникли вопросы или сложности, вы можете: <br />
          * Ознакомиться с подробной документацией (доступна в разделе «Помощь»). <br />
          * Обратиться в техническую поддержку через чат или по email. <br />* Посетить форум сообщества, где
          пользователи делятся советами и решениями. Спасибо, что пользуетесь нашим сервисом! 🚀
          <div style={{ height: '700px', backgroundColor: 'aquamarine' }}></div>
        </div>
      </Modal.Body>
    ) : (
      <Modal.Body>
        Текст сообщения в лайтбоксе, достаточно длинный, чтобы занять несколько строк. Если в лайтбоксе только это
        сообщение и нет других контролов, то лайтбокс не нуждается в терминальной плашке и может даже не содержать
        кнопок.
      </Modal.Body>
    );

    return (
      <>
        {this.state.isOpened && !isMini && (
          <Modal mobileAppearance={appearance} onClose={() => this.setState({ isOpened: false })}>
            {hasHeader && header}
            {body}
            {hasFooter && footer}
          </Modal>
        )}
        {this.state.isOpened && isMini && (
          <MiniModal mobileAppearance={appearance} onClose={() => this.setState({ opened: false })}>
            {hasHeader && header}
            {body}
            {hasFooter && footer}
          </MiniModal>
        )}

        <Button data-tid="open-modal" onClick={() => this.setState({ isOpened: true })}>
          Открыть модалку
        </Button>
      </>
    );
  }
}

export default {
  title: 'Modal/Mobile',
  component: Modal,
  parameters: {
    viewport: { defaultViewport: 'iphone' },
    creevey: { skip: { 'only mobile': { in: /^(?!\b(chromeMobile)\b)/ } }, captureElement: null },
  },
};

export const MobileModalPlayground: Story = () => {
  const [opened, setOpened] = React.useState(false);
  const [position, setPosition] = useState<MobileModalAppearance | undefined>(undefined);

  const [hasHeader, setHasHeader] = React.useState(false);
  const [stickyHeader, setStickyHeader] = React.useState(false);

  const [hasFooter, setHasFooter] = React.useState(false);
  const [stickyFooter, setStickyFooter] = React.useState(false);

  const [isLongContent, setIsLongContent] = React.useState(false);

  return (
    <Gapped gap={16} vertical>
      {opened && (
        <MobileModalWithSettings
          appearance={position}
          hasHeader={hasHeader}
          stickyHeader={stickyHeader}
          hasFooter={hasFooter}
          stickyFooter={stickyFooter}
          isLongContent={isLongContent}
        />
      )}
      <div>
        <b>Отображение mobileAppearance</b>
        <br />
        <br />
        <RadioGroup
          defaultValue={position}
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
MobileModalPlayground.parameters = { creevey: { skip: true } };

export const MobileModalDefaultWithBodyOnly: Story = () => {
  return <MobileModalWithSettings isOpened />;
};
export const MobileModalDefaultWithHeader: Story = () => {
  return <MobileModalWithSettings hasHeader isOpened />;
};
export const MobileModalDefaultWithFooter: Story = () => {
  return <MobileModalWithSettings hasFooter isOpened />;
};
export const MobileModalDefaultWithHeaderAndFooterWithLongContent: Story = () => {
  return <MobileModalWithSettings hasHeader hasFooter isLongContent isOpened />;
};
export const MobileModalDefaultWithStickyHeaderAndStickyFooterWithLongContent: Story = () => {
  return <MobileModalWithSettings hasHeader stickyHeader hasFooter stickyFooter isLongContent isOpened />;
};

export const MobileModalAutoWithHeader: Story = () => {
  return <MobileModalWithSettings appearance={'auto'} hasHeader isOpened />;
};
export const MobileModalAutoWithFooter: Story = () => {
  return <MobileModalWithSettings appearance={'auto'} hasFooter isOpened />;
};

export const MobileModalTopWithBodyOnly: Story = () => {
  return <MobileModalWithSettings appearance={'top'} isOpened />;
};
export const MobileModalBottomWithHeader: Story = () => {
  return <MobileModalWithSettings appearance={'bottom'} hasHeader isOpened />;
};
export const MobileModalCenterWithFooter: Story = () => {
  return <MobileModalWithSettings appearance={'center'} hasFooter isOpened />;
};
export const MobileModalTopWithLongContent: Story = () => {
  return <MobileModalWithSettings appearance={'center'} isLongContent isOpened />;
};

export const MobileModalFullscreenSpacingWithBodyOnly: Story = () => {
  return <MobileModalWithSettings appearance={'fullscreen-spacing'} isOpened />;
};

export const MobileModalFullscreenWithBodyOnly: Story = () => {
  return <MobileModalWithSettings appearance={'fullscreen'} isOpened />;
};
export const MobileModalFullscreenWithHeaderAndFooter: Story = () => {
  return <MobileModalWithSettings appearance={'fullscreen'} hasHeader hasFooter isOpened />;
};
export const MobileModalFullscreenWithStickyHeaderAndStickyFooterWithLongContent: Story = () => {
  return (
    <MobileModalWithSettings
      appearance={'fullscreen'}
      hasHeader
      stickyHeader
      hasFooter
      stickyFooter
      isLongContent
      isOpened
    />
  );
};

export const MobileModalAppearanceBug: Story = () => {
  return <MobileModalWithSettings appearance="fullscreen" isOpened isLongContent hasFooter hasPanel />;
};

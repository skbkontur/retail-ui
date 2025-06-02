// TODO: Rewrite stories and enable rule (in process of functional refactoring).
/* eslint-disable react/no-unstable-nested-components */
import type { ReactNode } from 'react';
import React, { useState, useContext } from 'react';
import { MediaUiAStopIcon16Regular } from '@skbkontur/icons/icons/MediaUiAStopIcon/MediaUiAStopIcon16Regular';

import { ThemeFactory } from '../../../lib/theming/ThemeFactory';
import type { Story } from '../../../typings/stories';
import { Modal } from '../Modal';
import { Button } from '../../Button';
import { Input } from '../../Input';
import { Toggle } from '../../Toggle';
import { ThemeContext } from '../../../lib/theming/ThemeContext';
import { ResponsiveLayout } from '../../ResponsiveLayout';

const basicFontStyle = {
  fontSize: '14px',
  lineHeight: '20px',
  margin: '0',
};

interface ModalWithScrollableContentState {
  opened: boolean;
  panel: boolean;
}
class ModalWithScrollableContent extends React.Component {
  public state: ModalWithScrollableContentState = {
    opened: false,
    panel: false,
  };

  public render() {
    return (
      <div style={{ width: '300px' }}>
        {this.state.opened && this.renderModal()}
        <Button onClick={this.open}>Open modal</Button>
        <p style={{ marginBottom: '100px' }}>
          On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized
          by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble
          that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will,
          which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to
          distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able
          to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances
          and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to
          be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle
          of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse
          pains.
        </p>
        <p>
          On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized
          by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble
          that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will,
          which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to
          distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able
          to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances
          and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to
          be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle
          of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse
          pains.
        </p>
      </div>
    );
  }

  public renderModal() {
    return (
      <Modal onClose={this.close}>
        <Modal.Header>Title</Modal.Header>
        <Modal.Body>
          <p>Use rxjs operators with react hooks</p>

          <div>
            <Toggle
              checked={this.state.panel}
              onValueChange={() => this.setState(({ panel }: ModalWithScrollableContentState) => ({ panel: !panel }))}
            />{' '}
            Panel {this.state.panel ? 'enabled' : 'disabled'}
          </div>
        </Modal.Body>
        <Modal.Footer panel={this.state.panel}>
          <Button onClick={this.close}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  public open = () => {
    this.setState({ opened: true });
  };

  public close = () => {
    this.setState({ opened: false });
  };
}

interface ModalWithIconInputState {
  opened: boolean;
}
class ModalWithIconInput extends React.Component {
  public state: ModalWithIconInputState = {
    opened: false,
  };

  public renderModal() {
    return (
      <Modal onClose={this.close}>
        <Modal.Header>
          <Input
            size="large"
            placeholder="Modal.Header"
            leftIcon={<MediaUiAStopIcon16Regular />}
            rightIcon={<MediaUiAStopIcon16Regular />}
          />
          <Input
            size="medium"
            placeholder="Modal.Header"
            leftIcon={<MediaUiAStopIcon16Regular />}
            rightIcon={<MediaUiAStopIcon16Regular />}
          />
          <Input
            size="small"
            placeholder="Modal.Header"
            leftIcon={<MediaUiAStopIcon16Regular />}
            rightIcon={<MediaUiAStopIcon16Regular />}
          />
        </Modal.Header>
        <Modal.Body>
          <Input
            size="large"
            placeholder="Modal.Body"
            leftIcon={<MediaUiAStopIcon16Regular />}
            rightIcon={<MediaUiAStopIcon16Regular />}
          />
          <Input
            size="medium"
            placeholder="Modal.Body"
            leftIcon={<MediaUiAStopIcon16Regular />}
            rightIcon={<MediaUiAStopIcon16Regular />}
          />
          <Input
            size="small"
            placeholder="Modal.Body"
            leftIcon={<MediaUiAStopIcon16Regular />}
            rightIcon={<MediaUiAStopIcon16Regular />}
          />
        </Modal.Body>
        <Modal.Footer>
          <Input
            size="large"
            placeholder="Modal.Footer"
            leftIcon={<MediaUiAStopIcon16Regular />}
            rightIcon={<MediaUiAStopIcon16Regular />}
          />
          <Input
            size="medium"
            placeholder="Modal.Footer"
            leftIcon={<MediaUiAStopIcon16Regular />}
            rightIcon={<MediaUiAStopIcon16Regular />}
          />
          <Input
            size="small"
            placeholder="Modal.Footer"
            leftIcon={<MediaUiAStopIcon16Regular />}
            rightIcon={<MediaUiAStopIcon16Regular />}
          />
        </Modal.Footer>
      </Modal>
    );
  }

  public render() {
    return (
      <div style={{ width: '300px' }}>
        {this.state.opened && this.renderModal()}
        <Button onClick={this.open} data-tid="open-modal">
          Open modal
        </Button>
      </div>
    );
  }

  public open = () => {
    this.setState({ opened: true });
  };

  public close = () => {
    this.setState({ opened: false });
  };
}

class ModalOverAnotherModal extends React.Component {
  public state = {
    firstModalOpened: false,
    secondModalOpened: false,
  };

  public renderModal(name: string, width: number) {
    return (
      <Modal width={width} onClose={this.close.bind(this, name)}>
        <Modal.Header>Модалка #{name === 'firstModalOpened' ? '1' : '2'}</Modal.Header>
        <Modal.Body>
          {name === 'firstModalOpened' && (
            <Button onClick={() => this.setState({ secondModalOpened: true })} data-tid="open-second-modal">
              Open second modal
            </Button>
          )}
        </Modal.Body>
      </Modal>
    );
  }

  public render() {
    const { firstModalOpened, secondModalOpened } = this.state;

    return (
      <div>
        {firstModalOpened && this.renderModal('firstModalOpened', 500)}
        {secondModalOpened && this.renderModal('secondModalOpened', 300)}
        <Button onClick={() => this.setState({ firstModalOpened: true })} data-tid="open-first-modal">
          Open first modal
        </Button>
      </div>
    );
  }

  public close(name: string) {
    this.setState({ [name]: false });
  }
}

const ModalWithFooterPanel = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ width: '300px' }}>
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <Modal.Header>Адрес места осуществления предпринимательской деятельности</Modal.Header>
          <Modal.Body>
            <Input placeholder="Страна" />
          </Modal.Body>
          <Modal.Footer gap={8} panel>
            <Button onClick={() => setIsOpen(false)}>Close</Button>
            <Button>Do nothing</Button>
          </Modal.Footer>
        </Modal>
      )}
      <Button onClick={() => setIsOpen(true)}>Open modal</Button>
    </div>
  );
};

export const ModalWithFooterPanelStory: Story = () => <ModalWithFooterPanel />;
ModalWithFooterPanelStory.storyName = 'Modal with footer panel';

interface ModalWithoutFooterPanelState {
  opened: boolean;
}
class ModalWithoutFooterPanel extends React.Component {
  public state: ModalWithoutFooterPanelState = {
    opened: false,
  };

  public renderModal() {
    return (
      <Modal onClose={this.close}>
        <Modal.Header>Исправление ошибок</Modal.Header>
        <Modal.Body>
          <p style={basicFontStyle}>
            Исправить ошибки можно у нас в сервисе. Для этого загрузите документы для редактирования. Также можно
            посмотреть ошибки, исправить их в учетной программе и импортировать заново.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.close}>Не создавать</Button>
          <Button>Ничего не делать</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  public render() {
    return (
      <div style={{ width: '300px' }}>
        {this.state.opened && this.renderModal()}
        <Button onClick={this.open} data-tid="open-modal">
          Open modal
        </Button>
      </div>
    );
  }

  public open = () => {
    this.setState({ opened: true });
  };

  public close = () => {
    this.setState({ opened: false });
  };
}

interface ModalWithoutFooterState {
  opened: boolean;
}
class ModalWithoutFooter extends React.Component {
  public state: ModalWithoutFooterState = {
    opened: false,
  };

  public renderModal() {
    return (
      <Modal onClose={this.close}>
        <Modal.Header>Воспользуйтесь другим браузером</Modal.Header>
        <Modal.Body>
          <p style={basicFontStyle}>
            Некоторые функции не работают в вашем браузере. Чтобы все работало, установите один из этих браузеров:
            Firefox, Opera, Chrome.
          </p>
        </Modal.Body>
      </Modal>
    );
  }

  public render() {
    return (
      <div style={{ width: '300px' }}>
        {this.state.opened && this.renderModal()}
        <Button onClick={this.open} data-tid="open-modal">
          Open modal
        </Button>
      </div>
    );
  }

  public open = () => {
    this.setState({ opened: true });
  };

  public close = () => {
    this.setState({ opened: false });
  };
}

interface ModalInnerState {
  bigHeight: boolean;
}
class ModalInner extends React.Component {
  public state: ModalInnerState = {
    bigHeight: false,
  };

  public render() {
    return (
      <div id="modal-inner" style={{ width: 300 }}>
        <Toggle checked={this.state.bigHeight} onValueChange={(bigHeight) => this.setState({ bigHeight })} /> конкретно
        увеличить высоту
        <p
          style={{
            height: this.state.bigHeight ? 1000 : 250,
            transition: 'all 0.5s',
            overflow: 'hidden',
          }}
        >
          Use rxjs operators with react hooks. Use rxjs operators with react hooks. Use rxjs operators with react hooks.
          Use rxjs operators with react hooks. Use rxjs operators with react hooks. Use rxjs operators with react hooks.
          Use rxjs operators with react hooks. Use rxjs operators with react hooks. Use rxjs operators with react hooks.
          Use rxjs operators with react hooks. Use rxjs operators with react hooks.
        </p>
      </div>
    );
  }
}

interface ModalWithVariableHeightState {
  opened: boolean;
  panel: boolean;
}
class ModalWithVariableHeight extends React.Component<React.PropsWithChildren> {
  public state: ModalWithVariableHeightState = {
    opened: false,
    panel: false,
  };

  public render() {
    return (
      <div style={{ width: '300px' }}>
        {this.state.opened && (
          <Modal onClose={this.close}>
            <Modal.Header>Title</Modal.Header>
            <Modal.Body>
              <p>Use rxjs operators with react hooks</p>

              {this.props.children}

              <div>
                <Toggle
                  checked={this.state.panel}
                  onValueChange={() => this.setState(({ panel }: ModalWithVariableHeightState) => ({ panel: !panel }))}
                />{' '}
                Panel {this.state.panel ? 'enabled' : 'disabled'}
              </div>
            </Modal.Body>
            <Modal.Footer panel={this.state.panel}>
              <Button onClick={this.close}>Close</Button>
            </Modal.Footer>
          </Modal>
        )}
        <Button onClick={this.open} data-tid="open-modal">
          Open modal
        </Button>
      </div>
    );
  }

  public open = () => {
    this.setState({ opened: true });
  };

  public close = () => {
    this.setState({ opened: false });
  };
}

class SmallModalOnTop extends React.Component {
  public state = {
    opened: false,
  };

  public renderModal() {
    return (
      <Modal onClose={this.close} alignTop>
        <Modal.Header>Modal</Modal.Header>
        <Modal.Body>
          <Button data-tid="modal-content-button">Content Button</Button>
        </Modal.Body>
      </Modal>
    );
  }

  public render() {
    return (
      <div>
        {this.state.opened && this.renderModal()}
        <Button onClick={this.open} data-tid="open-modal">
          Open modal
        </Button>
      </div>
    );
  }

  public open = () => {
    this.setState({ opened: true });
  };

  public close = () => {
    this.setState({ opened: false });
  };
}

export default {
  title: 'Modal',
  component: Modal,
};

export const WithScrollableParentContent = () => <ModalWithScrollableContent />;
WithScrollableParentContent.storyName = 'With scrollable parent content';
WithScrollableParentContent.parameters = { creevey: { skip: true } };

export const WithIconInput: Story = () => <ModalWithIconInput />;

export const ModalOverAnotherModalStory: Story = () => <ModalOverAnotherModal />;
ModalOverAnotherModalStory.storyName = 'Modal over another modal';

export const DisabledModal = () => (
  <Modal disableClose>
    <Modal.Header>Disabled</Modal.Header>
    <Modal.Body>Content of disabled body</Modal.Body>
  </Modal>
);
DisabledModal.storyName = 'Disabled modal';
DisabledModal.parameters = { creevey: { skip: true } };

export const ModalWithoutFooterPanelStory: Story = () => <ModalWithoutFooterPanel />;
ModalWithoutFooterPanelStory.storyName = 'Modal without footer panel';

export const ModalWithoutFooterStory: Story = () => <ModalWithoutFooter />;
ModalWithoutFooterStory.storyName = 'Modal without footer';

export const ModalWithoutHeader = () => (
  <Modal>
    <Modal.Body>
      <div>
        Некоторые функции не работают в вашем браузере. Чтобы все работало, установите один из этих браузеров: Firefox,
        divpera, Chrome.
      </div>
    </Modal.Body>
  </Modal>
);
ModalWithoutHeader.storyName = 'Modal without header';
ModalWithoutHeader.parameters = { creevey: { captureElement: null } };

export const ModalMobileView: Story = () => {
  const theme = useContext(ThemeContext);

  return (
    <ThemeContext.Provider
      value={ThemeFactory.create(
        {
          mobileMediaQuery: '(max-width: 576px)',
        },
        theme,
      )}
    >
      <Modal>
        <Modal.Header>Воспользуйтесь другим браузером</Modal.Header>
        <Modal.Body>
          Некоторые функции не работают в вашем браузере. Чтобы все работало, установите один из этих браузеров:
          Firefox, Opera, Chrome.
        </Modal.Body>
        <Modal.Footer panel>
          <Button>Ок</Button>
        </Modal.Footer>
      </Modal>
    </ThemeContext.Provider>
  );
};
ModalMobileView.storyName = 'Modal mobile view';
ModalMobileView.parameters = {
  viewport: { defaultViewport: 'iphone' },
};

export const ModalWithVariableHeightOfContent: Story = () => (
  <ModalWithVariableHeight>
    <ModalInner />
  </ModalWithVariableHeight>
);
ModalWithVariableHeightOfContent.storyName = 'Modal with variable height of content';

export const ModalWithoutStickyElements: Story = () => (
  <Modal>
    <Modal.Header sticky={false}>Header</Modal.Header>
    <Modal.Body>
      {new Array(200).fill('Use rxjs operators with react hooks.').map((item, index) => (
        <p key={index}>{item}</p>
      ))}
    </Modal.Body>
    <Modal.Footer sticky={false}>Footer</Modal.Footer>
  </Modal>
);
ModalWithoutStickyElements.storyName = 'Modal without sticky elements';

export const WithAlignTop = () => (
  <Modal alignTop>
    <Modal.Body>
      <p>Use rxjs operators with react hooks.</p>
    </Modal.Body>
  </Modal>
);
WithAlignTop.storyName = 'With alignTop';
WithAlignTop.parameters = { creevey: { captureElement: null } };

export const SmallModalOnTheTop: Story = () => <SmallModalOnTop />;
SmallModalOnTheTop.storyName = 'Small modal on the Top';

export const ModalWithVeryLongHeaderWithoutSpaces = () => (
  <Modal width={350}>
    <Modal.Header>VeryLongAndStrangeHeaderWithoutMeaningAndSpaces</Modal.Header>
  </Modal>
);
ModalWithVeryLongHeaderWithoutSpaces.storyName = 'Modal with veryLongHeaderWithoutSpaces';
ModalWithVeryLongHeaderWithoutSpaces.parameters = { creevey: { captureElement: null } };

export const ModalWithHeaderFromOtherComponent = () => {
  const Header = () => <Modal.Header>Header </Modal.Header>;
  return (
    <Modal width={350}>
      <Header></Header>
      <Modal.Body>asdjhaklsdkajs</Modal.Body>
    </Modal>
  );
};
ModalWithHeaderFromOtherComponent.storyName = 'Modal with Header from other Component';
ModalWithHeaderFromOtherComponent.parameters = { creevey: { skip: true } };

export const ModalBodyWithoutPadding = () => (
  <ThemeContext.Consumer>
    {(theme) => {
      return (
        <Modal width={250}>
          <Modal.Body noPadding>
            <div style={{ background: theme.prototype.constructor.name.includes('Dark') ? '1f1f1f' : 'white' }}>
              <p>Loooooooong content content content</p>
              <p>Loooooooong content content content</p>
              <p>Loooooooong content content content</p>
              <p>Loooooooong content content content</p>
            </div>
          </Modal.Body>
        </Modal>
      );
    }}
  </ThemeContext.Consumer>
);
ModalBodyWithoutPadding.storyName = 'Modal with no-padding';
ModalBodyWithoutPadding.parameters = { creevey: { captureElement: null } };

export const AlignCenterAndNoClose = () => (
  <Modal width={250} noClose>
    <Modal.Header>
      <div style={{ textAlign: 'center' }}>Header</div>
    </Modal.Header>
    <Modal.Body>
      <div style={{ textAlign: 'center' }}>
        <p>Loooooooong content content content</p>
      </div>
    </Modal.Body>
  </Modal>
);
AlignCenterAndNoClose.parameters = { creevey: { captureElement: null } };

const Header = () => <Modal.Header sticky>Header</Modal.Header>;
const Body = () => (
  <Modal.Body>
    {new Array(200).fill('Use rxjs operators with react hooks.').map((item, index) => (
      <p key={index}>{item}</p>
    ))}
  </Modal.Body>
);
const Footer = () => (
  <Modal.Footer sticky panel>
    Footer
  </Modal.Footer>
);

export const ModalWithChildrenFromOtherComponent = () => (
  <Modal>
    <Header />
    <Body />
    <Footer />
  </Modal>
);

export const MobileModal: Story = () => {
  const [isOpen, setOpen] = useState(false);
  const [showThirdButton, setShowThird] = useState(false);

  const modal = (
    <ResponsiveLayout>
      {({ isMobile }) => {
        return (
          <Modal onClose={() => setOpen(false)}>
            <Modal.Header>Это какой-то заголовок заголовок</Modal.Header>
            <Modal.Body>
              <p style={{ margin: 0 }}>
                {new Array(80).fill(
                  'ст ст ст ст ст ст ст ст ст ст ст ст ст ст ст ст ст ст ст ст ст ст тек ст тек ст тек ст тек ст тек ст тек ст тек ст тек ст тек ст тек ст тек ст тек ст тек ст тек ст тек ст тек ст тек ст тек ст тек ст тек ст',
                  0,
                  80,
                )}
              </p>
            </Modal.Body>
            <Modal.Footer gap={isMobile ? 8 : 25} panel>
              <Button
                use={'primary'}
                onClick={() => {
                  setShowThird(true);
                }}
                style={isMobile ? { width: '100%' } : undefined}
              >
                Ок
              </Button>
              <Button
                use={'danger'}
                onClick={() => {
                  setShowThird(false);
                }}
                style={isMobile ? { width: '100%' } : undefined}
              >
                Удалить
              </Button>
              {showThirdButton && (
                <Button style={isMobile ? { width: '100%', marginTop: '8px' } : { marginLeft: '100px' }}>
                  Изменить
                </Button>
              )}
            </Modal.Footer>
          </Modal>
        );
      }}
    </ResponsiveLayout>
  );

  const render = (
    <div>
      <Button onClick={() => setOpen(true)} data-tid="open-modal">
        Open modal
      </Button>
      {isOpen && modal}
    </div>
  );

  return render;
};
MobileModal.storyName = 'Mobile modal';
MobileModal.parameters = {
  viewport: {
    defaultViewport: 'iphonePlus',
  },
};

export const ChangeAllModalContent: Story = () => {
  interface FirstContentProps {
    onClick: () => void;
    onClose: () => void;
  }

  const FirstContent: React.FC<FirstContentProps> = ({ onClick, onClose }) => (
    <>
      <Modal.Header>1</Modal.Header>
      <Modal.Body>Первый контент</Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose}>Понятно</Button>
        <Button onClick={onClick} data-tid="open-second-modal">
          Поменять контент
        </Button>
      </Modal.Footer>
    </>
  );

  const SecondContent: React.FC<FirstContentProps> = ({ onClick, onClose }) => (
    <>
      <Modal.Header>2</Modal.Header>
      <Modal.Body>Второй контент</Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose}>Понятно</Button>
        <Button onClick={onClick}>Поменять контент</Button>
      </Modal.Footer>
    </>
  );

  const PayNotifice = () => {
    const [content, setContent] = React.useState('first');
    const [isOpened, setIsOpened] = React.useState(false);
    const changeContent = () => setContent((prev) => (prev === 'first' ? 'second' : 'first'));

    let modalContent: ReactNode;
    switch (content) {
      case 'first':
        modalContent = <FirstContent onClick={changeContent} onClose={() => setIsOpened(false)} />;
        break;
      case 'second':
        modalContent = <SecondContent onClick={changeContent} onClose={() => setIsOpened(false)} />;
        break;
    }

    return (
      <>
        {isOpened && <Modal>{modalContent}</Modal>}
        <Button use="pay" onClick={() => setIsOpened(true)} data-tid="open-first-modal">
          Оплата
        </Button>
      </>
    );
  };
  return <PayNotifice />;
};
ChangeAllModalContent.storyName = 'Change all modal content';

export const CrossFocusedByTab: Story = () => {
  return (
    <Modal disableFocusLock>
      <Modal.Header>Крестик в модалке</Modal.Header>
      <Modal.Body>
        <span>Тело модалки</span>
      </Modal.Body>
    </Modal>
  );
};

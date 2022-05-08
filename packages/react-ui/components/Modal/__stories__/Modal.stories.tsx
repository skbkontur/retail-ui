// TODO: Rewrite stories and enable rule (in process of functional refactoring).
/* eslint-disable react/no-unstable-nested-components */
import React, { useContext, useState } from 'react';
import BorderAllIcon from '@skbkontur/react-icons/BorderAll';

import { CreeveyTests, Story } from '../../../typings/stories';
import { Modal } from '../Modal';
import { Button } from '../../Button';
import { Input } from '../../Input';
import { Toggle } from '../../Toggle';
import { Gapped } from '../../Gapped';
import { delay } from '../../../lib/utils';
import { ThemeContext } from '../../../lib/theming/ThemeContext';
import { ThemeFactory } from '../../../lib/theming/ThemeFactory';
import { ResponsiveLayout } from '../../ResponsiveLayout';

const basicFontStyle = {
  fontSize: '14px',
  lineHeight: '20px',
  margin: '0',
};

type ModalWithScrollableContentState = { opened: boolean; panel: boolean };
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

type ModalWithIconInputState = { opened: boolean };
class ModalWithIconInput extends React.Component {
  public state: ModalWithIconInputState = {
    opened: false,
  };

  public renderModal() {
    return (
      <Modal onClose={this.close}>
        <Modal.Header>
          <Input size="large" placeholder="Modal.Header" leftIcon={<BorderAllIcon />} rightIcon={<BorderAllIcon />} />
          <Input size="medium" placeholder="Modal.Header" leftIcon={<BorderAllIcon />} rightIcon={<BorderAllIcon />} />
          <Input size="small" placeholder="Modal.Header" leftIcon={<BorderAllIcon />} rightIcon={<BorderAllIcon />} />
        </Modal.Header>
        <Modal.Body>
          <Input size="large" placeholder="Modal.Body" leftIcon={<BorderAllIcon />} rightIcon={<BorderAllIcon />} />
          <Input size="medium" placeholder="Modal.Body" leftIcon={<BorderAllIcon />} rightIcon={<BorderAllIcon />} />
          <Input size="small" placeholder="Modal.Body" leftIcon={<BorderAllIcon />} rightIcon={<BorderAllIcon />} />
        </Modal.Body>
        <Modal.Footer>
          <Input size="large" placeholder="Modal.Footer" leftIcon={<BorderAllIcon />} rightIcon={<BorderAllIcon />} />
          <Input size="medium" placeholder="Modal.Footer" leftIcon={<BorderAllIcon />} rightIcon={<BorderAllIcon />} />
          <Input size="small" placeholder="Modal.Footer" leftIcon={<BorderAllIcon />} rightIcon={<BorderAllIcon />} />
        </Modal.Footer>
      </Modal>
    );
  }

  public render() {
    return (
      <div style={{ width: '300px' }}>
        {this.state.opened && this.renderModal()}
        <Button onClick={this.open}>Open modal</Button>
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

type ModalOverAnotherModalState = { firstModalOpened: boolean; secondModalOpened: boolean };
class ModalOverAnotherModal extends React.Component {
  public state: ModalOverAnotherModalState = {
    firstModalOpened: false,
    secondModalOpened: false,
  };

  public renderModal(name: string, width: number) {
    return (
      <Modal width={width} onClose={this.close.bind(this, name)}>
        <Modal.Header>Модалка #{name === 'firstModalOpened' ? '1' : '2'}</Modal.Header>
        <Modal.Body>
          {name === 'firstModalOpened' && (
            <Button onClick={() => this.setState({ secondModalOpened: true })}>Open second modal</Button>
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
        <Button onClick={() => this.setState({ firstModalOpened: true })}>Open first modal</Button>
      </div>
    );
  }

  public close(name: string) {
    this.setState({ [name]: false });
  }
}

type ModalWithFooterPanelState = { opened: boolean; panel: boolean };
class ModalWithFooterPanel extends React.Component {
  public state: ModalWithFooterPanelState = {
    opened: false,
    panel: true,
  };

  public renderModal() {
    return (
      <Modal onClose={this.close}>
        <Modal.Header>Адрес места осуществления предпринимательской деятельности</Modal.Header>
        <Modal.Body>
          <Input placeholder="Страна" />
        </Modal.Body>
        <Modal.Footer panel={this.state.panel}>
          <Button onClick={this.close}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  public render() {
    return (
      <div style={{ width: '300px' }}>
        {this.state.opened && this.renderModal()}
        <Button onClick={this.open}>Open modal</Button>
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

type ModalWithoutFooterPanelState = { opened: boolean };
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
        </Modal.Footer>
      </Modal>
    );
  }

  public render() {
    return (
      <div style={{ width: '300px' }}>
        {this.state.opened && this.renderModal()}
        <Button onClick={this.open}>Open modal</Button>
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

type ModalWithoutFooterState = { opened: boolean };
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
        <Button onClick={this.open}>Open modal</Button>
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

type ModalMobileViewState = { opened: boolean };
class ModalMobileView extends React.Component {
  public state: ModalMobileViewState = {
    opened: true,
  };

  public render() {
    return (
      <Modal>
        <Modal.Header>Воспользуйтесь другим браузером</Modal.Header>
        <Modal.Body>
          <p style={{ height: 2000 }}>
            Некоторые функции не работают в вашем браузере. Чтобы все работало, установите один из этих браузеров:
            Firefox, Opera, Chrome.
          </p>
        </Modal.Body>
        <Modal.Footer panel>
          <Button>Ок</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

type ModalInnerState = { bigHeight: boolean };
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

type ModalWithVariableHeightState = { opened: boolean; panel: boolean };
class ModalWithVariableHeight extends React.Component {
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
        <Button onClick={this.open}>Open modal</Button>
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

type SmallModalOnTopState = {
  opened: boolean;
};
class SmallModalOnTop extends React.Component {
  public state: SmallModalOnTopState = {
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
        <Button onClick={this.open}>Open modal</Button>
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

export default { title: 'Modal' };

export const WithScrollableParentContent = () => <ModalWithScrollableContent />;
WithScrollableParentContent.storyName = 'With scrollable parent content';
WithScrollableParentContent.parameters = { creevey: { skip: [true] } };

export const WithIconInput: Story = () => <ModalWithIconInput />;

WithIconInput.parameters = {
  creevey: {
    tests: {
      async ['open modal']() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: 'button' }))
          .perform();
        await delay(1000);
        await this.expect(await this.browser.takeScreenshot()).to.matchImage('open modal');
      },
    },
  },
};

export const ModalOverAnotherModalStory: Story = () => <ModalOverAnotherModal />;
ModalOverAnotherModalStory.storyName = 'Modal over another modal';

ModalOverAnotherModalStory.parameters = {
  creevey: {
    tests: {
      async ['open first modal']() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: 'button' }))
          .perform();
        await delay(200);
        await this.expect(await this.browser.takeScreenshot()).to.matchImage('open first modal');
      },
      async ['open second modal']() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: 'button' }))
          .perform();
        await this.browser
          .actions({ bridge: true })
          .click(this.browser.findElement({ css: '[data-comp-name~="ModalBody"] button' }))
          .perform();
        await delay(100);
        await this.expect(await this.browser.takeScreenshot()).to.matchImage('open second modal');
      },
    },
  },
};

export const DisabledModal = () => (
  <Modal disableClose>
    <Modal.Header>Disabled</Modal.Header>
    <Modal.Body>Content of disabled body</Modal.Body>
  </Modal>
);
DisabledModal.storyName = 'Disabled modal';
DisabledModal.parameters = { creevey: { skip: [true] } };

export const ModalWithFooterPanelStory: Story = () => <ModalWithFooterPanel />;
ModalWithFooterPanelStory.storyName = 'Modal with footer panel';

ModalWithFooterPanelStory.parameters = {
  creevey: {
    tests: {
      async ['open modal']() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: 'button' }))
          .perform();
        await delay(100);
        await this.expect(await this.browser.takeScreenshot()).to.matchImage('open modal');
      },
    },
  },
};

export const ModalWithoutFooterPanelStory: Story = () => <ModalWithoutFooterPanel />;
ModalWithoutFooterPanelStory.storyName = 'Modal without footer panel';

ModalWithoutFooterPanelStory.parameters = {
  creevey: {
    tests: {
      async ['open modal']() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: 'button' }))
          .perform();
        await delay(200);
        await this.expect(await this.browser.takeScreenshot()).to.matchImage('open modal');
      },
    },
  },
};

export const ModalWithoutFooterStory: Story = () => <ModalWithoutFooter />;
ModalWithoutFooterStory.storyName = 'Modal without footer';

ModalWithoutFooterStory.parameters = {
  creevey: {
    tests: {
      async ['open modal']() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: 'button' }))
          .perform();
        await this.expect(await this.browser.takeScreenshot()).to.matchImage('open modal');
      },
    },
  },
};

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

export const ModalMobileViewStory = () => <ModalMobileView />;
ModalMobileViewStory.storyName = 'Modal mobile view';
ModalMobileViewStory.parameters = { creevey: { skip: [true] } };

export const ModalWithVariableHeightOfContent: Story = () => (
  <ModalWithVariableHeight>
    <ModalInner />
  </ModalWithVariableHeight>
);
ModalWithVariableHeightOfContent.storyName = 'Modal with variable height of content';

ModalWithVariableHeightOfContent.parameters = {
  creevey: {
    tests: {
      async ['open modal']() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: 'button' }))
          .perform();
        await delay(100);
        await this.expect(await this.browser.takeScreenshot()).to.matchImage('open modal');
      },
      async ['toggle content height']() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: 'button' }))
          .perform();
        await this.browser
          .actions({ bridge: true })
          .click(this.browser.findElement({ css: '#modal-inner [data-comp-name~="Toggle"]' }))
          .pause(500)
          .perform();
        await this.expect(await this.browser.takeScreenshot()).to.matchImage('toggle content height');
      },
    },
  },
};

const TopMiddleBottomModalTests: CreeveyTests = {
  async top() {
    await this.expect(await this.browser.takeScreenshot()).to.matchImage('top');
  },
  async middle() {
    await this.browser.executeScript(function () {
      const modalContainer = window.document.querySelector('[data-tid="modal-container"]') as HTMLElement;
      const modalContent = window.document.querySelector('[data-tid="modal-content"]') as HTMLElement;

      modalContainer.scrollTop = modalContent.offsetHeight / 2;
    });
    await delay(100);
    await this.expect(await this.browser.takeScreenshot()).to.matchImage('middle');
  },
  async bottom() {
    await this.browser.executeScript(function () {
      const modalContainer = window.document.querySelector('[data-tid="modal-container"]') as HTMLElement;
      const modalContent = window.document.querySelector('[data-tid="modal-content"]') as HTMLElement;

      modalContainer.scrollTop = modalContent.offsetHeight;
    });
    await delay(100);
    await this.expect(await this.browser.takeScreenshot()).to.matchImage('bottom');
  },
};

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

ModalWithoutStickyElements.parameters = { creevey: { tests: TopMiddleBottomModalTests } };

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

SmallModalOnTheTop.parameters = {
  creevey: {
    tests: {
      async ['open modal']() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: 'button' }))
          .perform();
        await delay(100);
        await this.expect(await this.browser.takeScreenshot()).to.matchImage('open modal');
      },
      async ['close by click on the cross']() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: 'button' }))
          .perform();
        await this.browser
          .actions({ bridge: true })
          .click(this.browser.findElement({ css: '[data-tid="modal-close"]' }))
          .perform();
        await this.expect(await this.browser.takeScreenshot()).to.matchImage('close by click on the cross');
      },
      async ["doesn't close by click on the content"]() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: 'button' }))
          .perform();
        await this.browser
          .actions({ bridge: true })
          .click(this.browser.findElement({ css: '[data-tid="modal-content-button"]' }))
          .perform();
        await this.expect(await this.browser.takeScreenshot()).to.matchImage("doesn't close by click on the content");
      },
      async ['closes by click on the background']() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: 'button' }))
          .perform();
        await this.browser
          .actions({ bridge: true })
          .click(this.browser.findElement({ css: '[data-tid="modal-container"]' }))
          .perform();
        await this.expect(await this.browser.takeScreenshot()).to.matchImage('closes by click on the background');
      },
    },
  },
};

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
ModalWithHeaderFromOtherComponent.parameters = { creevey: { skip: [true] } };

export const ModalBodyWithoutPadding = () => (
  <ThemeContext.Consumer>
    {(theme) => {
      return (
        <Modal width={250}>
          <Modal.Body noPadding>
            <div style={{ background: theme.prototype.constructor.name === 'DarkTheme' ? '1f1f1f' : 'white' }}>
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

ModalWithChildrenFromOtherComponent.parameters = {
  creevey: {
    skip: [{ in: ['ie11', 'ie118px', 'ie11Flat8px', 'ie11Dark'], tests: ['top', 'middle'] }],
    tests: TopMiddleBottomModalTests,
  },
};

export const MobileModal: Story = () => {
  const [isOpen, setOpen] = useState(false);
  const [showThirdButton, setShowThird] = useState(false);

  const theme = useContext(ThemeContext);

  const modal = (
    <ThemeContext.Provider
      value={ThemeFactory.create(
        {
          mobileMediaQuery: '(max-width: 576px)',
        },
        theme,
      )}
    >
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
              <Modal.Footer panel>
                <Gapped vertical={isMobile} gap={isMobile ? 8 : 25}>
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
                </Gapped>
              </Modal.Footer>
            </Modal>
          );
        }}
      </ResponsiveLayout>
    </ThemeContext.Provider>
  );

  const render = (
    <div>
      <Button onClick={() => setOpen(true)}>Open modal</Button>
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
  creevey: {
    tests: {
      async top() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: 'button' }))
          .perform();
        await delay(200);

        await this.expect(await this.browser.takeScreenshot()).to.matchImage('top');
      },
      async middle() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: 'button' }))
          .perform();
        await delay(200);

        await this.browser.executeScript(function () {
          const modalContent = window.document.querySelector('.focus-lock-container') as HTMLElement;
          const modalBody = window.document.querySelector('[data-comp-name~="ModalBody"] ') as HTMLElement;

          modalContent.scrollTop = modalBody.offsetHeight / 2;
        });
        await delay(100);
        await this.expect(await this.browser.takeScreenshot()).to.matchImage('middle');
      },
      async bottom() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: 'button' }))
          .perform();
        await delay(200);

        await this.browser.executeScript(function () {
          const modalContent = window.document.querySelector('.focus-lock-container') as HTMLElement;
          const modalBody = window.document.querySelector('[data-comp-name~="ModalBody"] ') as HTMLElement;

          modalContent.scrollTop = modalBody.offsetHeight;
        });

        await delay(100);
        await this.expect(await this.browser.takeScreenshot()).to.matchImage('bottom');
      },
    },
  },
};

import React, { Component } from 'react';
import BorderAllIcon from '@skbkontur/react-icons/BorderAll';
import { CreeveyStoryParams, CSFStory } from 'creevey';

import { Modal } from '../Modal';
import { Button } from '../../Button';
import { Input } from '../../Input';
import { Toggle } from '../../Toggle';
import { delay } from '../../../lib/utils';

const basicFontStyle = {
  fontSize: '14px',
  lineHeight: '20px',
  margin: '0',
};

class ModalWithScrollableContent extends Component<{}, { opened: boolean; panel: boolean }> {
  public state = {
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
              onValueChange={() => this.setState(({ panel }) => ({ panel: !panel }))}
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

class ModalWithIconInput extends Component<{}, { opened: boolean }> {
  public state = {
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

class ModalOverAnotherModal extends Component<{}, any> {
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

class ModalWithFooterPanel extends Component<{}, { opened: boolean; panel: boolean }> {
  public state = {
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

class ModalWithoutFooterPanel extends Component<{}, { opened: boolean }> {
  public state = {
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

class ModalWithoutFooter extends Component<{}, { opened: boolean }> {
  public state = {
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

class ModalMobileView extends Component<{}, { opened: boolean }> {
  public state = {
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

class ModalInner extends React.Component<{}, { bigHeight: boolean }> {
  constructor(props: {}) {
    super(props);

    this.state = {
      bigHeight: false,
    };
  }

  public render() {
    return (
      <div id="modal-inner" style={{ width: 300 }}>
        <Toggle checked={this.state.bigHeight} onValueChange={bigHeight => this.setState({ bigHeight })} /> конкретно
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

class ModalWithVariableHeight extends Component<{}, { opened: boolean; panel: boolean }> {
  public state = {
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
                  onValueChange={() => this.setState(({ panel }) => ({ panel: !panel }))}
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

class SmallModalOnTop extends Component<{}, {}> {
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
WithScrollableParentContent.story = {
  name: 'With scrollable parent content',
  parameters: { creevey: { skip: [true] } },
};

export const WithIconInput: CSFStory<JSX.Element> = () => <ModalWithIconInput />;
WithIconInput.story = {
  parameters: {
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
  },
};
export const ModalOverAnotherModalStory: CSFStory<JSX.Element> = () => <ModalOverAnotherModal />;
ModalOverAnotherModalStory.story = {
  name: 'Modal over another modal',
  parameters: {
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
  },
};

export const DisabledModal = () => (
  <Modal disableClose>
    <Modal.Header>Disabled</Modal.Header>
    <Modal.Body>Content of disabled body</Modal.Body>
  </Modal>
);
DisabledModal.story = { name: 'Disabled modal', parameters: { creevey: { skip: [true] } } };

export const ModalWithFooterPanelStory: CSFStory<JSX.Element> = () => <ModalWithFooterPanel />;
ModalWithFooterPanelStory.story = {
  name: 'Modal with footer panel',
  parameters: {
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
  },
};

export const ModalWithoutFooterPanelStory: CSFStory<JSX.Element> = () => <ModalWithoutFooterPanel />;
ModalWithoutFooterPanelStory.story = {
  name: 'Modal without footer panel',
  parameters: {
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
  },
};

export const ModalWithoutFooterStory: CSFStory<JSX.Element> = () => <ModalWithoutFooter />;
ModalWithoutFooterStory.story = {
  name: 'Modal without footer',
  parameters: {
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
ModalWithoutHeader.story = { name: 'Modal without header', parameters: { creevey: { captureElement: null } } };

export const ModalMobileViewStory = () => <ModalMobileView />;
ModalMobileViewStory.story = { name: 'Modal mobile view', parameters: { creevey: { skip: [true] } } };

export const ModalWithVariableHeightOfContent: CSFStory<JSX.Element> = () => (
  <ModalWithVariableHeight>
    <ModalInner />
  </ModalWithVariableHeight>
);
ModalWithVariableHeightOfContent.story = {
  name: 'Modal with variable height of content',
  parameters: {
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
  },
};

const TopMiddleBottomModalTests: CreeveyStoryParams['tests'] = {
  async top() {
    await this.expect(await this.browser.takeScreenshot()).to.matchImage('top');
  },
  async middle() {
    await this.browser.executeScript(function() {
      const modalContainer = window.document.querySelector('[data-tid="modal-container"]');
      const modalContent = window.document.querySelector('[data-tid="modal-content"]');

      // @ts-ignore
      modalContainer.scrollTop = modalContent.offsetHeight / 2;
    });
    await delay(100);
    await this.expect(await this.browser.takeScreenshot()).to.matchImage('middle');
  },
  async bottom() {
    await this.browser.executeScript(function() {
      const modalContainer = window.document.querySelector('[data-tid="modal-container"]');
      const modalContent = window.document.querySelector('[data-tid="modal-content"]');

      // @ts-ignore
      modalContainer.scrollTop = modalContent.offsetHeight;
    });
    await delay(100);
    await this.expect(await this.browser.takeScreenshot()).to.matchImage('bottom');
  }
};

export const ModalWithoutStickyElements: CSFStory<JSX.Element> = () => (
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
ModalWithoutStickyElements.story = {
  name: 'Modal without sticky elements',
  parameters: { creevey: { tests: TopMiddleBottomModalTests } }
};

export const WithAlignTop = () => (
  <Modal alignTop={true}>
    <Modal.Body>
      <p>Use rxjs operators with react hooks.</p>
    </Modal.Body>
  </Modal>
);
WithAlignTop.story = { name: 'With alignTop', parameters: { creevey: { captureElement: null } } };

export const SmallModalOnTheTop: CSFStory<JSX.Element> = () => <SmallModalOnTop />;
SmallModalOnTheTop.story = {
  name: 'Small modal on the Top',
  parameters: {
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
  },
};

export const ModalWithVeryLongHeaderWithoutSpaces = () => (
  <Modal width={350}>
    <Modal.Header>VeryLongAndStrangeHeaderWithoutMeaningAndSpaces</Modal.Header>
  </Modal>
);
ModalWithVeryLongHeaderWithoutSpaces.story = {
  name: 'Modal with veryLongHeaderWithoutSpaces',
  parameters: { creevey: { captureElement: null } },
};

export const ModalBodyWithoutPadding = () => (
  <Modal width={250}>
    <Modal.Body noPadding>
      <div style={{ background: 'white' }}>
        <p>Loooooooong content content content</p>
        <p>Loooooooong content content content</p>
        <p>Loooooooong content content content</p>
        <p>Loooooooong content content content</p>
      </div>
    </Modal.Body>
  </Modal>
);
ModalBodyWithoutPadding.story = {
  name: 'Modal with no-padding',
  parameters: { creevey: { captureElement: null } },
};

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
AlignCenterAndNoClose.story = { parameters: { creevey: { captureElement: null } } };

const Header = () => <Modal.Header>Header</Modal.Header>;
const Body = () => (
  <Modal.Body>
    {new Array(200).fill('Use rxjs operators with react hooks.').map((item, index) => (
      <p key={index}>{item}</p>
    ))}
  </Modal.Body>
)
const Footer = () => <Modal.Footer>Footer</Modal.Footer>;

const ModalWithChildrenFromOtherComponent = (sticky = true) => {
  return (
    <Modal>
      <Header/>
      <Body />
      <Footer />
    </Modal>
  );
}

export const ModalWithChildrenFromOtherComponentWithStickyElements: CSFStory<JSX.Element> = () => (
  ModalWithChildrenFromOtherComponent()
)

ModalWithChildrenFromOtherComponentWithStickyElements.story = {
  parameters: { creevey: { tests: TopMiddleBottomModalTests } }
};

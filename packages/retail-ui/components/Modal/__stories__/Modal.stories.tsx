/* tslint:disable jsx-no-lambda */
import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import Modal from '../';
import Button from '../../Button';
import Input from '../../Input';
import Toggle from '../../Toggle';
import BorderAllIcon from '@skbkontur/react-icons/BorderAll';

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
            <Toggle checked={this.state.panel} onChange={() => this.setState(({ panel }) => ({ panel: !panel }))} />{' '}
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
        <Toggle checked={this.state.bigHeight} onChange={bigHeight => this.setState({ bigHeight })} /> конкретно
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
                <Toggle checked={this.state.panel} onChange={() => this.setState(({ panel }) => ({ panel: !panel }))} />{' '}
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

storiesOf('Modal', module)
  .add('With scrollable parent content', () => <ModalWithScrollableContent />)
  .add('With Icon Input', () => <ModalWithIconInput />)
  .add('Modal over another modal', () => <ModalOverAnotherModal />)
  .add('Disabled modal', () => (
    <Modal disableClose>
      <Modal.Header>Disabled</Modal.Header>
      <Modal.Body>Content of disabled body</Modal.Body>
    </Modal>
  ))
  .add('Modal with footer panel', () => <ModalWithFooterPanel />)
  .add('Modal without footer panel', () => <ModalWithoutFooterPanel />)
  .add('Modal without footer', () => <ModalWithoutFooter />)
  .add('Modal without header', () => (
    <Modal>
      <Modal.Body>
        <div>
          Некоторые функции не работают в вашем браузере. Чтобы все работало, установите один из этих браузеров:
          Firefox, divpera, Chrome.
        </div>
      </Modal.Body>
    </Modal>
  ))
  .add('Modal mobile view', () => <ModalMobileView />)
  .add('Modal with variable height of content', () => (
    <ModalWithVariableHeight>
      <ModalInner />
    </ModalWithVariableHeight>
  ))
  .add('Modal without sticky elements', () => (
    <Modal>
      <Modal.Header sticky={false}>Header</Modal.Header>
      <Modal.Body>
        {new Array(200).fill('Use rxjs operators with react hooks.').map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </Modal.Body>
      <Modal.Footer sticky={false}>Footer</Modal.Footer>
    </Modal>
  ))
  .add('With alignTop', () => (
    <Modal alignTop={true}>
      <Modal.Body>
        <p>Use rxjs operators with react hooks.</p>
      </Modal.Body>
    </Modal>
  ))
  .add('Small modal on the Top', () => <SmallModalOnTop />);

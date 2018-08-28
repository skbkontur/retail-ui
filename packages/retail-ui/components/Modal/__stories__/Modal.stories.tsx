/* tslint:disable */
import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import Modal from '../';
import Button from '../../Button';
import Input from '../../Input';
import Textarea from '../../Textarea';
import Toggle from '../../Toggle';
import Upgrades from '../../../lib/Upgrades';

const basicFontStyle = {
  fontSize: '14px',
  lineHeight: '20px',
  margin: '0'
};

class ModalWithScrollableContent extends Component<
  {},
  { opened: boolean; panel: boolean }
> {
  public state = {
    opened: false,
    panel: false
  };

  public render() {
    return (
      <div style={{ width: '300px' }}>
        {this.state.opened && this.renderModal()}
        <Button onClick={this.open}>Open modal</Button>
        <p style={{ marginBottom: '100px' }}>
          On the other hand, we denounce with righteous indignation and dislike
          men who are so beguiled and demoralized by the charms of pleasure of
          the moment, so blinded by desire, that they cannot foresee the pain
          and trouble that are bound to ensue; and equal blame belongs to those
          who fail in their duty through weakness of will, which is the same as
          saying through shrinking from toil and pain. These cases are perfectly
          simple and easy to distinguish. In a free hour, when our power of
          choice is untrammelled and when nothing prevents our being able to do
          what we like best, every pleasure is to be welcomed and every pain
          avoided. But in certain circumstances and owing to the claims of duty
          or the obligations of business it will frequently occur that pleasures
          have to be repudiated and annoyances accepted. The wise man therefore
          always holds in these matters to this principle of selection: he
          rejects pleasures to secure other greater pleasures, or else he
          endures pains to avoid worse pains.
        </p>
        <p>
          On the other hand, we denounce with righteous indignation and dislike
          men who are so beguiled and demoralized by the charms of pleasure of
          the moment, so blinded by desire, that they cannot foresee the pain
          and trouble that are bound to ensue; and equal blame belongs to those
          who fail in their duty through weakness of will, which is the same as
          saying through shrinking from toil and pain. These cases are perfectly
          simple and easy to distinguish. In a free hour, when our power of
          choice is untrammelled and when nothing prevents our being able to do
          what we like best, every pleasure is to be welcomed and every pain
          avoided. But in certain circumstances and owing to the claims of duty
          or the obligations of business it will frequently occur that pleasures
          have to be repudiated and annoyances accepted. The wise man therefore
          always holds in these matters to this principle of selection: he
          rejects pleasures to secure other greater pleasures, or else he
          endures pains to avoid worse pains.
        </p>
      </div>
    );
  }

  public renderModal() {
    return (
      <Modal onClose={this.close}>
        <Modal.Header>Title</Modal.Header>
        <Modal.Body>
          <p>
            A lotta people ask me where the fuck I've been at the last few
            years.
          </p>

          <div>
            <Toggle
              checked={this.state.panel}
              onChange={() => this.setState(({ panel }) => ({ panel: !panel }))}
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

class ModalWithInputInHeader extends Component<{}, { opened: boolean }> {
  public state = {
    opened: false
  };

  public renderModal() {
    return (
      <Modal onClose={this.close}>
        <Modal.Header>
          <Input placeholder="Some input placeholder..." />{' '}
          <Input size="large" placeholder="Some large input placeholder..." />
          <br />
          <Textarea placeholder="Some textarea placeholder" value="" />
        </Modal.Header>
        <Modal.Body>
          <p>
            A lotta people ask me where the fuck I've been at the last few
            years.
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

class ModalOverAnotherModal extends Component<{}, any> {
  public state = {
    firstModalOpened: false,
    secondModalOpened: false
  };

  public renderModal(name: string, width: number) {
    return (
      <Modal width={width} onClose={this.close.bind(this, name)}>
        <Modal.Header>
          Модалка #{name === 'firstModalOpened' ? '1' : '2'}
        </Modal.Header>
        <Modal.Body>
          {name === 'firstModalOpened' && (
            <Button onClick={() => this.setState({ secondModalOpened: true })}>
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
        <Button onClick={() => this.setState({ firstModalOpened: true })}>
          Open first modal
        </Button>
      </div>
    );
  }

  public close(name: string) {
    this.setState({ [name]: false });
  }
}

class ModalWithFooterPanel extends Component<
  {},
  { opened: boolean; panel: boolean }
> {
  public state = {
    opened: false,
    panel: true
  };

  public renderModal() {
    return (
      <Modal onClose={this.close}>
        <Modal.Header>
          Адрес места осуществления предпринимательской деятельности
        </Modal.Header>
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
    opened: false
  };

  public renderModal() {
    return (
      <Modal onClose={this.close}>
        <Modal.Header>Исправление ошибок</Modal.Header>
        <Modal.Body>
          <p style={basicFontStyle}>
            Исправить ошибки можно у нас в сервисе. Для этого загрузите
            документы для редактирования. Также можно посмотреть ошибки,
            исправить их в учетной программе и импортировать заново.
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
    opened: false
  };

  public renderModal() {
    return (
      <Modal onClose={this.close}>
        <Modal.Header>Воспользуйтесь другим браузером</Modal.Header>
        <Modal.Body>
          <p style={basicFontStyle}>
            Некоторые функции не работают в вашем браузере. Чтобы все работало,
            установите один из этих браузеров: Firefox, Opera, Chrome.
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
    opened: true
  };

  componentDidMount() {
    Upgrades.setAdaptiveStyles(true);
  }

  componentWillUnmount() {
    Upgrades.setAdaptiveStyles(false);
  }

  render() {
    return (
      <Modal>
        <Modal.Header>Воспользуйтесь другим браузером</Modal.Header>
        <Modal.Body>
          <p style={{ height: 2000 }}>
            Некоторые функции не работают в вашем браузере. Чтобы все работало,
            установите один из этих браузеров: Firefox, Opera, Chrome.
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
      bigHeight: false
    };
  }

  render() {
    return (
      <div id="modal-inner" style={{ width: 300 }}>
        <Toggle
          checked={this.state.bigHeight}
          onChange={bigHeight => this.setState({ bigHeight })}
        />{' '}
        конкретно увеличить высоту
        <p
          style={{
            height: this.state.bigHeight ? 1000 : 250,
            transition: 'all 0.5s',
            overflow: 'hidden'
          }}
        >
          A lotta people ask me where the fuck I've been at the last few years.
          A lotta people ask me where the fuck I've been at the last few years.
          A lotta people ask me where the fuck I've been at the last few years.
          A lotta people ask me where the fuck I've been at the last few years.
          A lotta people ask me where the fuck I've been at the last few years.
          A lotta people ask me where the fuck I've been at the last few years.
          A lotta people ask me where the fuck I've been at the last few years.
          A lotta people ask me where the fuck I've been at the last few years.
          A lotta people ask me where the fuck I've been at the last few years.
          A lotta people ask me where the fuck I've been at the last few years.
          A lotta people ask me where the fuck I've been at the last few years.
        </p>
      </div>
    );
  }
}

class ModalWithVariableHeight extends Component<
  {},
  { opened: boolean; panel: boolean }
> {
  public state = {
    opened: false,
    panel: false
  };

  public render() {
    return (
      <div style={{ width: '300px' }}>
        {this.state.opened && (
          <Modal onClose={this.close}>
            <Modal.Header>Title</Modal.Header>
            <Modal.Body>
              <p>
                A lotta people ask me where the fuck I've been at the last few
                years.
              </p>

              {this.props.children}

              <div>
                <Toggle
                  checked={this.state.panel}
                  onChange={() =>
                    this.setState(({ panel }) => ({ panel: !panel }))
                  }
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

storiesOf('Modal', module)
  .add('With scrollable parent content', () => <ModalWithScrollableContent />)
  .add('With Input in header', () => <ModalWithInputInHeader />)
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
          Некоторые функции не работают в вашем браузере. Чтобы все работало,
          установите один из этих браузеров: Firefox, divpera, Chrome.
        </div>
      </Modal.Body>
    </Modal>
  ))
  .add('Modal mobile view', () => <ModalMobileView />)
  .add('Modal with variable height of content', () => (
    <ModalWithVariableHeight>
      <ModalInner />
    </ModalWithVariableHeight>
  ));

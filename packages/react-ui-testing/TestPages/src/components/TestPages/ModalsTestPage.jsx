import React from 'react';
import { Button } from '@skbkontur/react-ui/components/Button';
import { Modal } from '@skbkontur/react-ui/components/Modal';

import { Case, CaseSuite } from '../Case';

export default class InputTextPage extends React.Component {
  state = {
    showModalWithStatelessComp: false,
    showModalWithStatefullComp: false,
    showModalWithoutComp: false,
  };

  render(): React.Element<*> {
    return (
      <CaseSuite title="Модальные окна">
        <Case title="Модальное окно на stateless компоненте, которое принимает свойство show">
          <Case.Body data-tid="ModalWithStatelessComponentWithShowPropsCase">
            <Button data-tid="Open" onClick={() => this.setState({ showModalWithStatelessComp: true })}>
              Открыть
            </Button>
            <StatelessModal
              data-tid="Modal"
              show={this.state.showModalWithStatelessComp}
              onClose={() => this.setState({ showModalWithStatelessComp: false })}
            />
          </Case.Body>
        </Case>
        <Case title="Модальное окно на statefull компоненте, которое принимает свойство show">
          <Case.Body data-tid="ModalWithStatefullComponentWithShowPropsCase">
            <Button data-tid="Open" onClick={() => this.setState({ showModalWithStatefullComp: true })}>
              Открыть
            </Button>
            <StateFullModal
              data-tid="Modal"
              show={this.state.showModalWithStatefullComp}
              onClose={() => this.setState({ showModalWithStatefullComp: false })}
            />
          </Case.Body>
        </Case>
        <Case title="Модальное окно без компоненты">
          <Case.Body data-tid="ModalWithStatefullComponentWithShowPropsCase">
            <Button data-tid="Open" onClick={() => this.setState({ showModalWithoutComp: true })}>
              Открыть
            </Button>
            {this.state.showModalWithoutComp && (
              <Modal data-tid="ModalWithoutComp" onClose={() => this.setState({ showModalWithoutComp: false })}>
                <Modal.Header>Modal header</Modal.Header>
                <Modal.Body>
                  <div data-tid="Content">Modal content</div>
                </Modal.Body>
                <Modal.Footer panel>
                  <Button data-tid="Close" onClick={() => this.setState({ showModalWithoutComp: false })} use="primary">
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            )}
          </Case.Body>
        </Case>
      </CaseSuite>
    );
  }
}

function StatelessModal({ show, onClose }) {
  if (!show) {
    return <span />;
  }
  return (
    <Modal onClose={onClose}>
      <Modal.Header>Modal header</Modal.Header>
      <Modal.Body>
        <div data-tid="Content">Modal content</div>
      </Modal.Body>
      <Modal.Footer panel>
        <Button data-tid="Close" onClick={onClose} use="primary">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

class StateFullModal extends React.Component {
  render() {
    const { show, onClose } = this.props;
    if (!show) {
      return <span />;
    }
    return (
      <Modal onClose={onClose}>
        <Modal.Header>Modal header</Modal.Header>
        <Modal.Body>
          <div data-tid="Content">Modal content</div>
        </Modal.Body>
        <Modal.Footer panel>
          <Button data-tid="Close" onClick={onClose} use="primary">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

// @flow
import React from 'react';
import { storiesOf } from '@kadira/storybook';

import Modal from '../';
import Button from '../../Button';
import Toggle from '../../Toggle';

class ModalWithScrollableContent extends React.Component {
  state = {
    opened: false
  }

  render() {
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

  renderModal() {
    return (
      <Modal onClose={this.close}>
        <Modal.Header>Title</Modal.Header>
        <Modal.Body>
          <p>
            A lotta people ask me where the
            fuck I've been at the last few years.
          </p>

          <div>
            <Toggle
              checked={this.state.panel}
              onChange={() => this.setState(({ panel }) => ({ panel: !panel }))}
            /> Panel {this.state.panel ? 'enabled' : 'disabled'}
          </div>

        </Modal.Body>
        <Modal.Footer panel={this.state.panel}>
          <Button onClick={this.close}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  open = () => {
    this.setState({ opened: true });
  }

  close = () => {
    this.setState({ opened: false });
  }
}

storiesOf('Modal', module)
  .add('With scrollable parent content', () => (
    <ModalWithScrollableContent />
  ));

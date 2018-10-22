import * as React from 'react';
import Button from '../Button';
import Gapped from '../Gapped';
import Modal from '../Modal';
import { defaultTexts, FiasTexts } from './constants/texts';

interface FiasModalProps {
  texts?: FiasTexts;
  onClose?: () => any;
  onSave?: () => any;
}

export class FiasModal extends React.Component<FiasModalProps> {
  public static defaultProps = {
    onClose: () => null,
    onSave: () => null
  };

  private texts: FiasTexts = this.props.texts || defaultTexts;

  public render() {
    const { onClose, onSave, children } = this.props;
    return (
      <Modal width={500} onClose={onClose}>
        <Modal.Header>{this.texts.modal_title}</Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer panel>
          <Gapped>
            <Button size="medium" use="primary" onClick={onSave}>
              {this.texts.modal_button_ok}
            </Button>
            <Button size="medium" onClick={onClose}>
              {this.texts.modal_button_cancel}
            </Button>
          </Gapped>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default FiasModal;

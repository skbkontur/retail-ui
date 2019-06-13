import * as React from 'react';
import Button from '../Button';
import Gapped from '../Gapped';
import Modal from '../Modal';
import { FiasLocale } from './locale';

interface FiasModalProps {
  locale: FiasLocale;
  onClose?: () => any;
  onSave?: () => any;
}

export class FiasModal extends React.Component<FiasModalProps> {
  public static defaultProps = {
    onClose: () => null,
    onSave: () => null,
  };

  public render() {
    const { onClose, onSave, locale, children } = this.props;
    return (
      <Modal width={500} onClose={onClose}>
        <Modal.Header>{locale.modalTitle}</Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer panel>
          <Gapped>
            <Button size="medium" use="primary" onClick={onSave}>
              {locale.modalButtonOk}
            </Button>
            <Button size="medium" onClick={onClose}>
              {locale.modalButtonCancel}
            </Button>
          </Gapped>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default FiasModal;

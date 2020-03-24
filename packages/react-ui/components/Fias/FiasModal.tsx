import React from 'react';

import { Button } from '../Button';
import { Gapped } from '../Gapped';
import { Modal } from '../Modal';
import { locale } from '../../lib/locale/decorators';

import { FiasLocale, FiasLocaleHelper } from './locale';

interface FiasModalProps {
  onClose?: () => any;
  onSave?: () => any;
}

@locale('Fias', FiasLocaleHelper)
export class FiasModal extends React.Component<FiasModalProps> {
  public static __KONTUR_REACT_UI__ = 'FiasModal';

  public static defaultProps = {
    onClose: () => null,
    onSave: () => null,
  };

  private readonly locale!: FiasLocale;

  public render() {
    const { onClose, onSave, children } = this.props;
    return (
      <Modal width={500} onClose={onClose}>
        <Modal.Header>{this.locale.modalTitle}</Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer panel>
          <Gapped>
            <Button size="medium" use="primary" onClick={onSave}>
              {this.locale.modalButtonOk}
            </Button>
            <Button size="medium" onClick={onClose}>
              {this.locale.modalButtonCancel}
            </Button>
          </Gapped>
        </Modal.Footer>
      </Modal>
    );
  }
}

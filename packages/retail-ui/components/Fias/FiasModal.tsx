import * as React from 'react';
import Button from '../Button';
import Gapped from '../Gapped';
import Modal from '../Modal';

interface Props {
  title?: string;
  onClose?: () => any;
  onSave?: () => any;
}

export class FiasModal extends React.Component<Props> {
  public static defaultProps = {
    title: 'Адрес',
    onClose: () => null,
    onSave: () => null
  };

  public render() {
    const { title, onClose, onSave, children } = this.props;
    return (
      <Modal width={500} onClose={onClose}>
        <Modal.Header>{title}</Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer panel>
          <Gapped>
            <Button size="medium" use="primary" onClick={onSave}>
              Найти объект
            </Button>
            <Button size="medium" onClick={onClose}>
              Отменить
            </Button>
          </Gapped>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default FiasModal;

import Modal from './Modal.js';

const ModalAdapter = {
  close(inst: Modal) {
    // tslint:disable-next-line:no-string-literal
    inst['requestClose']();
  }
};

(Modal as any).__ADAPTER__ = ModalAdapter;

export default Modal;

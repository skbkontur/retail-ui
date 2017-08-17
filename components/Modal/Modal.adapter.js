// @flow

import Modal from './Modal.js';

const ModalAdapter = {
  close(inst) {
    inst._requestClose();
  }
};

// $FlowIssue
Modal.__ADAPTER__ = ModalAdapter;

export default Modal;

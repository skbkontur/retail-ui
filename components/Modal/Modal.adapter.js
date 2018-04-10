// @flow

import Modal from './Modal';

const ModalAdapter = {
  close(inst) {
    inst.requestClose();
  }
};

// $FlowIssue
Modal.__ADAPTER__ = ModalAdapter;

export default Modal;

// @flow

import Modal from './Modal.js';

class ModalAdapter {
  _instance: Modal;

  constructor(instance: Modal) {
    this._instance = instance;
  }

  close() {
    this._instance._handleClose();
  }
}

Modal.__ADAPTER__ = ModalAdapter;

export default Modal;
export * from './Modal.js';

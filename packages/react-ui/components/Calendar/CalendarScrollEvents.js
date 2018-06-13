// @flow

import { EventEmitter } from 'fbemitter';

let emitter;
function getEmitter() {
  if (!emitter) {
    emitter = new EventEmitter();
  }
  return emitter;
}

function addListener(callback: () => void) {
  const emitter = getEmitter();
  const token = emitter.addListener('CalendarScroll', callback);
  return {
    remove() {
      token.remove();
    }
  };
}

function emit() {
  getEmitter().emit('CalendarScroll');
}

export default {
  addListener,
  emit
};

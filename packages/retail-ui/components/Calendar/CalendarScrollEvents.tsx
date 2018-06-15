import { EventEmitter } from 'fbemitter';

let emitterCache: EventEmitter;
function getEmitter() {
  if (!emitterCache) {
    emitterCache = new EventEmitter();
  }
  return emitterCache;
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

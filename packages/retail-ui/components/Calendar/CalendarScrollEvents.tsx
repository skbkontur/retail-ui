import EventEmitter from 'eventemitter3';

let emitterCache: EventEmitter;
function getEmitter() {
  if (!emitterCache) {
    emitterCache = new EventEmitter();
  }
  return emitterCache;
}

function addListener(callback: () => void) {
  const emitter = getEmitter();
  emitter.addListener('CalendarScroll', callback);
  return {
    remove() {
      emitter.removeListener('CalendarScroll', callback);
    },
  };
}

function emit() {
  getEmitter().emit('CalendarScroll');
}

export default {
  addListener,
  emit,
};

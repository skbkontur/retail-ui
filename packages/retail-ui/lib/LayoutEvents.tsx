import EventEmitter from 'eventemitter3';
import { unstable_batchedUpdates } from 'react-dom';

let emitterCache: EventEmitter;
function getEmitter() {
  if (!emitterCache) {
    emitterCache = new EventEmitter();
  }
  return emitterCache;
}

function listenBrowserEvents() {
  window.addEventListener('scroll', emit);
  window.addEventListener('resize', emit);
}

function unlistenBrowserEvents() {
  window.removeEventListener('scroll', emit);
  window.removeEventListener('resize', emit);
}

function addListener(callback: () => void) {
  const emitter = getEmitter();
  if (emitter.listeners('layout').length === 0) {
    listenBrowserEvents();
  }
  emitter.addListener('layout', callback);
  return {
    remove() {
      emitter.removeListener('layout', callback);
      if (emitter.listeners('layout').length === 0) {
        unlistenBrowserEvents();
      }
    },
  };
}

function emit() {
  unstable_batchedUpdates(() => {
    getEmitter().emit('layout');
  });
}

export default {
  addListener,
  emit,
};

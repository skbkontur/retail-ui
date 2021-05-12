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
  window.addEventListener('scroll', emit, { capture: true });
  window.addEventListener('resize', emit, { capture: true });
}

function unlistenBrowserEvents() {
  window.removeEventListener('scroll', emit, { capture: true });
  window.removeEventListener('resize', emit, { capture: true });
}

export function addListener(callback: () => void) {
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

export function emit() {
  unstable_batchedUpdates(() => {
    getEmitter().emit('layout');
  });
}

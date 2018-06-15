import events from 'add-event-listener';
import { EventEmitter } from 'fbemitter';
import { unstable_batchedUpdates } from 'react-dom';

let emitterCache: EventEmitter;
function getEmitter() {
  if (!emitterCache) {
    emitterCache = new EventEmitter();
  }
  return emitterCache;
}

function listenBrowserEvents() {
  events.addEventListener(window, 'scroll', emit);
  events.addEventListener(window, 'resize', emit);
}

function unlistenBrowserEvents() {
  events.removeEventListener(window, 'scroll', emit);
  events.removeEventListener(window, 'resize', emit);
}

function addListener(callback: () => void) {
  const emitter = getEmitter();
  if (emitter.listeners('layout').length === 0) {
    listenBrowserEvents();
  }
  const token = emitter.addListener('layout', callback);
  return {
    remove() {
      token.remove();
      if (emitter.listeners('layout').length === 0) {
        unlistenBrowserEvents();
      }
    }
  };
}

function emit() {
  unstable_batchedUpdates(() => {
    getEmitter().emit('layout');
  });
}

export default {
  addListener,
  emit
};

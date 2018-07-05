import { EventEmitter } from 'fbemitter';
import { unstable_batchedUpdates } from 'react-dom';

let globalEmitter: EventEmitter;
function getEmitter() {
  if (!globalEmitter) {
    globalEmitter = new EventEmitter();
  }
  return globalEmitter;
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

// @flow

import events from 'add-event-listener';
import { EventEmitter } from 'fbemitter';

let emitter;
function getEmitter() {
  if (!emitter) {
    emitter = new EventEmitter();
  }
  return emitter;
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
  // TODO: Use ReactDOM.unstable_batchedUpdates() when we drop react 0.13
  // support.
  getEmitter().emit('layout');
}

export default {
  addListener,
  emit
};

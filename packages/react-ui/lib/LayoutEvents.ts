import EventEmitter from 'eventemitter3';
import { unstable_batchedUpdates } from 'react-dom';

import type { GlobalObject } from '../lib/globalObject';

let emitterCache: EventEmitter;
function getEmitter() {
  if (!emitterCache) {
    emitterCache = new EventEmitter();
  }
  return emitterCache;
}

function listenBrowserEvents(globalObject: GlobalObject) {
  globalObject.addEventListener?.('scroll', emit, { capture: true });
  globalObject.addEventListener?.('resize', emit, { capture: true });
}

function unlistenBrowserEvents(globalObject: GlobalObject) {
  globalObject.removeEventListener?.('scroll', emit, { capture: true });
  globalObject.removeEventListener?.('resize', emit, { capture: true });
}

export function addListener(callback: () => void, globalObject: GlobalObject) {
  const emitter = getEmitter();
  if (emitter.listeners('layout').length === 0) {
    listenBrowserEvents(globalObject);
  }
  emitter.addListener('layout', callback);
  return {
    remove() {
      emitter.removeListener('layout', callback);
      if (emitter.listeners('layout').length === 0) {
        unlistenBrowserEvents(globalObject);
      }
    },
  };
}

export function emit() {
  unstable_batchedUpdates(() => {
    getEmitter().emit('layout');
  });
}

import { EventEmitter } from 'eventemitter3';

let emitterCache: EventEmitter;
function getEmitter(): EventEmitter {
  if (!emitterCache) {
    emitterCache = new EventEmitter();
  }
  return emitterCache;
}

export function addListener(callback: () => void): { remove: () => void } {
  const emitter = getEmitter();
  emitter.addListener('CalendarScroll', callback);
  return {
    remove() {
      emitter.removeListener('CalendarScroll', callback);
    },
  };
}

export function emit(): void {
  getEmitter().emit('CalendarScroll');
}

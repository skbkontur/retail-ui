import { canUseDOM, canUseMatchMedia } from '../../lib/client';

interface mediaQueryData {
  mql: MediaQueryList;
  listeners: Array<(e: MediaQueryListEvent) => void>;
}

export interface listenerToken {
  remove: () => void;
}

export const eventListenersMap = new Map<string, mediaQueryData>();

export function addResponsiveLayoutListener(
  mediaQuery: string,
  callback: (e: MediaQueryListEvent) => void,
): listenerToken {
  if (eventListenersMap.has(mediaQuery)) {
    addCallbackToMQListener(mediaQuery, callback);
  } else {
    createMQListener(mediaQuery, callback);
  }

  return {
    remove() {
      removeCallbackFromMQListener(mediaQuery, callback);
    },
  };
}

function addCallbackToMQListener(mediaQuery: string, callback: (e: MediaQueryListEvent) => void) {
  const eventListener = eventListenersMap.get(mediaQuery);

  if (eventListener) {
    eventListenersMap.set(mediaQuery, {
      ...eventListener,
      listeners: [...eventListener.listeners, callback],
    });
  }
}

function createMQListener(mediaQuery: string, callback: (e: MediaQueryListEvent) => void) {
  if (!canUseMatchMedia) {
    return;
  }

  const mql = window.matchMedia(mediaQuery);
  const newMediaQueryInfo: mediaQueryData = { mql, listeners: [callback] };

  eventListenersMap.set(mediaQuery, newMediaQueryInfo);
  if (mql.addEventListener) {
    mql.addEventListener('change', changeCallback);
  } else {
    mql.addListener(changeCallback);
  }
}

function removeCallbackFromMQListener(mediaQuery: string, callback: (e: MediaQueryListEvent) => void) {
  if (eventListenersMap.has(mediaQuery)) {
    const eventListener = eventListenersMap.get(mediaQuery);

    if (eventListener) {
      const newListeners = eventListener.listeners.filter((listener) => listener !== callback);

      if (newListeners.length === 0) {
        if (eventListener.mql.removeEventListener) {
          eventListener.mql.removeEventListener('change', changeCallback);
        } else {
          eventListener.mql.removeListener(changeCallback);
        }
        eventListenersMap.delete(mediaQuery);
        return;
      }

      eventListenersMap.set(mediaQuery, {
        ...eventListener,
        listeners: [...newListeners],
      });
    }
  }
}

export function checkMatches(mediaQuery: string) {
  if (!canUseDOM || !canUseMatchMedia) {
    return false;
  }

  if (!eventListenersMap.has(mediaQuery)) {
    return window.matchMedia(mediaQuery).matches;
  }

  const eventListener = eventListenersMap.get(mediaQuery);
  return eventListener!.mql.matches;
}

function changeCallback(e: MediaQueryListEvent) {
  const eventListener = eventListenersMap.get(e.media);

  if (eventListener) {
    eventListener.listeners.forEach((listener) => {
      listener(e);
    });
  }
}

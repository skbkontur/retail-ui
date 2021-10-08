interface mediaQueryData {
  mql: MediaQueryList;
  listeners: { id: object; callback: (e: MediaQueryListEvent) => void }[];
}

export const eventListenersMap = new Map<string, mediaQueryData>();

export function addResponsiveLayoutListener(
  mediaQuery: string,
  classInstance: object,
  callback: (e: MediaQueryListEvent) => void,
): void {
  if (!eventListenersMap.has(mediaQuery)) {
    const mql = window.matchMedia(mediaQuery);
    const newMediaQueryInfo: mediaQueryData = { mql, listeners: [{ id: classInstance, callback }] };

    eventListenersMap.set(mediaQuery, newMediaQueryInfo);
    eventListenersMap.get(mediaQuery)?.mql.addEventListener('change', changeCallback);
  } else {
    const eventListener = eventListenersMap.get(mediaQuery);

    if (eventListener) {
      eventListenersMap.set(mediaQuery, {
        ...eventListener,
        listeners: [...eventListener.listeners, { id: classInstance, callback }],
      });
    }
  }
}

export function removeResponsiveLayoutListener(mediaQuery: string, classInstance: object): void {
  if (eventListenersMap.has(mediaQuery)) {
    const eventListener = eventListenersMap.get(mediaQuery);

    if (eventListener) {
      const newListeners = eventListener.listeners.filter((listener) => listener.id !== classInstance);

      if (newListeners.length === 0) {
        eventListener.mql.removeEventListener('change', changeCallback);
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

export function getMatches(mediaQuery: string) {
  if (!eventListenersMap.has(mediaQuery)) {
    return undefined;
  } else {
    const eventListener = eventListenersMap.get(mediaQuery);

    return eventListener?.mql.matches;
  }
}

function changeCallback(e: MediaQueryListEvent) {
  const eventListener = eventListenersMap.get(e.media);

  if (eventListener) {
    eventListener.listeners.forEach((listener) => {
      listener.callback(e);
    });
  }
}

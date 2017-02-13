// @flow

import events from 'add-event-listener';
import ReactDOM from 'react-dom';

const handlers = [];

events.addEventListener(document.body, 'focusin', handleNativeFocus);

function handleNativeFocus(event: UIEvent) {
  const target: Element = ((event.target || event.srcElement): any);
  handlers.forEach((handler) => {
    let elements = handler.elements;
    if (typeof elements === 'function') {
      elements = elements();
    }

    for (const element of elements) {
      if (element && element.contains(target)) {
        return;
      }
    }
    ReactDOM.unstable_batchedUpdates(handler.callback);
  });
}

function listen(
  elements: Array<HTMLElement> | () => Array<HTMLElement>,
  callback: () => void
) {
  const handler = {
    elements,
    callback
  };
  handlers.push(handler);

  return {
    remove() {
      const index = handlers.indexOf(handler);
      if (index > -1) {
        handlers.splice(index, 1);
      }
    }
  };
}

export default listen;

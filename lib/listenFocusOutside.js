// @flow

import events from 'add-event-listener';
import ReactDOM from 'react-dom';

const handlers = [];

events.addEventListener(document.body, 'focusin', handleNativeFocus);

function handleNativeFocus(event: UIEvent) {
  const target: HTMLElement = ((event.target || event.srcElement): any);
  handlers.forEach((handler) => {
    let elements = handler.elements;
    if (typeof elements === 'function') {
      elements = elements();
    }

    if (elements.some(containsTargetOrTargetContainer(target))) {
      return;
    }
    ReactDOM.unstable_batchedUpdates(handler.callback);
  });
}

export function containsTargetOrTargetContainer(target: HTMLElement) {
  return (element: HTMLElement) => {
    if (!element) {
      return false;
    }
    if (element.contains(target)) {
      return true;
    }
    const container = findRenderContainer(target, element);
    return !!container && element.contains(container);
  };
}

function findRenderContainer(
  node: HTMLElement,
  rootNode = document.body,
  container?: HTMLElement
): ?HTMLElement {
  const currentNode: HTMLElement = (node: any).parentElement;

  if (!currentNode || currentNode === rootNode) {
    return container ? container : null;
  }

  const newContainerId = currentNode.dataset.renderedContainerId;
  if (newContainerId) {
    const nextNode = document
      .querySelector(`noscript[data-render-container-id="${newContainerId}"]`);

    if (!nextNode) {
      throw Error(
        `Container with id ${newContainerId} root node was not found`
      );
    }

    return findRenderContainer(nextNode, rootNode, nextNode);
  }

  return findRenderContainer(currentNode, rootNode, container);
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

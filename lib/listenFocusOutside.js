// @flow

import events from 'add-event-listener';
import ReactDOM from 'react-dom';

const handlers = [];

function addHandleEvent() {
  events.addEventListener(document.body, 'focusin', handleNativeFocus);
}

if (document.readyState === 'complete') {
  addHandleEvent();
} else {
  events.addEventListener(window, 'load', addHandleEvent);
}

function handleNativeFocus(event: UIEvent) {
  const target: HTMLElement = (event.target || event.srcElement: any);
  handlers.forEach(handler => {
    let elements = handler.elements;
    if (typeof elements === 'function') {
      elements = elements();
    }

    if (elements.some(containsTargetOrRenderContainer(target))) {
      return;
    }
    ReactDOM.unstable_batchedUpdates(handler.callback);
  });
}

export function containsTargetOrRenderContainer(target: HTMLElement) {
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

/**
 * Searches RenderContainer placed in "rootNode" for "node"
 */
function findRenderContainer(
  node: HTMLElement,
  rootNode: HTMLElement,
  container?: HTMLElement
): ?HTMLElement {
  const currentNode: HTMLElement = (node: any).parentElement;
  if (
    !currentNode || currentNode === rootNode || currentNode === document.body
  ) {
    return container ? container : null;
  }

  const newContainerId = currentNode.getAttribute('data-rendered-container-id');
  if (newContainerId) {
    const nextNode = document.querySelector(
      `noscript[data-render-container-id="${newContainerId}"]`
    );

    if (!nextNode) {
      throw Error(
        `Origin node for container with id ${newContainerId} was not found`
      );
    }

    return findRenderContainer(nextNode, rootNode, nextNode);
  }

  return findRenderContainer(currentNode, rootNode, container);
}

function listen(
  elements: Array<HTMLElement> | (() => Array<HTMLElement>),
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

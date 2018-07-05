import debounce from 'lodash.debounce';
import ReactDOM from 'react-dom';

export interface Handler {
  elements: HTMLElement[] | (() => HTMLElement[]);
  callback: (event: Event) => void;
}

const isFF = navigator.userAgent.indexOf('Firefox') > -1;

const handlers: Handler[] = [];

function addHandleEvent() {
  /**
   * Firefox do not supports 'focusin' event.
   * Focus events bubbles multiple time
   * without possibilty to cancell bubbling.
   * Using debounce to capture only first focus event
   * Mozilla Firefix
   *   ¯\_(ツ)_/¯
   */
  document.body.addEventListener(
    isFF ? 'focus' : 'focusin',
    isFF ? debounce(handleNativeFocus, 0, { leading: true, trailing: false }) : handleNativeFocus,
    isFF
  );
}

if (document.readyState === 'complete') {
  addHandleEvent();
} else {
  window.addEventListener('load', addHandleEvent);
}

function handleNativeFocus(event: Event) {
  const target = (event.target as HTMLElement) || (event.srcElement as HTMLElement);

  handlers.forEach(handler => {
    let elements = handler.elements;
    if (typeof elements === 'function') {
      elements = elements();
    }

    if (elements.some(containsTargetOrRenderContainer(target))) {
      return;
    }

    ReactDOM.unstable_batchedUpdates(() => handler.callback(event));
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
): HTMLElement | null {
  const currentNode: HTMLElement | null = node.parentElement;
  if (!currentNode || currentNode === rootNode || currentNode === document.body) {
    return container ? container : null;
  }

  const newContainerId = currentNode.getAttribute('data-rendered-container-id');
  if (newContainerId) {
    const nextNode = document.querySelector(
      `noscript[data-render-container-id="${newContainerId}"]`
    ) as HTMLElement;

    if (!nextNode) {
      throw Error(`Origin node for container with id ${newContainerId} was not found`);
    }

    return findRenderContainer(nextNode, rootNode, nextNode);
  }

  return findRenderContainer(currentNode, rootNode, container);
}

function listen(elements: Handler['elements'], callback: Handler['callback']) {
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

import events from 'add-event-listener';
import ReactDOM from 'react-dom';
import debounce from 'lodash.debounce';

const isFF = Boolean(~navigator.userAgent.indexOf('Firefox'));

interface FocusOutsideEventHandler {
  elements: HTMLElement[] | (() => HTMLElement[]);
  callback: (event: Event) => void;
}

const handlers: FocusOutsideEventHandler[] = [];

function addHandleEvent() {
  /**
   * Firefox do not supports 'focusin' event.
   * Focus events bubbles multiple time
   * without possibilty to cancell bubbling.
   * Using debounce to capture only first focus event
   * Mozilla Firefix
   *   ¯\_(ツ)_/¯
   */
  events.addEventListener(
    document.body,
    isFF ? 'focus' : ('focusin' as 'focus'),
    isFF
      ? debounce(handleNativeFocus, 0, { leading: true, trailing: false })
      : handleNativeFocus,
    isFF
  );
}

if (document.readyState === 'complete') {
  addHandleEvent();
} else {
  events.addEventListener(window, 'load', addHandleEvent);
}

function handleNativeFocus(event: UIEvent) {
  // FIXME: not safe casting
  const target: HTMLElement = (event.target || event.srcElement) as HTMLElement;

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
  node: Element,
  rootNode: Element,
  container?: Element
): Element | null {
  const currentNode: Element = node;
  if (
    !currentNode ||
    currentNode === rootNode ||
    currentNode === document.body
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
  elements: HTMLElement[] | (() => HTMLElement[]),
  callback: (event: Event) => void
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

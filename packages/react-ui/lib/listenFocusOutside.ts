import ReactDOM from 'react-dom';
import debounce from 'lodash.debounce';
import warning from 'warning';

import { PORTAL_INLET_ATTR, PORTAL_OUTLET_ATTR } from '../internal/RenderContainer/index.js';
import { getOwnerGlobalObject } from '../lib/globalObject.js';
import type { GlobalObject } from '../lib/globalObject.js';

import { isInstanceOf } from './isInstanceOf.js';
import { isFirefox } from './client.js';

interface FocusOutsideEventHandler {
  elements: Element[] | (() => Element[]);
  callback: (event: Event) => void;
}

const handlers: FocusOutsideEventHandler[] = [];
const listenersAttached = new WeakSet<GlobalObject>();

function addHandleEvent(globalObject: GlobalObject) {
  /**
   * Firefox do not supports 'focusin' event.
   * Focus events bubbles multiple time
   * without possibilty to cancell bubbling.
   * Using debounce to capture only first focus event
   * Mozilla Firefix
   *   ¯\_(ツ)_/¯
   */
  globalObject.document?.body.addEventListener(
    isFirefox ? 'focus' : ('focusin' as 'focus'),
    isFirefox ? debounce(handleNativeFocus, 0, { leading: true, trailing: false }) : handleNativeFocus,
    { capture: true },
  );
}
function addFocusListener(globalObject: GlobalObject) {
  if (listenersAttached.has(globalObject)) {
    return;
  }

  if (globalObject.document?.readyState === 'complete') {
    addHandleEvent(globalObject);
  } else {
    globalObject.addEventListener?.('load', () => addHandleEvent(globalObject));
  }

  listenersAttached.add(globalObject);
}

function handleNativeFocus(event: UIEvent) {
  // FIXME: not safe casting
  const target: Element = (event.target || event.srcElement) as Element;

  handlers.forEach((handler) => {
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

export function containsTargetOrRenderContainer(target: Element) {
  return (element: Element) => {
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
export function findRenderContainer(node: Element, rootNode: Element, container?: Element): Element | null {
  const currentNode = node.parentNode;
  const globalObject = getOwnerGlobalObject(node);
  if (
    !currentNode ||
    node === rootNode ||
    currentNode === rootNode ||
    currentNode === globalObject.document?.body ||
    currentNode === globalObject.document?.documentElement ||
    !isInstanceOf(currentNode, globalObject.Element)
  ) {
    return container ? container : null;
  }

  const newContainerId = currentNode.getAttribute(PORTAL_OUTLET_ATTR);
  if (newContainerId) {
    const nextNode = globalObject.document?.querySelector(`[${PORTAL_INLET_ATTR}~="${newContainerId}"]`);

    if (!nextNode) {
      warning(false, `Origin node for render container was not found`);
      return null;
    }

    return findRenderContainer(nextNode, rootNode, nextNode);
  }

  return findRenderContainer(currentNode, rootNode, container);
}

export function listen(
  elements: Element[] | (() => Element[]),
  callback: (event: Event) => void,
  globalObject: GlobalObject,
) {
  addFocusListener(globalObject);

  const handler = {
    elements,
    callback,
  };
  handlers.push(handler);

  return {
    remove() {
      const index = handlers.indexOf(handler);
      if (index > -1) {
        handlers.splice(index, 1);
      }
    },
  };
}

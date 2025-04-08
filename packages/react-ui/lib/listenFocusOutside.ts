import ReactDOM from 'react-dom';
import debounce from 'lodash.debounce';
import { globalObject } from '@skbkontur/global-object';

import { PORTAL_INLET_ATTR, PORTAL_OUTLET_ATTR } from '../internal/RenderContainer';

import { isInstanceOf } from './isInstanceOf';
import { isFirefox } from './client';

interface FocusOutsideEventHandler {
  elements: Element[] | (() => Element[]);
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
  globalObject.document?.body.addEventListener(
    isFirefox ? 'focus' : ('focusin' as 'focus'),
    isFirefox ? debounce(handleNativeFocus, 0, { leading: true, trailing: false }) : handleNativeFocus,
    { capture: true },
  );
}

if (globalObject.document?.readyState === 'complete') {
  addHandleEvent();
} else {
  globalObject.addEventListener?.('load', addHandleEvent);
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
    const selector = `[${PORTAL_INLET_ATTR}~="${newContainerId}"]`;
    const nextNode =
      (rootNode.getRootNode() as ShadowRoot | Document)?.querySelector(selector) ||
      globalObject.document?.querySelector(selector);

    if (!nextNode) {
      throw Error(`Origin node for render container was not found`);
    }

    return findRenderContainer(nextNode, rootNode, nextNode);
  }

  return findRenderContainer(currentNode, rootNode, container);
}

export function listen(elements: Element[] | (() => Element[]), callback: (event: Event) => void) {
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

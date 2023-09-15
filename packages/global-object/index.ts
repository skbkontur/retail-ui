import { GlobalObject } from './types';

export let globalObject: GlobalObject =
  (typeof window === 'object' && window) ||
  (typeof globalThis === 'object' && globalThis) ||
  (typeof global === 'object' && global) ||
  Function('return this')();

export const setWindow = (win: Window) => (globalObject = win as GlobalObject);

export const isBrowser = (obj: unknown): obj is GlobalObject['window'] => {
  return typeof window !== 'undefined' && obj === globalObject;
};

export function isElement(el: unknown): el is Element {
  if (globalObject.Element) {
    return el instanceof globalObject.Element;
  }

  return false;
}

export function isHTMLElement(el: unknown): el is HTMLElement {
  if (globalObject.HTMLElement) {
    return el instanceof globalObject.HTMLElement;
  }

  return false;
}

export function isHTMLInputElement(el: unknown): el is HTMLInputElement {
  if (globalObject.HTMLInputElement) {
    return el instanceof globalObject.HTMLInputElement;
  }

  return false;
}

export function isNode(node: unknown): node is Node {
  if (globalObject.Node) {
    return node instanceof globalObject.Node;
  }

  return false;
}

export function isTouchEvent(node: unknown): node is TouchEvent {
  if (globalObject.TouchEvent) {
    return node instanceof globalObject.TouchEvent;
  }

  return false;
}

export function isWheelEvent(node: unknown): node is WheelEvent {
  if (globalObject.WheelEvent) {
    return node instanceof globalObject.WheelEvent;
  }

  return false;
}

export function isMouseEvent(node: unknown): node is MouseEvent {
  if (globalObject.MouseEvent) {
    return node instanceof globalObject.MouseEvent;
  }

  return false;
}

export function isKeyboardEvent(node: unknown): node is KeyboardEvent {
  if (globalObject.KeyboardEvent) {
    return node instanceof globalObject.KeyboardEvent;
  }

  return false;
}

// eslint-disable-next-line import/no-default-export
export { default } from './lib';

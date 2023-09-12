/* eslint-disable no-undef */
import { Upgrade } from './Upgrades';

export const isBrowser = (globalObject: unknown): globalObject is typeof globalThis => {
  return typeof window !== 'undefined' && globalObject === Upgrade.getWindow();
};

export const globalThat: Partial<typeof globalThis> & NodeJS.Global =
  Upgrade.getWindow() ||
  (typeof globalThis === 'object' && globalThis) ||
  (typeof global === 'object' && global) ||
  Function('return this')();

export function isElement(el: unknown): el is Element {
  if (globalThat.Element) {
    return el instanceof globalThat.Element;
  }

  return false;
}

export function isHTMLElement(el: unknown): el is HTMLElement {
  if (globalThat.HTMLElement) {
    return el instanceof globalThat.HTMLElement;
  }

  return false;
}

export function isHTMLInputElement(el: unknown): el is HTMLInputElement {
  if (globalThat.HTMLInputElement) {
    return el instanceof globalThat.HTMLInputElement;
  }

  return false;
}

export function isNode(node: unknown): node is Node {
  if (globalThat.Node) {
    return node instanceof globalThat.Node;
  }

  return false;
}

export function isTouchEvent(node: unknown): node is TouchEvent {
  if (globalThat.TouchEvent) {
    return node instanceof globalThat.TouchEvent;
  }

  return false;
}

export function isWheelEvent(node: unknown): node is WheelEvent {
  if (globalThat.WheelEvent) {
    return node instanceof globalThat.WheelEvent;
  }

  return false;
}

export function isMouseEvent(node: unknown): node is MouseEvent {
  if (globalThat.MouseEvent) {
    return node instanceof globalThat.MouseEvent;
  }

  return false;
}

export function isKeyboardEvent(node: unknown): node is KeyboardEvent {
  if (globalThat.KeyboardEvent) {
    return node instanceof globalThat.KeyboardEvent;
  }

  return false;
}

type _Element = Element;
type _SVGElement = SVGElement;
type _SVGSVGElement = SVGSVGElement;
type _HTMLElement = HTMLElement;
type _HTMLOrSVGElement = HTMLOrSVGElement;
type _HTMLButtonElement = HTMLButtonElement;
type _HTMLInputElement = HTMLInputElement;
type _HTMLSpanElement = HTMLSpanElement;
type _HTMLDivElement = HTMLDivElement;
type _HTMLTextAreaElement = HTMLTextAreaElement;
type _HTMLLabelElement = HTMLLabelElement;
type _HTMLIFrameElement = HTMLIFrameElement;
type _HTMLAnchorElement = HTMLAnchorElement;
type _EventTarget = EventTarget;
type _Event = Event;
type _UIEvent = UIEvent;
type _KeyboardEvent = KeyboardEvent;
type _MouseEvent = MouseEvent;
type _FocusEvent = FocusEvent;
type _MediaQueryListEvent = MediaQueryListEvent;
type _MediaQueryList = MediaQueryList;
type _DOMRect = DOMRect;
type _CSSStyleDeclaration = CSSStyleDeclaration;
type _Window = Window;
type _Document = Document;
type _File = File;
type _FileList = FileList;
type _ReadableStream = ReadableStream;
type _Blob = Blob;
type _EventListener = EventListener;
type _MutationObserver = MutationObserver;

export type Timeout = NodeJS.Timeout;
export type {
  _Element as Element,
  _SVGElement as SVGElement,
  _SVGSVGElement as SVGSVGElement,
  _HTMLElement as HTMLElement,
  _HTMLOrSVGElement as HTMLOrSVGElement,
  _HTMLDivElement as HTMLDivElement,
  _HTMLTextAreaElement as HTMLTextAreaElement,
  _HTMLLabelElement as HTMLLabelElement,
  _HTMLButtonElement as HTMLButtonElement,
  _HTMLInputElement as HTMLInputElement,
  _HTMLSpanElement as HTMLSpanElement,
  _HTMLIFrameElement as HTMLIFrameElement,
  _HTMLAnchorElement as HTMLAnchorElement,
  _EventTarget as EventTarget,
  _Event as Event,
  _UIEvent as UIEvent,
  _KeyboardEvent as KeyboardEvent,
  _MouseEvent as MouseEvent,
  _FocusEvent as FocusEvent,
  _MediaQueryListEvent as MediaQueryListEvent,
  _MediaQueryList as MediaQueryList,
  _DOMRect as DOMRect,
  _CSSStyleDeclaration as CSSStyleDeclaration,
  _Window as Window,
  _Document as Document,
  _File as File,
  _FileList as FileList,
  _ReadableStream as ReadableStream,
  _Blob as Blob,
  _EventListener as EventListener,
  _MutationObserver as MutationObserver,
};

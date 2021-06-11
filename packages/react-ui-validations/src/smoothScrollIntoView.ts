import { Nullable, Omit } from '../typings/Types';

import { ScrollOffset } from './ValidationContainer';
import { isBrowser } from './utils';

export async function smoothScrollIntoView(element: HTMLElement, scrollOffset: ScrollOffset): Promise<void> {
  const scrollableParent = findScrollableParent(element);
  const parentRects = scrollableParent.getBoundingClientRect();
  const clientRects = element.getBoundingClientRect();

  const topOffset = scrollOffset.top || 0;
  const bottomOffset = scrollOffset.bottom || 0;

  if (scrollableParent === document.body) {
    const html = document.documentElement || { clientHeight: 0, clientWidth: 0 };
    const viewportHeight = window.innerHeight || html.clientHeight;
    const viewportWidth = window.innerWidth || html.clientWidth;

    const isElementInViewport =
      clientRects.top >= topOffset &&
      clientRects.left >= 0 &&
      clientRects.bottom <= viewportHeight - bottomOffset &&
      clientRects.right <= viewportWidth;

    if (isElementInViewport) {
      return;
    }

    await scrollBy({
      left: clientRects.left,
      top: clientRects.top - topOffset,
    });
  } else {
    if (clientRects.top - topOffset + 50 > parentRects.top && clientRects.bottom < parentRects.bottom) {
      return;
    }

    await smoothScroll(
      scrollableParent,
      scrollableParent.scrollLeft + clientRects.left - parentRects.left,
      scrollableParent.scrollTop + clientRects.top - parentRects.top - topOffset,
    );
    await scrollBy({
      left: parentRects.left,
      top: parentRects.top,
    });
  }
}

function smoothScroll(element: HTMLElement, x: number, y: number): Promise<void> {
  let context: Omit<StepContent, 'resolve'>;
  if (element === getDocumentBodyStrict()) {
    context = {
      scrollable: (window as any) as HTMLElement,
      startX: window.scrollX || window.pageXOffset,
      startY: window.scrollY || window.pageYOffset,
      method: scrollWindow,
      startTime: now(),
      x,
      y,
    };
  } else {
    context = {
      scrollable: element,
      startX: element.scrollLeft,
      startY: element.scrollTop,
      method: scrollElement,
      startTime: now(),
      x,
      y,
    };
  }

  return new Promise(resolve => step({ ...context, resolve }));
}

interface StepContent {
  scrollable: HTMLElement;
  startTime: number;
  startX: number;
  startY: number;
  x: number;
  y: number;
  method: (element: Element, x: number, y: number) => void;
  resolve: () => void;
}

function step(context: StepContent) {
  const time = now();
  const elapsed = Math.min(1, (time - context.startTime) / ScrollTime);
  const value = ease(elapsed);

  const currentX = context.startX + (context.x - context.startX) * value;
  const currentY = context.startY + (context.y - context.startY) * value;

  context.method(context.scrollable, currentX, currentY);

  if (currentX !== context.x || currentY !== context.y) {
    window.requestAnimationFrame(() => step(context));
  } else {
    context.resolve();
  }
}

const ScrollTime = 468;

const scrollWindow = isBrowser
  ? typeof window.scroll === 'function'
    ? (_: any, x: number, y: number) => window.scroll(x, y)
    : (_: any, x: number, y: number) => window.scrollTo(x, y)
  : () => undefined;

const now =
  isBrowser && window.performance && window.performance.now
    ? window.performance.now.bind(window.performance)
    : Date.now;

function scrollElement(element: Element, x: number, y: number) {
  element.scrollLeft = x;
  element.scrollTop = y;
}

function ease(time: number): number {
  return 0.5 * (1 - Math.cos(Math.PI * time));
}

function getDocumentBodyStrict(): HTMLElement {
  if (document.body == null) {
    throw new Error('Scrolling can be used only in browser');
  }
  return document.body;
}

function findScrollableParent(el: HTMLElement): HTMLElement {
  let isBody: Nullable<boolean>;
  let hasScrollableSpace: Nullable<boolean>;
  let hasVisibleOverflow: Nullable<boolean>;
  let currentElement: HTMLElement = el;
  do {
    if (currentElement.parentElement == null || !(currentElement.parentElement instanceof HTMLElement)) {
      return getDocumentBodyStrict();
    }
    currentElement = currentElement.parentElement;
    isBody = currentElement === document.body;
    hasScrollableSpace =
      currentElement.clientHeight < currentElement.scrollHeight ||
      currentElement.clientWidth < currentElement.scrollWidth;
    hasVisibleOverflow = window.getComputedStyle(currentElement, null).overflow === 'visible';
  } while (!isBody && !(hasScrollableSpace && !hasVisibleOverflow));

  isBody = null;
  hasScrollableSpace = null;
  hasVisibleOverflow = null;

  return currentElement;
}

function scrollBy({ left, top }: { left: number; top: number }): Promise<void> {
  return smoothScroll(
    getDocumentBodyStrict(),
    Math.floor(left) + (window.scrollX || window.pageXOffset),
    Math.floor(top) + (window.scrollY || window.pageYOffset),
  );
}

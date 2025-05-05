import type { Nullable, Omit } from '../typings/Types';

import type { ScrollOffset } from './ValidationContainer';
import { getDoc, getWin, isBrowser, isElement } from './utils/utils';
import { isNullable } from './utils/isNullable';

export async function smoothScrollIntoView(element: Element, scrollOffset: ScrollOffset): Promise<void> {
  const activeDocument = getDoc(element);
  const activeWindow = getWin(element);
  const scrollableParent = findScrollableParent(element);
  const parentRects = scrollableParent.getBoundingClientRect();
  const clientRects = element.getBoundingClientRect();

  const topOffset = scrollOffset.top || 0;
  const bottomOffset = scrollOffset.bottom || 0;

  if (scrollableParent === activeDocument.body) {
    const html = activeDocument.documentElement || { clientHeight: 0, clientWidth: 0 };
    const viewportHeight = activeWindow?.innerHeight || html.clientHeight;
    const viewportWidth = activeWindow?.innerWidth || html.clientWidth;

    const isElementInViewport =
      clientRects.top >= topOffset &&
      clientRects.left >= 0 &&
      clientRects.bottom <= viewportHeight - bottomOffset &&
      clientRects.right <= viewportWidth;

    if (isElementInViewport) {
      return;
    }

    await scrollBy({
      element,
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
      element,
      left: parentRects.left,
      top: parentRects.top,
    });
  }
}

function smoothScroll(element: Element, x: number, y: number): Promise<void> {
  const activeDocument = getDoc(element);
  const activeWindow = getWin(element);
  let context: Omit<StepContent, 'resolve'>;

  if (activeWindow) {
    if (element === getDocumentBodyStrict(activeDocument)) {
      context = {
        scrollable: element,
        startX: activeWindow.scrollX || activeWindow.pageXOffset,
        startY: activeWindow.scrollY || activeWindow.pageYOffset,
        method: getScrollWindow(element),
        startTime: getNow(element)(),
        x,
        y,
      };
    } else {
      context = {
        scrollable: element,
        startX: element.scrollLeft,
        startY: element.scrollTop,
        method: scrollElement,
        startTime: getNow(element)(),
        x,
        y,
      };
    }
  }

  return new Promise((resolve) => step({ ...context, resolve }));
}

interface StepContent {
  scrollable: Element;
  startTime: number;
  startX: number;
  startY: number;
  x: number;
  y: number;
  method: (element: Element, x: number, y: number) => void;
  resolve: () => void;
}

function step({ scrollable, startX, startY, x, y, method, resolve, startTime }: StepContent) {
  const time = getNow(scrollable)();
  const scrollTime = 468;
  const elapsed = Math.min(1, (time - startTime) / scrollTime);
  const value = ease(elapsed);
  const activeWindow = getWin(scrollable);

  const currentX = startX + (x - startX) * value;
  const currentY = startY + (y - startY) * value;

  method(scrollable, currentX, currentY);

  if (currentX !== x || currentY !== y) {
    !!activeWindow &&
      activeWindow.requestAnimationFrame(() => step({ scrollable, startX, startY, x, y, method, resolve, startTime }));
  } else {
    resolve();
  }
}

const getScrollWindow = (el: Element) => {
  const activeWindow = getWin(el);

  if (isBrowser) {
    if (typeof activeWindow?.scroll === 'function') {
      return (_: any, x: any, y: any) => activeWindow?.scroll(x, y);
    }
  }

  return () => undefined;
};

const getNow = (el: Element) => {
  const activeWindow = getWin(el);
  return isBrowser && activeWindow?.performance && activeWindow?.performance.now
    ? activeWindow?.performance.now.bind(activeWindow?.performance)
    : Date.now;
};

function scrollElement(element: Element, x: number, y: number) {
  element.scrollLeft = x;
  element.scrollTop = y;
}

function ease(time: number): number {
  return 0.5 * (1 - Math.cos(Math.PI * time));
}

function getDocumentBodyStrict(activeDocument: Document): Element {
  if (isNullable(activeDocument.body)) {
    throw new Error('Scrolling can be used only in browser');
  }

  return activeDocument.body;
}

function findScrollableParent(el: Element): Element {
  let isBody: Nullable<boolean>;
  let hasScrollableSpace: Nullable<boolean>;
  let hasVisibleOverflow: Nullable<boolean>;
  let currentElement: Element = el;
  do {
    if (isNullable(currentElement.parentElement) || !isElement(currentElement.parentElement)) {
      return getDocumentBodyStrict(getDoc(currentElement));
    }
    currentElement = currentElement.parentElement;
    isBody = currentElement === getDoc(currentElement).body;
    hasScrollableSpace =
      currentElement.clientHeight < currentElement.scrollHeight ||
      currentElement.clientWidth < currentElement.scrollWidth;
    hasVisibleOverflow = getWin(currentElement)?.getComputedStyle(currentElement, null).overflow === 'visible';
  } while (!isBody && !(hasScrollableSpace && !hasVisibleOverflow));

  isBody = null;
  hasScrollableSpace = null;
  hasVisibleOverflow = null;

  return currentElement;
}

function scrollBy({ element, left, top }: { element: Element; left: number; top: number }): Promise<void> {
  const activeWindow = getWin(element);
  const activeDocument = getDoc(element);

  if (!activeWindow) {
    return new Promise((resolve) => resolve());
  }

  const x = Math.floor(left) + (activeWindow?.scrollX || activeWindow?.pageXOffset);
  const y = Math.floor(top) + (activeWindow?.scrollY || activeWindow?.pageYOffset);

  return smoothScroll(getDocumentBodyStrict(activeDocument), x, y);
}

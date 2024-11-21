import { globalObject, isBrowser } from '@skbkontur/global-object';

import { getParentOrShadowHost } from './getParentOrShadowHost';

export function scrollYCenterIntoNearestScrollable(element: HTMLElement) {
  if (!isBrowser(globalObject)) {
    return;
  }

  const parent = findNearestScrollableParent(element);

  if (!parent) {
    return;
  }

  const elementRect = element.getBoundingClientRect();
  const parentRect = parent.getBoundingClientRect();

  const scrollTopPos = elementRect.top - parentRect.top;
  const scrollBottomPos = elementRect.bottom - parentRect.bottom;
  const scrollCenterPos = (scrollTopPos + scrollBottomPos) / 2;

  if (scrollCenterPos !== 0) {
    parent.scrollTo({ top: scrollCenterPos });
  }
}

export function findNearestScrollableParent(element: HTMLElement) {
  if (!isBrowser(globalObject)) {
    return;
  }

  let parent = getParentOrShadowHost(element);

  while (parent) {
    const { overflow } = globalObject.getComputedStyle(parent);
    const overflowValues = overflow.split(' ');
    const isScrollbale = overflowValues.every((val) => val === 'auto' || val === 'scroll');

    if (isScrollbale) {
      return parent;
    }

    parent = getParentOrShadowHost(parent);
  }

  return globalObject.document.documentElement;
}

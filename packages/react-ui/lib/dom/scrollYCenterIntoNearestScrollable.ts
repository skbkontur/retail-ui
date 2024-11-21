import { globalObject, isBrowser } from "@skbkontur/global-object";

export function scrollYCenterIntoNearestScrollable(element: HTMLElement) {
  if (!isBrowser(globalObject)) {
    return;
  }

  const parent = findNearestScrollableParent(element);
  const elementRect = element.getBoundingClientRect();
  const parentRect = parent!.getBoundingClientRect();

  const scrollTopPos = elementRect.top - parentRect.top;
  const scrollBottomPos = elementRect.bottom - parentRect.bottom;
  const scrollCenterPos = (scrollTopPos + scrollBottomPos) / 2;

  if (scrollCenterPos !== 0) {
    parent!.scrollTo({ top: scrollCenterPos });
  }
}

function findNearestScrollableParent(element: HTMLElement) {
  let parent : Element | null = element.parentElement;

  if (!isBrowser(globalObject)) {
    return;
  }

  while (parent) {
    const { overflow } = globalObject.getComputedStyle(parent);
    const overflowValues = overflow.split(' ');

    if (overflowValues.every((val) => val === 'auto' || val === 'scroll')) {
      return parent;
    }

    parent = parent.parentElement || parent.shadowRoot!.host
  }

  return element.ownerDocument.documentElement;
}

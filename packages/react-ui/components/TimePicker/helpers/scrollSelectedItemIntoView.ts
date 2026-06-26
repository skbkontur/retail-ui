import { findNearestScrollableParent } from '../../../lib/dom/scrollYCenterIntoNearestScrollable.js';
import { getOwnerGlobalObject, isBrowser } from '../../../lib/globalObject.js';

/**
 * Прокручивает ближайший scrollable-контейнер так, чтобы выбранный элемент оказался ближе к центру viewport контейнера.
 */
export const scrollSelectedItemIntoView = (element: HTMLElement): void => {
  const globalObject = getOwnerGlobalObject(element);

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
    parent.scrollTo({ top: parent.scrollTop + scrollCenterPos });
  }
};

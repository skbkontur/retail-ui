import { getClosestFocusableElement } from '../dom/tabbableHelpers';
import { isIE11, isEdge } from '../client';

export const fixClickFocusIE = (e: Event) => {
  if (isIE11 || isEdge) {
    // workaround for the IE/Edge focus bug
    // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/14306303/
    if (document.activeElement !== e.target) {
      if (e.target instanceof HTMLElement) {
        const closestFocusable = getClosestFocusableElement(e.target);
        if (closestFocusable) {
          closestFocusable.focus();
        }
      }
    }
  }
};

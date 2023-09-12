import { getClosestFocusableElement } from '../dom/tabbableHelpers';
import { isIE11, isEdge } from '../client';
import { isHTMLElement, globalThat, Event } from '../globalThat';

export const fixClickFocusIE = (e: Event) => {
  if (isIE11 || isEdge) {
    // workaround for the IE/Edge focus bug
    // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/14306303/
    if (globalThat.document && globalThat.document.activeElement !== e.target) {
      if (isHTMLElement(e.target)) {
        const closestFocusable = getClosestFocusableElement(e.target);
        if (closestFocusable) {
          closestFocusable.focus();
        }
      }
    }
  }
};

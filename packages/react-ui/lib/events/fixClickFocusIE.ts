import { globalObject } from '@skbkontur/global-object';

import { getClosestFocusableElement } from '../dom/tabbableHelpers';
import { isIE11, isEdge } from '../client';
import { isInstanceOfForIE11 } from '../isInstanceOfForIE11';

export const fixClickFocusIE = (e: Event) => {
  if (isIE11 || isEdge) {
    // workaround for the IE/Edge focus bug
    // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/14306303/
    if (globalObject.document && globalObject.document.activeElement !== e.target) {
      if (isInstanceOfForIE11(e.target, globalObject.HTMLElement)) {
        const closestFocusable = getClosestFocusableElement(e.target);
        if (closestFocusable) {
          closestFocusable.focus();
        }
      }
    }
  }
};

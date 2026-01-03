import { isBrowser, getOwnerGlobalObject } from '../../lib/globalObject.js';
import type { GlobalObject } from '../../lib/globalObject.js';

export const selectNodeContents = (node: HTMLElement | null, start?: number, end?: number): void => {
  if (!node) {
    return;
  }
  const globalObject = getOwnerGlobalObject(node);
  if (isBrowser(globalObject) && 'createRange' in globalObject.document) {
    try {
      const selection = globalObject.getSelection();
      const range = globalObject.document.createRange();
      if (start !== undefined && end !== undefined) {
        range.setStart(node, start);
        range.setEnd(node, end);
      } else {
        range.selectNodeContents(node);
      }
      if (selection !== null) {
        // Fix IE from issue not working (https://github.com/skbkontur/retail-ui/issues/1205)
        selection.removeAllRanges();
        selection.addRange(range);
        return;
      }
    } catch (e) {
      // empty block
    }
  }

  if (isBrowser(globalObject) && 'createTextRange' in globalObject.document.body) {
    // @ts-expect-error: IE-specific API.
    const range = globalObject.document.body.createTextRange();
    range.moveToElementText(node);
    if (typeof range.select === 'function') {
      range.select();
    }
    return;
  }
};

export const removeAllSelections = (globalObject: GlobalObject): void => {
  const selection = globalObject.getSelection?.();
  if (selection) {
    try {
      // Fix IE from issue not working (https://github.com/skbkontur/retail-ui/issues/1205)
      selection.removeAllRanges();
    } catch (e) {
      // empty block
    }
  }
};

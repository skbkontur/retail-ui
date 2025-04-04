import type React from 'react';
import { globalObject, isBrowser } from '@skbkontur/global-object';

import { isFirefox } from '../client';

// Checkbox not checked in Firefox if key of modifier was active
// shift+click, ctrl+click on Win and cmd+click on Mac
// https://bugzilla.mozilla.org/show_bug.cgi?id=559506
export const fixFirefoxModifiedClickOnLabel =
  (ref: React.RefObject<HTMLInputElement>) => (e: React.MouseEvent<HTMLLabelElement>) => {
    const input = ref.current;
    if (input && !input.disabled && isBrowser(globalObject) && isFirefox && (e.shiftKey || e.ctrlKey || e.metaKey)) {
      // Currently only valid for Radio and Checkbox
      input.checked = !input.checked;
      const type = input.type;
      input.type = 'text';
      e.persist();
      if (globalObject.MouseEvent) {
        input.dispatchEvent(new globalObject.MouseEvent('change', e.nativeEvent));
      }
      input.type = type;
    }
  };

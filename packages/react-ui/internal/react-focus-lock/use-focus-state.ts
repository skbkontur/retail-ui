import { useCallback, useEffect, useRef, useState } from 'react';

import { useGlobal } from '../../lib/renderEnvironment/index.js';
import { createNanoEvents } from './nano-events.js';

const mainbus = createNanoEvents();

let subscribeCounter = 0;

const onFocusIn = (event: FocusEvent) => mainbus.emit('assign', event.target);
const onFocusOut = (event: FocusEvent) => mainbus.emit('reset', event.target);

/**
 * attaches focusin/focusout listener-singlenton to the document
 * it will emit "reset" event on blur/focusout and cause "set" on focus/focusin
 */
const useDocumentFocusSubscribe = () => {
  const globalObject = useGlobal();

  useEffect(() => {
    if (!subscribeCounter) {
      globalObject.document?.addEventListener('focusin', onFocusIn);
      globalObject.document?.addEventListener('focusout', onFocusOut);
    }
    subscribeCounter += 1;
    return () => {
      subscribeCounter -= 1;
      if (!subscribeCounter) {
        globalObject.document?.removeEventListener('focusin', onFocusIn);
        globalObject.document?.removeEventListener('focusout', onFocusOut);
      }
    };
  }, [globalObject]);
};

const getFocusState = (target: Element | null, current: Element) => {
  if (target === current) {
    return 'self';
  }
  if (current.contains(target)) {
    return 'within';
  }
  return 'within-boundary';
};

export const useFocusState = (callbacks: { onFocus?: () => void; onBlur?: () => void } = {}) => {
  const [active, setActive] = useState(false);
  const [state, setState] = useState('');
  const ref = useRef(null);
  const focusState = useRef({});
  const stateTracker = useRef(false);
  const globalObject = useGlobal();

  // initial focus
  useEffect(() => {
    if (ref.current) {
      const document = globalObject.document;
      if (!document) {
        return;
      }
      const isAlreadyFocused =
        ref.current === document.activeElement || (ref.current as Element).contains(document.activeElement);
      setActive(isAlreadyFocused);
      setState(getFocusState(document.activeElement, ref.current));

      if (isAlreadyFocused && callbacks.onFocus) {
        callbacks.onFocus();
      }
    }
  }, [globalObject]);

  const onFocus = useCallback((e: FocusEvent) => {
    // element caught focus. Store, but do not set value yes
    focusState.current = {
      focused: true,
      state: getFocusState(e.target as Element, e.currentTarget as Element),
    };
  }, []);

  useDocumentFocusSubscribe();
  useEffect(() => {
    const fout = mainbus.on('reset', () => {
      // focus is going somewhere
      focusState.current = {};
    });
    const fin = mainbus.on('assign', () => {
      // focus event propagation is ended
      const newState = (focusState.current as { focused: boolean }).focused || false;
      setActive(newState);
      setState((focusState.current as { state: string }).state || '');

      if (newState !== stateTracker.current) {
        stateTracker.current = newState;
        if (newState) {
          callbacks.onFocus && callbacks.onFocus();
        } else {
          callbacks.onBlur && callbacks.onBlur();
        }
      }
    });
    return () => {
      fout();
      fin();
    };
  }, []);

  return {
    active,
    state,
    onFocus,
    ref,
  };
};

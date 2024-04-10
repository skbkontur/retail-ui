import React, { useRef } from 'react';
//https://github.com/facebook/react/issues/9142#issuecomment-1271705028
export function useFocusAndBlurHandle(
  disabled: boolean | undefined,
  input: HTMLElement | undefined | null,
  isFocused: boolean,
  onBlur: React.FocusEventHandler | undefined,
) {
  function handler(e: FocusEvent) {
    let propagationStopped = false;
    const currentTarget = e.currentTarget as EventTarget & Element;
    const relatedTarget = e.relatedTarget as (EventTarget & Element) | null;
    const target = e.target as EventTarget & Element;
    const reactEvent: React.FocusEvent = {
      ...e,
      currentTarget,
      relatedTarget,
      nativeEvent: e,
      target,
      isDefaultPrevented: () => e.defaultPrevented,
      isPropagationStopped: () => propagationStopped,
      stopPropagation() {
        e.stopPropagation();
        propagationStopped = true;
      },
      persist() {
        /**/
      },
    };

    input?.removeEventListener('blur', handler);
    onBlur?.(reactEvent);
  }

  const handlerRef = useRef(handler);

  if (disabled && input && isFocused) {
    input.removeEventListener('blur', handlerRef.current);
    handlerRef.current = handler;
    input.addEventListener('blur', handler);
  }
}

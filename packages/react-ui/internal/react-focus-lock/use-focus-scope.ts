import { useContext, useMemo, useRef } from 'react';

import { useGlobal } from '../../lib/renderEnvironment/index.js';

import { FocusScope } from './scope.js';
import { mediumEffect } from './medium.js';
import { extractRef } from './util.js';

const collapseRefs = (shards: Array<React.RefObject<Element>>) => shards.map(extractRef).filter(Boolean);

const withMedium = (fn: (...args: any[]) => unknown) =>
  new Promise((resolve) =>
    mediumEffect.useMedium((...args: unknown[]) => {
      resolve(fn(...(args as unknown[])));
    }),
  );
export const useFocusController = (...shards: Array<React.RefObject<Element>>) => {
  if (!shards.length) {
    throw new Error('useFocusController requires at least one target element');
  }
  const globalObject = useGlobal();
  const ref = useRef(shards);
  ref.current = shards;

  return useMemo(
    () => ({
      autoFocus(focusOptions = {}) {
        return withMedium((car) => car.moveFocusInside(collapseRefs(ref.current), null, focusOptions));
      },
      focusNext(options: FocusOptions) {
        return withMedium((car) => {
          car.moveFocusInside(collapseRefs(ref.current), null);
          car.focusNextElement(globalObject.document?.activeElement, { scope: collapseRefs(ref.current), ...options });
        });
      },
      focusPrev(options: FocusOptions) {
        return withMedium((car) => {
          car.moveFocusInside(collapseRefs(ref.current), null);
          car.focusPrevElement(globalObject.document?.activeElement, { scope: collapseRefs(ref.current), ...options });
        });
      },
      focusFirst(options: FocusOptions) {
        return withMedium((car) => {
          car.focusFirstElement(collapseRefs(ref.current), options);
        });
      },
      focusLast(options: FocusOptions) {
        return withMedium((car) => {
          car.focusLastElement(collapseRefs(ref.current), options);
        });
      },
    }),
    [globalObject],
  );
};
export const useFocusScope = (): ReturnType<typeof useFocusController> => {
  const scope = useContext(FocusScope) as unknown as {
    observed: React.RefObject<Element>;
    shards: Array<React.RefObject<Element>>;
  };
  if (!scope) {
    throw new Error('FocusLock is required to operate with FocusScope');
  }
  return useFocusController(scope.observed, ...scope.shards);
};

import React from 'react';
import { useMergeRefs } from 'use-callback-ref';

import { useGlobal } from '../../lib/renderEnvironment/index.js';

import { FOCUS_DISABLED, FOCUS_GROUP } from './constants.js';
import { hiddenGuard } from './FocusGuard.js';
import { mediumFocus, mediumBlur, mediumSidecar } from './medium.js';
import { FocusScope } from './scope.js';

const emptyArray: any[] = [];

interface SideCarProps {
  id: Record<string, any>;
  sideCar: unknown;
  observed: Element | null;
  disabled: boolean;
  persistentFocus: boolean;
  crossFrame: boolean;
  autoFocus: boolean;
  whiteList?: (element: Element) => boolean;
  shards: Array<React.RefObject<Element>>;
  onActivation: (event: { captureFocusRestore: (element: HTMLElement | null) => HTMLElement | null }) => void;
  onDeactivation: () => void;
  returnFocus: (allowDefer: boolean) => void;
  focusOptions?: FocusOptions;
}

export interface LockProps {
  children: React.ReactNode;
  disabled?: boolean;
  noFocusGuards?: boolean;
  persistentFocus?: boolean;
  crossFrame?: boolean;
  autoFocus?: boolean;
  allowTextSelection?: boolean;
  group?: string;
  className?: string;
  whiteList?: (element: Element) => boolean;
  hasPositiveIndices?: boolean;
  shards?: Array<React.RefObject<Element>>;
  as?: string;
  lockProps?: React.CSSProperties;
  sideCar?: React.ComponentType<SideCarProps>;
  returnFocus?: boolean | ((allowDefer: boolean | HTMLElement) => void);
  focusOptions?: FocusOptions;
  onActivation?: (event: { captureFocusRestore: (element: Element) => Element }) => void;
  onDeactivation?: () => void;
}

const FocusLock = React.forwardRef(function FocusLockUI(props: LockProps, parentRef: React.ForwardedRef<Element>) {
  const globalObject = useGlobal();
  const [realObserved, setObserved] = React.useState<Element | null>(null);
  const observed = React.useRef<Element | null>(null);
  const isActive = React.useRef(false);
  const originalFocusedElement = React.useRef<HTMLElement | null | (() => HTMLElement | null)>(null);

  const [, update] = React.useState({});

  const {
    children,
    disabled = false,
    noFocusGuards = false,
    persistentFocus = false,
    crossFrame = true,
    autoFocus = true,
    allowTextSelection,
    group,
    className,
    whiteList,
    hasPositiveIndices,
    shards = emptyArray,
    as: Container = 'div',
    lockProps: containerProps = {},
    sideCar: SideCar,

    returnFocus: shouldReturnFocus = false,
    focusOptions,

    onActivation: onActivationCallback,
    onDeactivation: onDeactivationCallback,
  } = props;

  const [id] = React.useState({});

  // SIDE EFFECT CALLBACKS

  const onActivation = React.useCallback(
    ({ captureFocusRestore }: { captureFocusRestore: (element: HTMLElement | null) => HTMLElement | null }) => {
      if (!originalFocusedElement.current) {
        const activeElement = globalObject.document?.activeElement;
        originalFocusedElement.current = activeElement as HTMLElement;
        // store stack reference
        if (activeElement !== globalObject.document?.body) {
          originalFocusedElement.current = captureFocusRestore(activeElement as HTMLElement);
        }
      }

      if (observed.current && onActivationCallback) {
        // @ts-expect-error
        onActivationCallback(observed.current);
      }
      isActive.current = true;
      update({});
    },
    [onActivationCallback, globalObject],
  );

  const onDeactivation = React.useCallback(() => {
    isActive.current = false;
    if (onDeactivationCallback) {
      onDeactivationCallback();
    }
    update({});
  }, [onDeactivationCallback]);

  const returnFocus = React.useCallback(
    (allowDefer: boolean) => {
      const { current: focusRestore } = originalFocusedElement;
      if (focusRestore) {
        const returnFocusTo =
          (typeof focusRestore === 'function' ? focusRestore() : focusRestore) ||
          globalObject.document?.body ||
          document.body;
        const howToReturnFocus =
          typeof shouldReturnFocus === 'function' ? shouldReturnFocus(returnFocusTo) : shouldReturnFocus;
        if (howToReturnFocus) {
          const returnFocusOptions = typeof howToReturnFocus === 'object' ? howToReturnFocus : undefined;
          originalFocusedElement.current = null;

          if (allowDefer) {
            // React might return focus after update
            // it's safer to defer the action
            Promise.resolve().then(() => returnFocusTo.focus(returnFocusOptions));
          } else {
            returnFocusTo.focus(returnFocusOptions);
          }
        }
      }
    },
    [shouldReturnFocus, globalObject],
  );

  // MEDIUM CALLBACKS

  const onFocus = React.useCallback((event: FocusEvent) => {
    if (isActive.current) {
      mediumFocus.useMedium(event as any);
    }
  }, []);

  const onBlur = mediumBlur.useMedium;

  // REF PROPAGATION
  // not using real refs due to race conditions

  const setObserveNode = React.useCallback((newObserved: Element | null) => {
    if (observed.current !== newObserved) {
      observed.current = newObserved;
      setObserved(newObserved);
    }
  }, []);

  if (process.env.NODE_ENV !== 'production') {
    if (typeof allowTextSelection !== 'undefined') {
      console.warn('React-Focus-Lock: allowTextSelection is deprecated and enabled by default');
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      // report incorrect integration - https://github.com/theKashey/react-focus-lock/issues/123
      if (!observed.current && typeof Container !== 'string') {
        console.error('FocusLock: could not obtain ref to internal node');
      }
    }, []);
  }

  const lockProps = {
    [FOCUS_DISABLED]: disabled && 'disabled',
    [FOCUS_GROUP]: group,
    ...containerProps,
  };

  const hasLeadingGuards = noFocusGuards !== true;
  // @ts-expect-error hasTailingGuards is not typed
  const hasTailingGuards = hasLeadingGuards && noFocusGuards !== 'tail';

  const mergedRef = useMergeRefs([parentRef, setObserveNode]);

  const focusScopeValue = React.useMemo(
    () => ({
      observed,
      shards,
      enabled: !disabled,
      active: isActive.current,
    }),
    [disabled, isActive.current, shards, realObserved],
  );

  return (
    <React.Fragment>
      {hasLeadingGuards && [
        // nearest focus guard
        <div key="guard-first" data-focus-guard tabIndex={disabled ? -1 : 0} style={hiddenGuard} />,

        // first tabbed element guard
        hasPositiveIndices ? (
          <div key="guard-nearest" data-focus-guard tabIndex={disabled ? -1 : 1} style={hiddenGuard} />
        ) : null,
      ]}
      {!disabled && SideCar && (
        <SideCar
          id={id}
          sideCar={mediumSidecar}
          observed={realObserved}
          disabled={disabled}
          persistentFocus={persistentFocus}
          crossFrame={crossFrame}
          autoFocus={autoFocus}
          whiteList={whiteList}
          shards={shards}
          onActivation={onActivation}
          onDeactivation={onDeactivation}
          returnFocus={returnFocus}
          focusOptions={focusOptions}
        />
      )}
      {/* @ts-expect-error children is not typed */}
      <Container ref={mergedRef} {...lockProps} className={className} onBlur={onBlur} onFocus={onFocus}>
        {/* @ts-expect-error children is not typed */}
        <FocusScope.Provider value={focusScopeValue}>{children}</FocusScope.Provider>
      </Container>
      {hasTailingGuards && <div data-focus-guard tabIndex={disabled ? -1 : 0} style={hiddenGuard} />}
    </React.Fragment>
  );
});

export default FocusLock;

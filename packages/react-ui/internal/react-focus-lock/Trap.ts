import withSideEffect from 'react-clientside-effect';
import {
  moveFocusInside,
  focusInside,
  focusIsHidden,
  expandFocusableNodes,
  focusNextElement,
  focusPrevElement,
  focusFirstElement,
  focusLastElement,
  captureFocusRestore,
} from 'focus-lock';

import { getOwnerGlobalObject } from '../../lib/globalObject.js';

import { deferAction, extractRef } from './util.js';
import { mediumFocus, mediumBlur, mediumEffect } from './medium.js';

const focusOnBody = (globalObject: any) =>
  globalObject.document && globalObject.document.activeElement === globalObject.document.body;

const isFreeFocus = (globalObject: any) => focusOnBody(globalObject) || focusIsHidden();

let lastActiveTrap: any = null;
let lastActiveFocus: any = null;

let lastPortaledElement: any = null;

let focusWasOutsideWindow = false;

const defaultWhitelist = () => true;

const focusWhitelisted = (activeElement: Element) => (lastActiveTrap.whiteList || defaultWhitelist)(activeElement);

const recordPortal = (observerNode: Element, portaledElement: Element) => {
  lastPortaledElement = { observerNode, portaledElement };
};

const focusIsPortaledPair = (element: Element | null | undefined) =>
  lastPortaledElement && lastPortaledElement.portaledElement === element;

function autoGuard(startIndex: number, end: number, step: number, allNodes: any[]) {
  let lastGuard = null;
  let i = startIndex;
  do {
    const item = allNodes[i];
    if (item.guard) {
      if (item.node.dataset.focusAutoGuard) {
        lastGuard = item;
      }
    } else if (item.lockItem) {
      if (i !== startIndex) {
        // we will tab to the next element
        return;
      }
      lastGuard = null;
    } else {
      break;
    }
  } while ((i += step) !== end);
  if (lastGuard) {
    lastGuard.node.tabIndex = 0;
  }
}

const focusWasOutside = (crossFrameOption: boolean) => {
  if (crossFrameOption) {
    // with cross frame return true for any value
    return Boolean(focusWasOutsideWindow);
  }
  // in other case return only of focus went a while aho
  return (focusWasOutsideWindow as unknown as string) === 'meanwhile';
};

const checkInHost = (check: Element, el: any, boundary: Element): boolean =>
  el &&
  // find host equal to active element and check nested active element
  ((el.host === check && (!el.activeElement || boundary.contains(el.activeElement))) ||
    // dive up
    (el.parentNode && checkInHost(check, el.parentNode, boundary)));

const withinHost = (activeElement: Element, workingArea: Element[]) =>
  workingArea.some((area: Element) => checkInHost(activeElement, area, area));

const activateTrap = () => {
  let result = false;
  if (lastActiveTrap) {
    const { observed, persistentFocus, autoFocus, shards, crossFrame, focusOptions } = lastActiveTrap;
    const workingNode = observed || (lastPortaledElement && lastPortaledElement.portaledElement);
    let globalObject;
    if (observed) {
      globalObject = getOwnerGlobalObject(observed);
    } else if (typeof window !== 'undefined') {
      globalObject = window;
    } else {
      globalObject = undefined;
    }
    const document = globalObject?.document;
    const activeElement = document && document.activeElement;
    if (workingNode) {
      const workingArea = [workingNode, ...shards.map(extractRef).filter(Boolean)];

      if (!activeElement || focusWhitelisted(activeElement)) {
        if (
          persistentFocus ||
          focusWasOutside(crossFrame) ||
          !isFreeFocus(globalObject) ||
          (!lastActiveFocus && autoFocus)
        ) {
          if (
            workingNode &&
            !(
              // active element is "inside" working area
              (
                focusInside(workingArea) ||
                // check for shadow-dom contained elements
                (activeElement && withinHost(activeElement, workingArea)) ||
                focusIsPortaledPair(activeElement)
              )
            )
          ) {
            if (document && !lastActiveFocus && activeElement && !autoFocus) {
              // Check if blur() exists, which is missing on certain elements on IE
              // @ts-expect-error activeElement is not typed
              if (activeElement.blur) {
                // @ts-expect-error activeElement is not typed
                activeElement.blur();
              }
              document.body.focus();
            } else {
              // @ts-expect-error lastActiveFocus is not typed
              result = moveFocusInside(workingArea, lastActiveFocus, { focusOptions });
              lastPortaledElement = {};
            }
          }
          focusWasOutsideWindow = false;
          lastActiveFocus = document && document.activeElement;
        }
      }

      if (
        document &&
        // element was changed
        activeElement !== document.activeElement &&
        // fast check for any auto-guard
        document.querySelector('[data-focus-auto-guard]')
      ) {
        const newActiveElement = document && document.activeElement;
        const allNodes = expandFocusableNodes(workingArea);
        const focusedIndex = allNodes.map(({ node }) => node).indexOf(newActiveElement as HTMLElement);
        if (focusedIndex > -1) {
          // remove old focus
          allNodes
            .filter(({ guard, node }) => guard && node.dataset.focusAutoGuard)
            .forEach(({ node }) => node.removeAttribute('tabIndex'));

          autoGuard(focusedIndex, allNodes.length, +1, allNodes);
          autoGuard(focusedIndex, -1, -1, allNodes);
        }
      }
    }
  }
  return result;
};

const onTrap = (event: FocusEvent) => {
  if (activateTrap() && event) {
    // prevent scroll jump
    event.stopPropagation();
    event.preventDefault();
  }
};

const onBlur = () => deferAction(activateTrap);

const onFocus = (event: FocusEvent) => {
  // detect portal
  const source = event.target as Element;
  const currentNode = event.currentTarget as Element;
  if (currentNode && !currentNode.contains(source)) {
    recordPortal(currentNode, source);
  }
};

const FocusWatcher = () => null;

const onWindowBlur = () => {
  // @ts-expect-error focusWasOutsideWindow is not typed
  focusWasOutsideWindow = 'just';
  // using setTimeout to set  this variable after React/sidecar reaction
  deferAction(() => {
    // @ts-expect-error focusWasOutsideWindow is not typed
    focusWasOutsideWindow = 'meanwhile';
  });
};

const attachHandler = (globalObject: any) => {
  globalObject.document?.addEventListener('focusin', onTrap);
  globalObject.document?.addEventListener('focusout', onBlur);
  globalObject.addEventListener('blur', onWindowBlur);
};

const detachHandler = (globalObject: any) => {
  globalObject.document?.removeEventListener('focusin', onTrap);
  globalObject.document?.removeEventListener('focusout', onBlur);
  globalObject.removeEventListener('blur', onWindowBlur);
};

function reducePropsToState(propsList: any[]) {
  return propsList.filter(({ disabled }) => !disabled);
}

const focusLockAPI = {
  moveFocusInside,
  focusInside,
  focusNextElement,
  focusPrevElement,
  focusFirstElement,
  focusLastElement,
  captureFocusRestore,
};

function handleStateChangeOnClient(traps: any[]) {
  const trap = traps.slice(-1)[0];
  let globalObject;
  if (trap?.observed) {
    globalObject = getOwnerGlobalObject(trap.observed);
  } else if (typeof window !== 'undefined') {
    globalObject = window;
  } else {
    globalObject = undefined;
  }

  if (trap && !lastActiveTrap && globalObject) {
    attachHandler(globalObject);
  }

  const lastTrap = lastActiveTrap;
  const sameTrap = lastTrap && trap && trap.id === lastTrap.id;

  lastActiveTrap = trap;

  if (lastTrap && !sameTrap) {
    lastTrap.onDeactivation();
    // return focus only of last trap was removed
    if (!traps.filter(({ id }) => id === lastTrap.id).length) {
      // allow defer is no other trap is awaiting restore
      lastTrap.returnFocus(!trap);
    }
  }

  if (trap) {
    lastActiveFocus = null;
    if (!sameTrap || lastTrap.observed !== trap.observed) {
      trap.onActivation(focusLockAPI);
    }
    activateTrap();
    deferAction(activateTrap);
  } else if (globalObject) {
    detachHandler(globalObject);
    lastActiveFocus = null;
  }
}

// bind medium
mediumFocus.assignSyncMedium(onFocus as any);
mediumBlur.assignMedium(onBlur);
mediumEffect.assignMedium((cb: any) => cb(focusLockAPI));

export default withSideEffect(reducePropsToState, handleStateChangeOnClient)(FocusWatcher);

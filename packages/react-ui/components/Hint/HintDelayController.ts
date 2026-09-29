import type { GlobalObject, SafeTimer } from '../../lib/globalObject.js';

export const HINT_DEFAULT_DELAY_BEFORE_SHOW = 400;
export const HINT_SKIP_DELAY_DURATION = 500;

interface HintDelayState {
  isOpenDelayed: boolean;
  skipDelayTimer: SafeTimer;
}

const states = new WeakMap<GlobalObject, HintDelayState>();

function getState(globalObject: GlobalObject): HintDelayState {
  let state = states.get(globalObject);

  if (!state) {
    state = { isOpenDelayed: true, skipDelayTimer: null };
    states.set(globalObject, state);
  }

  return state;
}

function clearSkipDelayTimer(globalObject: GlobalObject, state: HintDelayState): void {
  if (state.skipDelayTimer !== null) {
    globalObject.clearTimeout?.(state.skipDelayTimer);
    state.skipDelayTimer = null;
  }
}

export function getShowDelay(globalObject: GlobalObject, delayBeforeShow: number): number {
  return getState(globalObject).isOpenDelayed ? delayBeforeShow : 0;
}

export function isShowDelaySkipped(globalObject: GlobalObject): boolean {
  return !getState(globalObject).isOpenDelayed;
}

export function markOpened(globalObject: GlobalObject): void {
  const state = getState(globalObject);
  clearSkipDelayTimer(globalObject, state);
  state.isOpenDelayed = false;
}

/** Starts the skip-delay window after a hover close. */
export function markClosed(globalObject: GlobalObject): void {
  const state = getState(globalObject);
  clearSkipDelayTimer(globalObject, state);

  state.skipDelayTimer =
    globalObject.setTimeout?.(() => {
      state.isOpenDelayed = true;
      state.skipDelayTimer = null;
    }, HINT_SKIP_DELAY_DURATION) ?? null;
}

/** Drops warm-up state immediately (e.g. unmount). Does not keep the skip-delay window. */
export function markDisposed(globalObject: GlobalObject): void {
  const state = getState(globalObject);
  clearSkipDelayTimer(globalObject, state);
  states.delete(globalObject);
}

export function resetForTests(globalObject: GlobalObject): void {
  markDisposed(globalObject);
}

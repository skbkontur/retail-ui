/**
 * @fileoverview this is a copy of https://github.com/ai/nanoevents
 * as a temp measure to avoid breaking changes in node/compilation
 */

export const createNanoEvents = () => ({
  emit(event: string, ...args: any[]) {
    for (
      // @ts-expect-error events is not typed
      let i = 0, callbacks = (this.events[event] as any[]) || [], { length } = callbacks;
      i < length;
      i++
    ) {
      callbacks[i](...args);
    }
  },
  events: {},
  on(event: string, cb: () => void) {
    // @ts-expect-error events is not typed
    (this.events[event] ||= []).push(cb);
    return () => {
      // @ts-expect-error events is not typed
      this.events[event] = this.events[event]?.filter((i) => cb !== i);
    };
  },
});

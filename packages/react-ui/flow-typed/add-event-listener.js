// @flow

declare module 'add-event-listener' {
  /* eslint-disable flowtype/no-weak-types */
  declare type EvenetListener = (Event) => any;
  /* eslint-enable */

  declare module.exports: {
    addEventListener(
      el: Element,
      eventName: string,
      listener: EvenetListener,
      useCapture?: boolean
    ): void,
    removeEventListener(
      el: Element,
      eventName: string,
      listener: EvenetListener,
      useCapture?: boolean
    ): void
  } & ((
    el: Element,
    eventName: string,
    listener: EvenetListener,
    useCapture?: boolean
  ) => void);
}

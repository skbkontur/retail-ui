// @flow

declare module 'add-event-listener' {
  declare type EvenetListener = (Event) => any;

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

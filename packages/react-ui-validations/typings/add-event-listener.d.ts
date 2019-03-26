declare module 'add-event-listener' {
  interface AddEventListener {
    <K extends keyof WindowEventMap>(
      el: Window,
      eventName: K,
      listener: (event: WindowEventMap[K]) => void,
      useCapture?: boolean
    ): void;

    <K extends keyof DocumentEventMap>(
      el: Document,
      eventName: K,
      listener: (event: DocumentEventMap[K]) => void,
      useCapture?: boolean
    ): void;

    <K extends keyof HTMLElementEventMap>(
      el: Element,
      eventName: K,
      listener: (event: HTMLElementEventMap[K]) => void,
      useCapture?: boolean
    ): void;
  }

  const module: {
    addEventListener: AddEventListener;
    removeEventListener: AddEventListener;
  };

  export = module;
}

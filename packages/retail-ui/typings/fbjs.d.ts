declare module 'fbjs/lib/shallowEqual' {
  function shallow(a: any, b: any): boolean;
  export default shallow;
}

declare module 'fbjs/lib/ExecutionEnvironment' {
  export const canUseDOM: boolean;
  export const canUseWorkers: boolean;
  export const canUseEventListeners: boolean;
  export const canUseViewport: boolean;
  export const isInWorker: boolean;
}

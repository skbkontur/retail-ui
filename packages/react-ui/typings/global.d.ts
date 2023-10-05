/* eslint-disable no-var */
declare interface Window {
  RetailUIVerticalScrollCounter: number;
  ReactTesting: any;
}

declare var __RetailUiZIndexes: number[];

// XDomainRequest is IE-specific API, therefore it was removed from `lib.d.ts`
// See: https://github.com/Microsoft/TypeScript/issues/2927
declare var XDomainRequest: typeof XMLHttpRequest;

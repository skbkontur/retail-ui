import { StackInfo } from '../lib/ModalStack/ModalStack';

// use only `var`, because global variables declared with `let` and `const` don’t show up on `globalThis`
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#type-checking-for-globalthis
declare global {
  var RetailUIVerticalScrollCounter: number;
  var ReactTesting: any;
  var __ReactUIStackInfo: StackInfo;
  var __RetailUiZIndexes: number[];
}

// without `import/export` all variables will become `any` type
export {};

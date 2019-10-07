import * as React from 'react';
import { ConsumerProps } from 'create-react-context';
import { ReactComponentLike } from 'prop-types';

// NOTE: Copy-paste from @types/react
export type Defaultize<P, D> = P extends any
  ? string extends keyof P
    ? P
    : Pick<P, Exclude<keyof P, keyof D>> &
        Partial<Pick<P, Extract<keyof P, keyof D>>> &
        Partial<Pick<D, Exclude<keyof D, keyof P>>>
  : never;

export type DefaultizeProps<C, P> = C extends { defaultProps: infer D } ? Defaultize<P, D> : P;

// NOTE Some checks are used from https://github.com/arasatasaygin/is.js
const platform = ((navigator && navigator.platform) || '').toLowerCase();
const userAgent = ((navigator && navigator.userAgent) || '').toLowerCase();
const vendor = ((navigator && navigator.vendor) || '').toLowerCase();

export const isMac = /mac/.test(platform);
export const isWindows = /win/.test(platform);

export const isSafari = /version\/(\d+).+?safari/.test(userAgent);
export const isFirefox = /(?:firefox|fxios)\/(\d+)/.test(userAgent);
export const isOpera = /(?:^opera.+?version|opr)\/(\d+)/.test(userAgent);
export const isChrome = /google inc/.test(vendor) && /(?:chrome|crios)\/(\d+)/.test(userAgent) && !isOpera;

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const emptyHandler = () => undefined;

export class CancelationError extends Error {
  public code = 'CancelationError';
}

export function taskWithDelay(task: () => void, ms: number) {
  let cancelationToken: (() => void) = () => null;

  new Promise((resolve, reject) => {
    cancelationToken = reject;
    setTimeout(resolve, ms);
  })
    .then(task)
    .catch(() => null);

  return cancelationToken;
}

// tslint:disable-next-line: ban-types
export function isFunction<T>(x: T | Function): x is Function {
  return typeof x === 'function';
}

export function isFunctionalComponent(Component: ReactComponentLike) {
  return typeof Component === 'function' && !(Component.prototype && Component.prototype.isReactComponent);
}

export function withContext<C>(ContextConsumer: React.ComponentClass<ConsumerProps<C>>) {
  return <P extends {}>(BaseComponent: React.ComponentType<P & { context?: C }>) => (props: P) => (
    <ContextConsumer>{(context: C) => <BaseComponent {...props} context={context} />}</ContextConsumer>
  );
}
export function escapeRegExpSpecChars(s: string): string {
  return s.replace(/[\\^$*+?.()|[\]{}]/g, '\\$&');
}

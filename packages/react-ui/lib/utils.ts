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

export const isMac = platform.includes('mac');
export const isWindows = platform.includes('win');

export const isSafari = /version\/(\d+).+?safari/.test(userAgent);
export const isFirefox = /(?:firefox|fxios)\/(\d+)/.test(userAgent);
export const isOpera = /(?:^opera.+?version|opr)\/(\d+)/.test(userAgent);
export const isChrome = vendor.includes('google inc') && /(?:chrome|crios)\/(\d+)/.test(userAgent) && !isOpera;
export const isEdge = userAgent.includes('edge/');
export const isIE11 = userAgent.includes('trident/');

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const emptyHandler = () => {
  /* noop */
};

export class CancelationError extends Error {
  public code = 'CancelationError';
}

export function taskWithDelay(task: () => void, ms: number) {
  let cancelationToken: () => void = () => null;

  new Promise((resolve, reject) => {
    cancelationToken = reject;
    setTimeout(resolve, ms);
  })
    .then(task)
    .catch(() => null);

  return cancelationToken;
}

export function isFunction<T>(x: T | Function): x is Function {
  return typeof x === 'function';
}

export function isFunctionalComponent(Component: ReactComponentLike) {
  return typeof Component === 'function' && !(Component.prototype && Component.prototype.isReactComponent);
}

export function escapeRegExpSpecChars(s: string): string {
  return s.replace(/[\\^$*+?.()|[\]{}]/g, '\\$&');
}

export const getRandomID = (): string =>
  Math.random()
    .toString(16)
    .slice(2);

export const hasSvgAnimationSupport = (() => {
  if (document.createElementNS) {
    const namespaceURI = 'http://www.w3.org/2000/svg';
    const element = document.createElementNS(namespaceURI, 'animate');

    if (element) {
      return element.toString().includes('SVGAnimate');
    }
  }

  return false;
})();

export function getHashOfObject(obj: object = {}): string {
  const str = JSON.stringify(obj);
  let hash = 0;
  const characters = 'abcdefghij';
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = (hash & hash) >>> 0;
  }
  return hash
    .toString(10)
    .split('')
    .map(n => characters[Number(n)])
    .join('');
}

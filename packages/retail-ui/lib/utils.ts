// NOTE Some checks are used from https://github.com/arasatasaygin/is.js
const platform = ((navigator && navigator.platform) || '').toLowerCase();
const userAgent = ((navigator && navigator.userAgent) || '').toLowerCase();
const vendor = ((navigator && navigator.vendor) || '').toLowerCase();

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

export function isMac(): boolean {
  return /mac/.test(platform);
}

export function isSafari(): boolean {
  return /version\/(\d+).+?safari/.test(userAgent);
}

export function isFirefox(): boolean {
  return /(?:firefox|fxios)\/(\d+)/.test(userAgent);
}

export function isChrome(): boolean {
  return /google inc/.test(vendor) && /(?:chrome|crios)\/(\d+)/.test(userAgent) && !isOpera();
}

export function isOpera(): boolean {
  return /(?:^opera.+?version|opr)\/(\d+)/.test(userAgent);
}

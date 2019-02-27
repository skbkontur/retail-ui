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

export function areArraysEqual(a: Array<string | number>, b: Array<string | number>) {
  if (a === b) {
    return true;
  }
  if (a.length !== b.length) {
    return false;
  }

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }

  return true;
}

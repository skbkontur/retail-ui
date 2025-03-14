import warning from 'warning';

export function catchUnreachableWarning<T>(guard: never, returnValue: T): T {
  warning(true, `Unsupported kind: ${JSON.stringify(guard)}`);
  return returnValue;
}

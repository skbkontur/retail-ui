export function isInstanceOf<C extends new (...args: any) => any>(
  instance?: unknown,
  constructor?: C,
): instance is InstanceType<C> {
  try {
    //@ts-expect-error Can't use typeof operator to type guard, because in IE11 it incorrectly types constructor as 'object' instead of 'function'.
    return instance instanceof constructor;
  } catch (_) {
    return false;
  }
}

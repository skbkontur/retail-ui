export function isInstanceOfForIE11<C extends new (...args: any) => any>(
  instance?: unknown,
  constructor?: C,
): instance is InstanceType<C> {
  return typeof constructor?.constructor === 'function' && instance instanceof constructor;
}

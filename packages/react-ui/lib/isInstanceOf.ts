export function isInstanceOf<C extends new (...args: any) => any>(
  instance?: unknown,
  constructor?: C,
): instance is InstanceType<C> {
  return !!constructor && instance instanceof constructor;
}

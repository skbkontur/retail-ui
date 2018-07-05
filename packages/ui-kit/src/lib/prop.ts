export function prop<K extends string>(propName: K) {
  return <T>(obj: Record<K, T>): T => {
    return obj[propName];
  };
}

export function compose2<T1, T2, R>(a: (arg: T2) => R, b: (arg: T1) => T2): (arg: T1) => R {
  return arg => {
    return a(b(arg));
  };
}

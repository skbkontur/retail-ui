export function deepClone<A>(obj: A): A {
  if (Array.isArray(obj)) {
    return obj.map(deepClone) as any;
  }
  if (typeof obj === 'object') {
    const result = {} as A;
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        result[key] = deepClone(obj[key]);
      }
    }
    return result;
  }
  return obj;
}

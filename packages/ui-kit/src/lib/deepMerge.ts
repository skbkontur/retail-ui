import { deepClone } from './deepClone';

export function deepMerge<A, B, R extends A & B>(objA: A, objB: B): R {
  const result = deepClone(objA) as R;
  for (const key in objB) {
    if (objB.hasOwnProperty(key)) {
      const value = objB[key];
      if (Array.isArray(value)) {
        result[key] = value.map(deepClone) as any;
        continue;
      }
      if (typeof value === 'object') {
        result[key] = deepMerge(result[key], value);
        continue;
      }
      result[key] = value;
    }
  }
  return result;
}

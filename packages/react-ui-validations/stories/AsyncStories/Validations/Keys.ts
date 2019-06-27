let counter = 0;

export const keySymbol = Symbol.for('__async_calculation_key__');

export const keyNext = () => String(++counter);

export const withKey = <T>(data: T, source?: T): T => {
  if (!data || typeof data !== 'object') {
    throw new Error('data ' + data);
  }

  (data as any)[keySymbol] =
    source === undefined ? (data as any)[keySymbol] || keyNext() : (source as any)[keySymbol] || keyNext();

  return data;
};

export const withItemKey = <T>(array: T[]): T[] => {
  for (const item of array) {
    withKey(item);
  }
  return array;
};

export const extractKey = (data: any): string => {
  return data != null && data.hasOwnProperty(keySymbol) ? data[keySymbol] : null;
};

export const withKeyRecursive = <T>(data: T): T => {
  if (Array.isArray(data)) {
    const array = data as any[];
    for (const item of array) {
      if (typeof item === 'object') {
        withKeyRecursive(withKey(item, item));
      }
    }
  } else if (typeof data === 'object') {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        withKeyRecursive(data[key]);
      }
    }
  }
  return data;
};

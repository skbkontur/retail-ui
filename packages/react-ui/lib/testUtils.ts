// ! These utils should only be used for code testing purposes.

/**
 * Allows to use a field of an object as a variable in tests.
 * Should be used for creating unique test titles when using .each with objects.
 *
 * Variable can be accesed inside of test title using %s.
 *
 * @param arrayOfObjects Array of objects.
 * @param key Top-level key of an object.
 * @returns Returns an array of objects with toString method defined.
 * @example
 * const testSuites = addTestKeyToObjects([{ a: 1, b: 2, name: 'primitive'}])
 *
 * it.each(testSuites)('properly calculates %s values', () => {...})
 */
export function addTestKeyToObjectsInArray<
  T extends {
    [key: string]: any;
  }[],
>(arrayOfObjects: T, key: string) {
  return arrayOfObjects.map((item) =>
    Object.assign(item, {
      toString(): string {
        return (this as typeof item)?.[key];
      },
    }),
  );
}

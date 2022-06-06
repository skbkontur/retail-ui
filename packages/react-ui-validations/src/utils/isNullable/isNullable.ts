/**
 * Checks if the value `null` or `undefined`.
 *
 * @param value Value to check for `null` and `undefined`.
 * @returns Returns `true` if `value` is `null` or `undefined`, else `false`.
 */
// @ts-expect-error: TypeScript doesn't consider the check inside of the function.
export const isNullable = <T>(value: T): value is null | undefined => {
  return value === null || value === undefined;
};

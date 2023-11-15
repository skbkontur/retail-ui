import { isNonNullable } from "../../lib/utils";
import { Nullable } from "../../typings/utility-types";

export const Definitions = { '9': /[0-9]/, 'a': /[A-Za-z]/, '*': /[A-Za-z0-9]/ }

export function getDefinitions(formatChars: Nullable<Record<string, string>>): Record<string, string | RegExp> {
  return isNonNullable(formatChars) ? formatChars : Definitions;
}

import { toKebabCase } from '../../../lib/toKebabCase';

import { tryGetBoolean } from './tryGetBoolean';

export type VisualStateDataAttributesResultType = Record<string, string>;

const prefix = `data-visual-state-`;

function fillResult(result: VisualStateDataAttributesResultType, key: string, value: unknown) {
  if (tryGetBoolean(value)) {
    result[`${prefix}${toKebabCase(key)}`] = '';
  }

  return result;
}

export function getVisualStateDataAttributes<T extends Record<string, unknown>>(
  attributes: T,
): VisualStateDataAttributesResultType {
  return Object.entries(attributes).reduce(
    (previousValue, currentValue) => fillResult(previousValue, currentValue[0], currentValue[1]),
    {},
  );
}

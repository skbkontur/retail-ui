import { toKebabCase } from '../../../lib/toKebabCase';
import { Nullable } from '../../../typings/utility-types';

export type VisualStateDataAttributesResultType = Record<string, string>;

const prefix = `data-visual-state-`;

function fillResult(result: VisualStateDataAttributesResultType, key: string, value: Nullable<boolean>) {
  if (value) {
    result[`${prefix}${toKebabCase(key)}`] = '';
  }

  return result;
}

export function getVisualStateDataAttributes<T extends Record<string, Nullable<boolean>>>(
  attributes: T,
): VisualStateDataAttributesResultType {
  return Object.entries(attributes).reduce(
    (previousValue, currentValue) => fillResult(previousValue, currentValue[0], currentValue[1]),
    {},
  );
}

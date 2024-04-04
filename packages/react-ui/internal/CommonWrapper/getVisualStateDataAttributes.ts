import { toKebabCase } from '../../lib/toKebabCase';

import { PrimitiveType } from './types';

export type VisualStateDataAttributesResultType = Record<string, string>;

const prefix = `data-visual-state-`;

function fillResult(result: VisualStateDataAttributesResultType, key: string, value: PrimitiveType) {
  if (value !== null && value !== undefined) {
    result[`${prefix}${toKebabCase(key)}`] = String(value);
  }

  return result;
}

export const getVisualStateDataAttributes = <T extends Record<string, PrimitiveType>>(
  componentProps: Record<string, any> = {},
  attributes = {} as T,
): VisualStateDataAttributesResultType => {
  const result = {} as VisualStateDataAttributesResultType;
  fillResult(result, 'error', componentProps['error']);
  fillResult(result, 'warning', componentProps['warning']);
  fillResult(result, 'disabled', componentProps['disabled']);

  return Object.entries(attributes).reduce(
    (previousValue, currentValue) => fillResult(previousValue, currentValue[0], currentValue[1]),
    result,
  );
};

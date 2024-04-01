import { toKebabCase } from '../../lib/toKebabCase';

import { PrimitiveType } from './types';

export type TestDataAttributesResultType = Record<string, string>;

const prefix = `data-test-`;

function fillResult(result: TestDataAttributesResultType, key: string, value: PrimitiveType) {
  if (value !== null && value !== undefined) {
    result[`${prefix}${toKebabCase(key)}`] = String(value);
  }

  return result;
}

export const getTestDataAttributes = <T extends Record<string, PrimitiveType>>(
  dataProps: Record<string, any> = {},
  attributes = {} as T,
): TestDataAttributesResultType => {
  const result = {} as TestDataAttributesResultType;
  fillResult(result, 'error', dataProps['error']);
  fillResult(result, 'warning', dataProps['warning']);
  fillResult(result, 'disabled', dataProps['disabled']);

  return Object.entries(attributes).reduce(
    (previousValue, currentValue) => fillResult(previousValue, currentValue[0], currentValue[1]),
    result,
  );
};

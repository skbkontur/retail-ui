import { PrimitiveType } from './primitiveType';
import { toKebabCase } from './toKebabCase';

const prefix = `data-comp-`;

export type CommonDataAttributesResultType = Record<string, string>;
export const getCommonDataAttributes = <T extends Record<string, PrimitiveType>>(
  attributes?: T,
): CommonDataAttributesResultType => {
  if (!attributes) {
    return {} as CommonDataAttributesResultType;
  }

  return Object.entries(attributes).reduce((previousValue, currentValue) => {
    if (currentValue[1] !== null && currentValue[1] !== undefined) {
      const path = toKebabCase(currentValue[0]);
      previousValue[`${prefix}${path}`] = String(currentValue[1]);
    }
    return previousValue;
  }, {} as CommonDataAttributesResultType);
};

import { PrimitiveType } from './primitiveType';

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
      previousValue[`${prefix}${currentValue[0]}`] = String(currentValue[1]);
    }
    return previousValue;
  }, {} as CommonDataAttributesResultType);
};

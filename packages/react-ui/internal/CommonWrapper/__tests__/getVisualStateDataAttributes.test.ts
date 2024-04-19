import { getVisualStateDataAttributes } from '../utils/getVisualStateDataAttributes';

describe('getVisualStateDataAttributes', () => {
  it('empty object', () => {
    expect(getVisualStateDataAttributes({})).toStrictEqual({});
  });

  it('fill correct attributes', () => {
    expect(
      getVisualStateDataAttributes({
        attributeNull: null,
        attributeUndefined: undefined,
        attributeBooleanFalse: false,
        attributeBooleanTrue: true,
      }),
    ).toStrictEqual({
      'data-visual-state-attribute-boolean-true': '',
    });
  });
});

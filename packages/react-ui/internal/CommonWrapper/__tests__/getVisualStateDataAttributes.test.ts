import { getVisualStateDataAttributes } from '../getVisualStateDataAttributes';

describe('getVisualStateDataAttributes', () => {
  it('empty object', () => {
    expect(getVisualStateDataAttributes({})).toStrictEqual({});
  });

  it('fill correct attributes', () => {
    expect(
      getVisualStateDataAttributes({
        attributeNull: null,
        attributeUndefined: undefined,
        attributeBoolean: true,
      }),
    ).toStrictEqual({
      'data-visual-state-attribute-boolean': 'true',
    });
  });
});

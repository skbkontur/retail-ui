import { getVisualStateDataAttributes } from '../getVisualStateDataAttributes';

describe('getVisualStateDataAttributes', () => {
  it('empty object', () => {
    expect(getVisualStateDataAttributes({})).toStrictEqual({});
  });

  it('fill correct attributes and common props', () => {
    expect(
      getVisualStateDataAttributes(
        {
          attributeNull: null,
          attributeUndefined: undefined,
          attributeBoolean: true,
        },
        { skip: true, error: true, warning: false, disabled: true },
      ),
    ).toStrictEqual({
      'data-visual-state-error': 'true',
      'data-visual-state-warning': 'false',
      'data-visual-state-disabled': 'true',
      'data-visual-state-attribute-boolean': 'true',
    });
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

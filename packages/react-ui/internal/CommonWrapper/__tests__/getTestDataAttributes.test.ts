import { getVisualStateDataAttributes } from '../getVisualStateDataAttributes';

describe('VisualStateDataAttributes', () => {
  it('empty object', () => {
    expect(getVisualStateDataAttributes()).toStrictEqual({});
  });

  it('filled', () => {
    expect(
      getVisualStateDataAttributes(
        { skip: true, error: true, warning: false, disabled: true },
        {
          attributeNull: null,
          attributeUndefined: undefined,
          attributeBoolean: true,
          attributeString: 'state',
          attributeNumber: 0,
        },
      ),
    ).toStrictEqual({
      'data-visual-state-error': 'true',
      'data-visual-state-warning': 'false',
      'data-visual-state-disabled': 'true',
      'data-visual-state-attribute-boolean': 'true',
      'data-visual-state-attribute-string': 'state',
      'data-visual-state-attribute-number': '0',
    });
  });
});

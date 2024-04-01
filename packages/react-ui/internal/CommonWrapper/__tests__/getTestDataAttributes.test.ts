import { getTestDataAttributes } from '../getTestDataAttributes';

describe('getTestDataAttributes', () => {
  it('empty object', () => {
    expect(getTestDataAttributes()).toStrictEqual({});
  });

  it('filled', () => {
    expect(
      getTestDataAttributes(
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
      'data-test-error': 'true',
      'data-test-warning': 'false',
      'data-test-disabled': 'true',
      'data-test-attribute-boolean': 'true',
      'data-test-attribute-string': 'state',
      'data-test-attribute-number': '0',
    });
  });
});

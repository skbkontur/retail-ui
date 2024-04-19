import { getCommonVisualStateDataAttributes } from '../utils/getCommonVisualStateDataAttributes';

describe('getCommonVisualStateDataAttributes', () => {
  it('empty object', () => {
    expect(getCommonVisualStateDataAttributes({})).toStrictEqual({});
  });

  it('getCommonVisualStateDataAttributes fill common attributes', () => {
    expect(
      getCommonVisualStateDataAttributes({ skip: true, error: true, warning: false, disabled: true }),
    ).toStrictEqual({
      'data-visual-state-error': '',
    });
  });
});

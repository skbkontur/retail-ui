import { extractCommonProps } from '../filterProps';

describe('extractCommonProps', () => {
  const common = {
    'data-tid': 'data-tid',
    'data-testid': 'data-testid',
    className: 'my-classname',
    style: {
      width: '100%',
      color: 'red',
    },
  };
  const rest = {
    value: 'value',
    id: 'id',
  };
  const [resultCommon, resultRest] = extractCommonProps({ ...common, ...rest });

  it('works', () => {
    expect(resultCommon).toMatchObject(common);
    expect(resultRest).toMatchObject(rest);
  });
});

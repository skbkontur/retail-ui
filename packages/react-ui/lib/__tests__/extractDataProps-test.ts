import { extractDataProps } from '../utils';

describe('extractDataProps', () => {
  it('correctly extracts data props', () => {
    const testDataProps = {
      'data-tid': 1,
      'data-testid': 2,
      'data-tip': 3,
    };
    const otherProps = {
      value: 'string',
      number: 2,
    };

    const { dataProps } = extractDataProps({ ...testDataProps, ...otherProps });

    expect(testDataProps).toMatchObject(dataProps);
  });

  it('correctly extracts all other props', () => {
    const testDataProps = {
      'data-tid': 1,
      'data-testid': 2,
      'data-tip': 3,
    };
    const otherProps = {
      value: 'string',
      number: 2,
    };

    const { restWithoutDataProps } = extractDataProps({ ...testDataProps, ...otherProps });

    expect(otherProps).toMatchObject(restWithoutDataProps);
  });
});

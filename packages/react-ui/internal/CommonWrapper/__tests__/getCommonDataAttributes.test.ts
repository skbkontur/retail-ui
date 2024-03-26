import { getCommonDataAttributes } from '../getCommonDataAttributes';

describe('getCommonDataAttributes', () => {
  it('empty object', () => {
    expect(getCommonDataAttributes()).toStrictEqual({});
  });

  it('object', () => {
    expect(
      getCommonDataAttributes({
        warning: null,
        warning2: undefined,
        error: true,
        stringState: 'state',
        dateState: new Date('2000-06-04T00:00:00.0Z').toISOString(),
        arrayState: ['1', '2', '3'].toString(),
        objectState: Object.entries({ prop: 'test' }).toString(),
      }),
    ).toStrictEqual({
      'data-comp-arrayState': '1,2,3',
      'data-comp-dateState': '2000-06-04T00:00:00.000Z',
      'data-comp-error': 'true',
      'data-comp-stringState': 'state',
      'data-comp-objectState': 'prop,test',
    });
  });
});

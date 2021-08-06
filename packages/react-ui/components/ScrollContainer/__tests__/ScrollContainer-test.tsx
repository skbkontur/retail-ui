import { convertScrollbarXScrollState, convertScrollbarYScrollState } from '../ScrollContainer.helpers';

describe('convertScrollbarXScrollState', () => {
  test('begin position left', () => {
    expect(convertScrollbarXScrollState('begin')).toBe('left');
  });

  test('middle position scroll', () => {
    expect(convertScrollbarXScrollState('middle')).toBe('scroll');
  });

  test('end position right', () => {
    expect(convertScrollbarXScrollState('end')).toBe('right');
  });
});

describe('convertScrollbarYScrollState', () => {
  test('begin position top', () => {
    expect(convertScrollbarYScrollState('begin')).toBe('top');
  });

  test('middle position scroll', () => {
    expect(convertScrollbarYScrollState('middle')).toBe('scroll');
  });

  test('end position bottom', () => {
    expect(convertScrollbarYScrollState('end')).toBe('bottom');
  });
});

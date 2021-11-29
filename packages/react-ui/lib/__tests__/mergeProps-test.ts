import { mergeProps } from '../mergeProps';

describe('mergeProps', () => {
  it('returns the same object if first argument is an empty object', () => {
    const obj = { a: 1, b: 2, c: 3 };

    expect(mergeProps({}, obj)).toEqual(obj);
  });

  it('returns the same object if second argument is an empty object', () => {
    const obj = { a: 1, b: 2, c: 3 };

    expect(mergeProps(obj, {})).toEqual(obj);
  });

  it('properly merges props', () => {
    const incoming = {
      style: { height: '30px', color: 'green', background: '#fff' },
    };
    const existing = {
      style: { height: '150px' },
      children: {},
      colorMode: 'light',
    };

    const result = {
      ...existing,
      style: { ...incoming.style, ...existing.style },
    };

    expect(mergeProps(incoming, existing)).toEqual(result);
  });
});

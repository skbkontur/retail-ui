import { Emitter } from '../Emitter';

const getCountListeners = (emitter: Emitter): number => {
  // @ts-expect-error: internal code is not typing
  const change = emitter._emitter._events?.change;
  if (typeof change !== 'undefined') {
    if (Array.isArray(change)) {
      return change.length;
    }
    return 1;
  }
  return 0;
};

describe('Emitter', () => {
  test('should add once listener', () => {
    const emitter = new Emitter();
    emitter.addListener('change', () => null);
    emitter.addListener('change', () => null);
    expect(getCountListeners(emitter)).toBe(2);
  });

  test('should emit event', () => {
    const emitter = new Emitter();
    const fn = jest.fn();
    emitter.addListener('change', fn);
    emitter.emit('change');
    expect(fn).toHaveBeenCalledTimes(1);
  });

  test('should clean listener by `removeListener()`', () => {
    const emitter = new Emitter();
    const fn = () => null;
    emitter.addListener('change', fn);
    emitter.removeListener('change', fn);
    expect(getCountListeners(emitter)).toBe(0);
  });

  test('should clean listener by `remove()`', () => {
    const emitter = new Emitter();
    const fallbackFBEmitter = emitter.addListener('change', () => null);
    fallbackFBEmitter.remove();
    expect(getCountListeners(emitter)).toBe(0);
  });
});

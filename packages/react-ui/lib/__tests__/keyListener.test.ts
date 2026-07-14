import { KeyListener } from '../events/keyListener.js';

describe('keyListener', () => {
  it('should create same instance for the same globalThis', () => {
    const first = new KeyListener(globalThis);
    const second = new KeyListener(globalThis);

    expect(first).toBe(second);
  });

  it('should create different instances for different globalThis', () => {
    const first = new KeyListener(globalThis);
    const second = new KeyListener({});

    expect(first).not.toBe(second);
  });

  it('should register listeners only once per globalObject', () => {
    const addEventListener = vi.fn();
    const globalObject = { addEventListener };
    new KeyListener(globalObject);
    new KeyListener(globalObject);
    new KeyListener(globalObject);
    expect(addEventListener).toHaveBeenCalledTimes(2);
    expect(addEventListener).toHaveBeenCalledWith('keydown', expect.any(Function));
    expect(addEventListener).toHaveBeenCalledWith('mousedown', expect.any(Function));
  });
});

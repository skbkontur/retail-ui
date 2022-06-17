import { memo } from '../memo';

describe('memo', () => {
  it('should not call function for same args twice', () => {
    const funcRef = jest.fn((value: number) => value);

    const firstArg = jest.fn();

    const memoizedFunction = memo(funcRef);

    const firstCalling = memoizedFunction(firstArg);
    const secondCalling = memoizedFunction(firstArg);

    expect(firstCalling).toEqual(secondCalling);
    expect(funcRef).toBeCalledTimes(1);
  });
  it('should call function for different args twice', () => {
    const funcRef = jest.fn((value: number) => value);

    const firstArg = jest.fn();
    const secondArg = jest.fn();

    const memoizedFunction = memo(funcRef);

    const firstCalling = memoizedFunction(firstArg);

    const secondCalling = memoizedFunction(secondArg);
    expect(firstCalling).not.toEqual(secondCalling);
    expect(funcRef).toBeCalledTimes(2);
  });
});

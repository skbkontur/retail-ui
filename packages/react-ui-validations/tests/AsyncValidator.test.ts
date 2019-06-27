/* tslint:disable:no-shadowed-variable */

import { createValidation } from '../stories/AsyncStories/Validations';
import { ValidationInfo } from '../src';
import OperationCanceledError from '../stories/AsyncStories/Cancellation/OperationCanceledError';

function delay(timeout: number): Promise<void> {
  return new Promise<void>(resolve => {
    setTimeout(resolve, timeout);
  });
}

// https://github.com/TheBrainFamily/wait-for-expect/blob/master/src/index.ts
// @ts-ignore
function waitForExpect(expectation: () => void, timeout = 1000, interval = 50): Promise<void> {
  const startTime = Date.now();
  return new Promise<void>((resolve, reject) => {
    const rejectOrRerun = (error: Error) => {
      if (Date.now() - startTime >= timeout) {
        reject(error);
        return;
      }
      setTimeout(runExpectation, interval);
    };

    function runExpectation() {
      try {
        Promise.resolve(expectation())
          .then(() => resolve())
          .catch(rejectOrRerun);
      } catch (error) {
        rejectOrRerun(error);
      }
    }

    setTimeout(runExpectation, 0);
  });
}

describe('Validator', () => {
  it('stop on first invalid check', async () => {
    const check1 = jest.fn();
    const check2 = jest.fn();
    const check3 = jest.fn();

    const validation = createValidation<string>(b => {
      b.invalid(async x => check1() || x === '___', 'error1', 'lostfocus');
      b.invalid(async x => check2() || x === 'bad', 'error2', 'lostfocus');
      b.invalid(async x => check3() || x === 'bad', 'error3', 'lostfocus');
    });

    const validator = validation.createValidator('bad', callback => callback());

    await validator.lostfocus({ force: true });

    const actual = validator.reader.get();
    const expected: ValidationInfo = { message: 'error2', type: 'lostfocus', level: 'error' };
    expect(actual).toStrictEqual(expected);

    expect(check1).toHaveBeenCalledTimes(1);
    expect(check2).toHaveBeenCalledTimes(1);
    expect(check3).toHaveBeenCalledTimes(0);
  });

  it('do not run local calculation when validation unreachable', async () => {
    const calc = jest.fn();

    const validation = createValidation<string>(b => {
      const isInvalid = b.local('local', x => x, async () => calc() || true);
      b.invalid(async () => true, 'error', 'lostfocus');
      b.invalid(async () => await isInvalid(), 'unreachable', 'lostfocus');
    });

    const validator = validation.createValidator('bad', callback => callback());

    await validator.lostfocus({ force: true });

    const actual = validator.reader.get();
    const expected: ValidationInfo = { message: 'error', type: 'lostfocus', level: 'error' };
    expect(actual).toStrictEqual(expected);
    expect(calc).toHaveBeenCalledTimes(0);
  });

  it('do not run local callback when dependency not changed', async () => {
    const calc = jest.fn();
    const validate = jest.fn();

    const validation = createValidation<string>(b => {
      const isInvalid = b.local('local', x => x[0], async () => calc() || true);
      b.invalid(
        async () => {
          await isInvalid();
          validate();
          return true;
        },
        'error',
        'lostfocus',
      );
    });

    const validator = validation.createValidator('bad', callback => callback());

    await validator.lostfocus({ force: true });
    validator.setValue('bad2');
    await validator.lostfocus({ force: true });

    expect(validate).toHaveBeenCalledTimes(2);
    expect(calc).toHaveBeenCalledTimes(1);
  });

  it('do not validate when model not changed', async () => {
    const validate = jest.fn();

    const validation = createValidation<{ value: string }>(b => {
      b.invalid(async () => validate() || true, 'error', 'lostfocus');
    });

    const validator = validation.createValidator({ value: 'xxx' }, callback => callback());

    validator.setValue({ value: 'yyy' });
    validator.setValue({ value: 'xxx' });
    await validator.lostfocus();

    expect(validate).toHaveBeenCalledTimes(0);
  });

  it('force validate even when model not changed', async () => {
    const validate = jest.fn();

    const validation = createValidation<{ value: string }>(b => {
      b.invalid(async () => validate() || true, 'error', 'lostfocus');
    });

    const validator = validation.createValidator({ value: 'xxx' }, callback => callback());
    await validator.lostfocus({ force: true });
    expect(validate).toHaveBeenCalledTimes(1);
  });

  it('call onChange after validate', async () => {
    const handleChange = jest.fn();

    const validation = createValidation<string>(b => {
      b.invalid(async () => true, 'error', 'lostfocus');
    });

    const validator = validation.createValidator('', callback => {
      handleChange();
      callback();
    });

    validator.lostfocus({ force: true });
    expect(handleChange).toHaveBeenCalledTimes(0);
    await delay(10);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('onChange merge', async () => {
    const handleChange = jest.fn();

    const validation = createValidation<{ a: string; b: string }>(b => {
      b.prop(
        x => x.a,
        b => {
          b.invalid(async () => true, 'error', 'lostfocus');
        },
      );
      b.prop(
        x => x.b,
        b => {
          b.invalid(async () => true, 'error', 'lostfocus');
        },
      );
    });

    const validator = validation.createValidator({ a: '', b: '' }, callback => {
      handleChange();
      callback();
    });
    validator.lostfocus({ force: true });
    await delay(10);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('do not throw on validation reject by default', async () => {
    const validation = createValidation<string>(b => {
      b.invalid(async () => await delay(10), 'error', 'lostfocus');
    });

    const validator = validation.createValidator('', c => c());

    const promise = expect(validator.lostfocus({ force: true })).resolves.toEqual(undefined);
    validator.lostfocus({ force: true });
    await promise;
  });

  it('throw on validation reject when `throwOnReject: true`', async () => {
    const validation = createValidation<string>(b => {
      b.invalid(async () => await delay(10), 'error', 'lostfocus');
    });

    const validator = validation.createValidator('', c => c());

    const promise = expect(validator.lostfocus({ force: true, throwOnReject: true })).rejects.toBeInstanceOf(
      OperationCanceledError,
    );
    validator.lostfocus({ force: true });
    await promise;
  });

  describe('validation sequences when model not changed', () => {
    it('immediate then immediate ignore', async () => {
      const fn = jest.fn();
      const validation = createValidation<string>(b => fn());
      const validator = validation.createValidator('', c => c());
      validator.setValue('value');

      await validator.immediate();
      expect(fn).toHaveBeenCalledTimes(1);

      await validator.immediate();
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('immediate then lostfocus validate', async () => {
      const fn = jest.fn();
      const validation = createValidation<string>(b => fn());
      const validator = validation.createValidator('', c => c());
      validator.setValue('value');

      await validator.immediate();
      expect(fn).toHaveBeenCalledTimes(1);

      await validator.lostfocus();
      expect(fn).toHaveBeenCalledTimes(2);
    });

    it('immediate then submit validate', async () => {
      const fn = jest.fn();
      const validation = createValidation<string>(b => fn());
      const validator = validation.createValidator('', c => c());
      validator.setValue('value');

      await validator.immediate();
      expect(fn).toHaveBeenCalledTimes(1);

      await validator.submit(async x => x.isValid);
      expect(fn).toHaveBeenCalledTimes(2);
    });

    it('lostfocus then immediate ignore', async () => {
      const fn = jest.fn();
      const validation = createValidation<string>(b => fn());
      const validator = validation.createValidator('', c => c());
      validator.setValue('value');

      await validator.lostfocus();
      expect(fn).toHaveBeenCalledTimes(1);

      await validator.immediate();
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('lostfocus then lostfocus ignore', async () => {
      const fn = jest.fn();
      const validation = createValidation<string>(b => fn());
      const validator = validation.createValidator('', c => c());
      validator.setValue('value');

      await validator.lostfocus();
      expect(fn).toHaveBeenCalledTimes(1);

      await validator.lostfocus();
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('lostfocus then submit validate', async () => {
      const fn = jest.fn();
      const validation = createValidation<string>(b => fn());
      const validator = validation.createValidator('', c => c());
      validator.setValue('value');

      await validator.lostfocus();
      expect(fn).toHaveBeenCalledTimes(1);

      await validator.submit(async x => x.isValid);
      expect(fn).toHaveBeenCalledTimes(2);
    });

    it('submit then immediate ignore', async () => {
      const fn = jest.fn();
      const validation = createValidation<string>(b => fn());
      const validator = validation.createValidator('', c => c());
      validator.setValue('value');

      await validator.submit(async x => x.isValid);
      expect(fn).toHaveBeenCalledTimes(1);

      await validator.immediate();
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('submit then lostfocus ignore', async () => {
      const fn = jest.fn();
      const validation = createValidation<string>(b => fn());
      const validator = validation.createValidator('', c => c());
      validator.setValue('value');

      await validator.submit(async x => x.isValid);
      expect(fn).toHaveBeenCalledTimes(1);

      await validator.lostfocus();
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('submit then submit validate', async () => {
      const fn = jest.fn();
      const validation = createValidation<string>(b => fn());
      const validator = validation.createValidator('', c => c());
      validator.setValue('value');

      await validator.submit(async x => x.isValid);
      expect(fn).toHaveBeenCalledTimes(1);

      await validator.submit(async x => x.isValid);
      expect(fn).toHaveBeenCalledTimes(2);
    });
  });

  //////////////
  /*
  it('root invalid', () => {
    const validation = createValidation<string>(b => {
      b.local('local', x => x[0], async x => x === 'b');
      b.invalid(async x => x === 'bad', 'message', 'lostfocus');
    });

    const validator = validation.createValidator('', null, () => undefined);

    validator.setValue('bad');
    validator.lostfocus();
    const reader = validator.reader;
    const validationInfo = reader.get();

    expect(validationInfo).toStrictEqual({ message: 'error', type: undefined, level: undefined });
  });
  */
});

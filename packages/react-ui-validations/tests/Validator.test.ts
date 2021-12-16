import { createValidator } from '../src/Validations';
import { Nullable } from '../typings/Types';

describe('Validator', () => {
  it('root invalid', () => {
    const validate = createValidator<string>((b) => {
      b.invalid((x) => x === 'bad', 'error');
    });

    const reader = validate('bad');
    const validationInfo = reader.get();

    expect(validationInfo).toStrictEqual({
      message: 'error',
      type: undefined,
      level: undefined,
      independent: undefined,
    });
  });

  it('root valid', () => {
    const validate = createValidator<string>((b) => {
      b.invalid((x) => x === 'bad', 'error');
    });

    const reader = validate('ok');
    const validationInfo = reader.get();

    expect(validationInfo).toBe(null);
  });

  it('prop invalid', () => {
    interface Data {
      value: string;
    }

    const validate = createValidator<Data>((b) => {
      b.prop(
        (x) => x.value,
        (b) => {
          b.invalid((x) => x === 'bad', 'error');
        },
      );
    });

    const reader = validate({ value: 'bad' });
    const validationInfo = reader.getNode((x) => x.value).get();

    expect(validationInfo).toStrictEqual({
      message: 'error',
      type: undefined,
      level: undefined,
      independent: undefined,
    });
  });

  it('prop getNodeByKey', () => {
    interface Data {
      value: string;
    }

    const validate = createValidator<Data>((b) => {
      b.prop(
        (x) => x.value,
        (b) => {
          b.invalid((x) => x === 'bad', 'error');
        },
      );
    });

    const reader = validate({ value: 'bad' });
    const validationInfo = reader.getNodeByKey('value').get();

    expect(validationInfo).toStrictEqual({
      message: 'error',
      type: undefined,
      level: undefined,
      independent: undefined,
    });
  });

  it('rule does not apply for missing nodes', () => {
    interface Data {
      object: Nullable<{
        value: string;
      }>;
    }

    const objectRule = jest.fn();
    const valueRule = jest.fn();

    const validate = createValidator<Data>((b) => {
      b.prop(
        (x) => x.object,
        (b) => {
          objectRule();
          b.prop(
            (x) => x.value,
            (b) => {
              valueRule();
            },
          );
        },
      );
    });

    validate({ object: null });
    expect(objectRule).toHaveBeenCalledTimes(1);
    expect(valueRule).toHaveBeenCalledTimes(0);
  });

  it('read validation for not configured node', () => {
    interface Data {
      value: string;
    }

    const validate = createValidator<Data>(() => undefined);

    const reader = validate({ value: 'sad' });
    const validationInfo = reader.getNode((x) => x.value).get();
    expect(validationInfo).toBe(null);
  });

  it('prop valid', () => {
    interface Data {
      value: string;
    }

    const validate = createValidator<Data>((b) => {
      b.prop(
        (x) => x.value,
        (b) => {
          b.invalid((x) => x === 'bad', 'error');
        },
      );
    });

    const reader = validate({ value: 'ok' });
    const validationInfo = reader.getNode((x) => x.value).get();

    expect(validationInfo).toBe(null);
  });

  it('stop on first invalid check', () => {
    const check1 = jest.fn();
    const check2 = jest.fn();
    const check3 = jest.fn();

    const validate = createValidator<string>((b) => {
      b.invalid((x) => check1() || x === '___', 'error1');
      b.invalid((x) => check2() || x === 'bad', 'error2');
      b.invalid((x) => check3() || x === 'bad', 'error3');
    });

    const reader = validate('bad');
    const validationInfo = reader.get();

    expect(validationInfo).toStrictEqual({
      message: 'error2',
      type: undefined,
      level: undefined,
      independent: undefined,
    });
    expect(check1).toHaveBeenCalledTimes(1);
    expect(check2).toHaveBeenCalledTimes(1);
    expect(check3).toHaveBeenCalledTimes(0);
  });

  it('explicit validation type and level', () => {
    const validate = createValidator<string>((b) => {
      b.invalid((x) => x === 'bad', 'error', 'submit', 'warning');
    });

    const reader = validate('bad');
    const validationInfo = reader.get();

    expect(validationInfo).toStrictEqual({
      message: 'error',
      type: 'submit',
      level: 'warning',
      independent: undefined,
    });
  });

  it('prop empty path', () => {
    const validate = createValidator<string>((b) => {
      b.prop(
        (x) => x,
        (b) => {
          b.invalid((x) => x === 'bad', 'error');
        },
      );
    });

    const reader = validate('bad');
    const validationInfo = reader.get();

    expect(validationInfo).toStrictEqual({
      message: 'error',
      type: undefined,
      level: undefined,
      independent: undefined,
    });
  });

  it('array item invalid', () => {
    const validate = createValidator<string[]>((b) => {
      b.array(
        (x) => x,
        (b) => {
          b.invalid((x) => x === 'bad', 'error');
        },
      );
    });

    const reader = validate(['bad']);
    const validationInfo = reader.getNodeByIndex(0).get();

    expect(validationInfo).toStrictEqual({
      message: 'error',
      type: undefined,
      level: undefined,
      independent: undefined,
    });
  });

  it('prop value argument', () => {
    const propRule = jest.fn();

    const validate = createValidator<string>((b) => {
      b.prop(
        (x) => x,
        (b, v) => {
          propRule(v);
        },
      );
    });

    validate('xxx');
    expect(propRule).toHaveBeenCalledTimes(1);
    expect(propRule).toHaveBeenCalledWith('xxx');
  });

  it('array value index argument', () => {
    const itemRule = jest.fn();
    const validate = createValidator<string[]>((b) => {
      b.array(
        (x) => x,
        (b, v, i, a) => {
          itemRule(v, i, a);
        },
      );
    });

    validate(['xxx', 'yyy', 'zzz']);

    expect(itemRule).toHaveBeenCalledTimes(3);
    expect(itemRule).toHaveBeenNthCalledWith(1, 'xxx', 0, ['xxx', 'yyy', 'zzz']);
    expect(itemRule).toHaveBeenNthCalledWith(2, 'yyy', 1, ['xxx', 'yyy', 'zzz']);
    expect(itemRule).toHaveBeenNthCalledWith(3, 'zzz', 2, ['xxx', 'yyy', 'zzz']);
  });
});

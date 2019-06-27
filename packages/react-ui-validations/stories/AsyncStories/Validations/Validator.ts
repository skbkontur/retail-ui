import { ValidationWriter } from './ValidationWriter';
import { ValidationReader } from './ValidationReader';
import { RootValidationRule, ValidationObject } from './Types';
import CancellationTokenSource from '../Cancellation/CancellationTokenSource';
import { RootValidationBuilder } from './ValidationBuilder';
import { Nullable } from '../../../typings/Types';
import PromiseHelper from '../PromiseHelper';
import OperationCanceledError from '../Cancellation/OperationCanceledError';
import { ValidationBehaviour } from '../../../src';

const isEqual = require('lodash.isequal');

export interface ValidateOptions {
  force?: boolean;
  invalidateLocals?: boolean;
  throwOnReject?: boolean;
}

export interface SubmitContinuation<TSubmit> {
  endSubmit: (value: TSubmit) => Promise<SubmitValidationResult>;
  isValid: boolean;
  hasWarnings: boolean;
}

export interface SubmitValidationResult {
  isValid: boolean;
  hasWarnings: boolean;
}

export class Validator<T, TExtra, TSubmit> {
  private readonly rule: RootValidationRule<T, TExtra, TSubmit>;
  private readonly onChange: (callback: () => void) => void;
  private value: T;
  private nextValue: T;
  private lastType: Nullable<ValidationBehaviour> = null;
  // private extra: TExtra;
  private writer: ValidationWriter<T> = new ValidationWriter();
  private onChangeRequested: Nullable<Promise<void>> = null;
  private cancellation: Nullable<CancellationTokenSource> = null;

  constructor(
    rule: RootValidationRule<T, TExtra, TSubmit>,
    value: T,
    extra: TExtra,
    onChange: (callback: () => void) => void,
  ) {
    this.rule = rule;
    this.value = value;
    this.nextValue = value;
    // this.extra = extra;
    this.onChange = onChange;
  }

  get reader(): ValidationReader<T> {
    return this.writer.reader;
  }

  public setValue = (value: T) => {
    this.nextValue = value;
  };

  public setPartial = (value: Partial<T>) => {
    this.setValue({ ...this.nextValue, ...value });
  };

  public async submit(
    isValid: (result: SubmitValidationResult) => Promise<boolean>,
    func?: () => Promise<TSubmit>,
    options?: ValidateOptions,
  ): Promise<boolean> {
    const submit = await this.beginSubmit(options);
    if (!(await isValid({ isValid: submit.isValid, hasWarnings: submit.hasWarnings }))) {
      return false;
    }
    if (!func) {
      return true;
    }
    const data = await func();
    const result = await submit.endSubmit(data);
    return await isValid(result);
  }

  public async beginSubmit(options?: ValidateOptions): Promise<SubmitContinuation<TSubmit>> {
    await this.validate('submit', { ...options, force: true });
    const infos = this.writer.getInfos();
    const hasErrors = infos.some(x => !!x.validation && x.validation.level === 'error');
    const hasWarnings = infos.some(x => !!x.validation && x.validation.level === 'warning');
    return {
      endSubmit: this.endSubmit,
      isValid: !hasErrors,
      hasWarnings,
    };
  }

  public immediate = (options: ValidateOptions = {}): Promise<void> => {
    return this.validate('immediate', options);
  };

  public lostfocus = (options: ValidateOptions = {}): Promise<void> => {
    return this.validate('lostfocus', { ...options, force: options.force || this.lastType === 'immediate' });
  };

  private validate = async (type: ValidationBehaviour, options: ValidateOptions = {}): Promise<void> => {
    if (!options.force && isEqual(this.nextValue, this.value)) {
      return;
    }

    this.lastType = type;
    this.cancellation = CancellationTokenSource.renew(this.cancellation);
    const value = (this.value = this.nextValue);

    const source = this.writer;
    this.writer = new ValidationWriter();

    const xxx = new RootValidationBuilder<T, TExtra, TSubmit>(value).build(this.rule);
    for (const local of xxx.locals) {
      this.writer.getOrCreateNode(local.path).addLocal(local);
    }

    for (const validation of xxx.validations) {
      if (validation.validateOn[type]) {
        this.writer.getOrCreateNode(validation.path).addValidation(validation.validate);
      }
    }

    const promises: Array<Promise<void>> = [];
    const infos = this.writer.getInfos();
    for (const item of infos) {
      const path = item.path.map(x => x.key);
      const info = source.getInfo(path);

      // locals
      for (const name in item.locals) {
        if (!item.locals.hasOwnProperty(name)) {
          continue;
        }

        const local = item.locals[name];
        const oldLocal = info ? info.locals[name] : null;

        if (oldLocal && isEqual(oldLocal.dependency, local.dependency)) {
          item.locals[name] = oldLocal;
          local.promiseLazySource.resolve(() => oldLocal.promiseLazySource.promise);
          continue;
        }

        if (oldLocal && oldLocal.cancellation) {
          oldLocal.cancellation.cancel();
        }

        local.cancellation = new CancellationTokenSource();
        const token = local.cancellation.token;
        local.promiseLazySource.resolve(() => PromiseHelper.withCancellation(local.calculate(token), token));
      }

      // validations
      if (info && info.cancellation) {
        info.cancellation.cancel();
      }
      if (item.validateCallbacks.length) {
        const cancellation = new CancellationTokenSource();
        const getValidationResult = async (): Promise<Nullable<ValidationObject>> => {
          for (const validate of item.validateCallbacks) {
            const validation = await PromiseHelper.withCancellation(validate(cancellation.token), cancellation.token);
            if (validation) {
              return validation;
            }
          }
          return null;
        };
        const promise = PromiseHelper.run(async () => {
          try {
            item.validation = await getValidationResult();
            item.cancellation = null;
            this.requestOnChange();
          } catch (e) {
            if (!(e instanceof OperationCanceledError)) {
              throw e;
            }
          }
        });
        promises.push(promise);
        item.cancellation = cancellation;
      }
    }

    const oldInfos = source.getInfos();
    for (const info of oldInfos) {
      const path = info.path.map(x => x.key);
      if (!this.writer.getInfo(path)) {
        if (info.cancellation) {
          info.cancellation.cancel();
        }
      }
    }
    this.requestOnChange();
    try {
      await PromiseHelper.withCancellation(Promise.all(promises), this.cancellation.token);
      await this.onChangeRequested;
    } catch (e) {
      if (!(e instanceof OperationCanceledError) || options.throwOnReject) {
        throw e;
      }
    }
  };

  private requestOnChange(): Promise<void> {
    if (!this.onChangeRequested) {
      this.onChangeRequested = new Promise(resolve => {
        setImmediate(() => {
          this.onChange(resolve);
          this.onChangeRequested = null;
        });
      });
    }
    return this.onChangeRequested;
  }

  private endSubmit = async (value: TSubmit): Promise<SubmitValidationResult> => {
    this.writer = new ValidationWriter();

    const xxx = new RootValidationBuilder<T, TExtra, TSubmit>(this.value).build(this.rule);
    for (const submitted of xxx.submitted) {
      this.writer.getOrCreateNode(submitted.path).addSubmitted(submitted.validate);
    }

    let isValid = true;
    let hasWarnings = false;
    const infos = this.writer.getInfos();
    for (const item of infos) {
      if (item.submittedCallbacks.length) {
        const getValidationResult = (): Nullable<ValidationObject> => {
          for (const validate of item.submittedCallbacks) {
            const validation = validate(value);
            if (validation) {
              return validation;
            }
          }
          return null;
        };
        item.validation = getValidationResult();
        if (item.validation && item.validation.level === 'error') {
          isValid = false;
        }
        if (item.validation && item.validation.level === 'warning') {
          hasWarnings = true;
        }
      }
    }

    await this.requestOnChange();
    return { isValid, hasWarnings };
  };
}

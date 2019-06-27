import {
  ItemValidationRule,
  NodeLocal,
  NodePath,
  NodeSubmittedValidation,
  NodeValidation,
  RootValidationRule,
  ValidateOn,
  ValidationRule,
} from './Types';
import { extractKey } from './Keys';
import { LambdaPath, PathTokensCache } from '../../../src/Validations/PathHelper';
import { Nullable } from '../../../typings/Types';
import { ValidationBehaviour } from '../../../src';
import { ValidationLevel } from '../../../src/ValidationWrapperInternal';
import PromiseLazySource from './PromiseLazySource';
import CancellationToken from '../Cancellation/CancellationToken';

interface PathInfo<T> {
  data: T;
  path: NodePath[];
}

type IsInvalidResult = boolean | React.ReactNode | { message: React.ReactNode };

export interface Xxx {
  locals: NodeLocal[];
  validations: NodeValidation[];
  submitted: NodeSubmittedValidation[];
}

export interface ValidationOptions {
  level?: Nullable<ValidationLevel>;
  immediate?: Nullable<boolean>;
  lostfocus?: Nullable<boolean>;
  submit?: Nullable<boolean>;
  debounce?: Nullable<number>;
}

export class ValidationBuilder<TRoot, T, TExtra, TSubmit> {
  protected readonly data: T;
  protected readonly xxx: Xxx;
  private readonly path: NodePath[];
  private readonly tokens: PathTokensCache = new PathTokensCache(); // todo move to constructor

  constructor(xxx: Xxx, path: NodePath[], data: T) {
    this.data = data;
    this.xxx = xxx;
    this.path = path;
  }

  public prop<TChild>(lambdaPath: LambdaPath<T, TChild>, rule: ValidationRule<TRoot, TChild, TExtra, TSubmit>): void {
    const info = this.getPathInfo(lambdaPath);
    if (info == null) {
      return;
    }
    const builder = new ValidationBuilder<TRoot, TChild, TExtra, TSubmit>(this.xxx, info.path, info.data as any);
    rule(builder, builder.data);
  }

  public array<TChild>(
    lambdaPath: LambdaPath<T, TChild[]>,
    rule: ItemValidationRule<TRoot, TChild, TExtra, TSubmit>,
  ): void {
    const info = this.getPathInfo(lambdaPath);
    if (info == null || !Array.isArray(info.data)) {
      return;
    }

    const array = info.data;
    for (let i = 0; i < array.length; ++i) {
      const item = array[i];
      const path = [...info.path, { name: i.toString(), key: extractKey(item) || i.toString() }];
      const builder = new ValidationBuilder<TRoot, TChild, TExtra, TSubmit>(this.xxx, path, item);
      rule(builder, builder.data, i, array);
    }
  }

  public local<TDependency, TLocal>(
    name: string | number,
    getDependency: (value: T) => TDependency,
    formula: (dependency: TDependency, cancellation: CancellationToken) => Promise<TLocal>,
  ): () => Promise<TLocal> {
    const value = this.data;
    const dependency = getDependency(value);
    const promiseLazySource = new PromiseLazySource<TLocal>();
    this.xxx.locals.push({
      path: this.path,
      dependency,
      calculate: async cancellation => await formula(dependency, cancellation),
      promiseLazySource,
      name: name.toString(),
    });
    return () => {
      return promiseLazySource.promise;
    };
  }

  public invalid<TDependency>(
    isInvalid: (current: T, cancellation: CancellationToken) => IsInvalidResult | Promise<IsInvalidResult>,
    message: React.ReactNode,
    type: ValidationBehaviour,
    options: ValidationOptions = {},
  ): void {
    const value = this.data;
    const level: ValidationLevel = options.level || 'error';
    this.xxx.validations.push({
      path: this.path,
      validate: async cancellation => ((await isInvalid(value, cancellation)) ? { type, message, level } : null),
      type,
      debounce: options.debounce || 0,
      validateOn: this.getValidateOn(type, {
        immediate: options.immediate,
        lostfocus: options.lostfocus,
        submit: options.submit,
      }),
    });
  }

  public submitted(
    isInvalid: (submit: TSubmit, current: T) => boolean,
    message: React.ReactNode,
    level?: ValidationLevel,
  ): void {
    const value = this.data;

    this.xxx.submitted.push({
      path: this.path,
      validate: submit => (isInvalid(submit, value) ? { type: 'submit', message, level } : null),
    });
  }

  private getPathInfo<TChild>(lambdaPath: LambdaPath<T, TChild>): Nullable<PathInfo<TChild>> {
    const path = this.tokens.getOrAdd(lambdaPath);
    const nodePath: NodePath[] = [];

    let data: any = this.data;
    for (const part of path) {
      if (data == null) {
        return null;
      }
      data = data[part];
      nodePath.push({ name: part, key: extractKey(data) || part });
    }
    return { data, path: [...this.path, ...nodePath] };
  }

  private coalesceBoolean(value: Nullable<boolean>, coalesce: boolean): boolean {
    return typeof value === 'boolean' ? value : coalesce;
  }

  private getValidateOn(
    type: ValidationBehaviour,
    options: Record<ValidationBehaviour, Nullable<boolean>>,
  ): ValidateOn {
    switch (type) {
      case 'immediate':
        return {
          immediate: true,
          lostfocus: this.coalesceBoolean(options.lostfocus, true),
          submit: this.coalesceBoolean(options.submit, true),
        };
      case 'lostfocus':
        return {
          immediate: this.coalesceBoolean(options.immediate, false),
          lostfocus: true,
          submit: this.coalesceBoolean(options.submit, true),
        };
      case 'submit':
        return {
          immediate: this.coalesceBoolean(options.immediate, false),
          lostfocus: this.coalesceBoolean(options.lostfocus, false),
          submit: true,
        };
    }
  }
}

export class RootValidationBuilder<TRoot, TExtra, TSubmit> extends ValidationBuilder<TRoot, TRoot, TExtra, TSubmit> {
  constructor(data: TRoot) {
    super({ locals: [], validations: [], submitted: [] }, [], data);
  }

  public build(rule: RootValidationRule<TRoot, TExtra, TSubmit>): Xxx {
    rule(this, this.data);
    return this.xxx;
  }
}

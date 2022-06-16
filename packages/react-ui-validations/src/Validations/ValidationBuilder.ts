import React from 'react';

import { Nullable } from '../../typings/Types';
import { ValidationBehaviour, ValidationLevel } from '../ValidationWrapperInternal';
import { ValidationInfo } from '../ValidationWrapper';
import { isNullable } from '../utils/isNullable';

import { LambdaPath, PathTokensCache } from './PathHelper';
import { ValidationWriter } from './ValidationWriter';
import { ItemValidationRule, ValidationRule } from './Types';

interface PathInfo<T> {
  data: T;
  path: string[];
}

export class ValidationBuilder<TRoot, T> {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private readonly writer: ValidationWriter<TRoot>,
    private readonly tokens: PathTokensCache,
    private readonly path: string[],
    private readonly data: T,
  ) {}

  public prop<TChild>(lambdaPath: LambdaPath<T, TChild>, rule: ValidationRule<TRoot, TChild>): void {
    const info = this.getPathInfo(lambdaPath);
    if (isNullable(info)) {
      return;
    }

    const builder = new ValidationBuilder<TRoot, TChild>(this.writer, this.tokens, info.path, info.data);
    rule(builder, builder.data);
  }

  public array<TChild>(lambdaPath: LambdaPath<T, TChild[]>, rule: ItemValidationRule<TRoot, TChild>): void {
    const info = this.getPathInfo(lambdaPath);
    if (isNullable(info) || !Array.isArray(info.data)) {
      return;
    }

    const array = info.data;
    for (let i = 0; i < array.length; ++i) {
      const path = [...info.path, i.toString()];
      const builder = new ValidationBuilder<TRoot, TChild>(this.writer, this.tokens, path, array[i]);
      rule(builder, builder.data, i, array);
    }
  }

  public invalid(isInvalid: (value: T) => boolean, validationInfo: ValidationInfo): void;
  public invalid(
    isInvalid: (value: T) => boolean,
    message: React.ReactNode,
    type?: ValidationBehaviour,
    level?: ValidationLevel,
    independent?: boolean,
  ): void;

  public invalid(
    isInvalid: (value: T) => boolean,
    messageOrValidationInfo: React.ReactNode | ValidationInfo,
    type?: ValidationBehaviour,
    level?: ValidationLevel,
    independent?: boolean,
  ) {
    const validationWriter = this.writer.getNode<T>(this.path);
    if (validationWriter.isValidated()) {
      return;
    }

    const invalid = isInvalid(this.data);
    if (!invalid) {
      return;
    }

    if (isValidationInfo(messageOrValidationInfo)) {
      validationWriter.set(messageOrValidationInfo);
    } else {
      validationWriter.set({ message: messageOrValidationInfo, type, level, independent });
    }
  }

  private getPathInfo<TChild>(lambdaPath: LambdaPath<T, TChild>): Nullable<PathInfo<TChild>> {
    const path = this.tokens.getOrAdd(lambdaPath);

    let data: any = this.data;
    for (const part of path) {
      if (isNullable(data)) {
        return null;
      }
      data = data[part];
    }

    return { data, path: [...this.path, ...path] };
  }
}

const isValidationInfo = (argument: unknown): argument is ValidationInfo =>
  typeof argument === 'object' && Object.prototype.hasOwnProperty.call(argument, 'message');

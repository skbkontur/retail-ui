import * as React from 'react';
import { Nullable } from '../../typings/Types';
import { LambdaPath, PathTokensCache } from './PathHelper';
import { ValidationWriter } from './ValidationWriter';
import { ItemValidationRule, ValidationRule } from './Types';
import { ValidationBehaviour, ValidationLevel } from '../ValidationWrapperInternal';

interface PathInfo<T> {
  data: T;
  path: string[];
}

export class ValidationBuilder<TRoot, T> {
  constructor(
    private readonly writer: ValidationWriter<TRoot>,
    private readonly tokens: PathTokensCache,
    private readonly path: string[],
    private readonly data: T,
  ) {}

  public prop<TChild>(lambdaPath: LambdaPath<T, TChild>, rule: ValidationRule<TRoot, TChild>): void {
    const info = this.getPathInfo(lambdaPath);
    if (info == null) {
      return;
    }

    const builder = new ValidationBuilder<TRoot, TChild>(this.writer, this.tokens, info.path, info.data);
    rule(builder, builder.data);
  }

  public array<TChild>(lambdaPath: LambdaPath<T, TChild[]>, rule: ItemValidationRule<TRoot, TChild>): void {
    const info = this.getPathInfo(lambdaPath);
    if (info == null || !Array.isArray(info.data)) {
      return;
    }

    const array = info.data;
    for (let i = 0; i < array.length; ++i) {
      const path = [...info.path, i.toString()];
      const builder = new ValidationBuilder<TRoot, TChild>(this.writer, this.tokens, path, array[i]);
      rule(builder, builder.data, i, array);
    }
  }

  public invalid(
    isInvalid: (value: T) => boolean,
    message: React.ReactNode,
    type?: ValidationBehaviour,
    level?: ValidationLevel,
  ): void {
    const validationWriter = this.writer.getNode<T>(this.path);
    if (validationWriter.isValidated()) {
      return;
    }

    const invalid = isInvalid(this.data);
    if (!invalid) {
      return;
    }

    validationWriter.set({ message, type, level });
  }

  private getPathInfo<TChild>(lambdaPath: LambdaPath<T, TChild>): Nullable<PathInfo<TChild>> {
    const path = this.tokens.getOrAdd(lambdaPath);

    let data: any = this.data;
    for (const part of path) {
      if (data == null) {
        return null;
      }
      data = data[part];
    }

    return { data, path: [...this.path, ...path] };
  }
}

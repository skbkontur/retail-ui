import * as React from "react";
import {Nullable} from "../../typings/Types";
import {FunctionHelper, LambdaPath} from "./FunctionHelper";
import {ValidationWriter} from "./ValidationWriter";
import {ItemValidationRule, ValidationRule} from "./Types";
import {ValidationBehaviour, ValidationLevel} from "../ValidationWrapper";

interface PathInfo<T> {
  data: T;
  path: string[];
}

export interface BuilderOptions<T> {
  readonly validationWriter: ValidationWriter<T>;
}

export class ValidationBuilder<TRoot, T> {
  private readonly options: BuilderOptions<TRoot>;
  private readonly path: string[];
  private readonly data: T;

  constructor(options: BuilderOptions<TRoot>, path: string[], data: T) {
    this.options = options;
    this.path = path;
    this.data = data;
  }

  public prop = <TChild>(lambdaPath: LambdaPath<T, TChild>, rule: ValidationRule<TRoot, TChild>): void => {
    const info = this.getPathInfo(lambdaPath);
    if (info == null) {
      return;
    }

    const builder = new ValidationBuilder<TRoot, TChild>(this.options, info.path, info.data);
    rule(builder, builder.data);
  };

  public array = <TChild>(lambdaPath: LambdaPath<T, TChild[]>, rule: ItemValidationRule<TRoot, TChild>): void => {
    const info = this.getPathInfo(lambdaPath);
    if (info == null || !Array.isArray(info.data)) {
      return;
    }

    const array = info.data;
    for (let i = 0; i < array.length; ++i) {
      const path = [...info.path, i.toString()];
      const builder = new ValidationBuilder<TRoot, TChild>(this.options, path, array[i]);
      rule(builder, builder.data, i, array);
    }
  };

  public invalid = (isInvalid: (value: T) => boolean, message: React.ReactNode, type?: ValidationBehaviour, level?: ValidationLevel): void => {
    const validationWriter = this.options.validationWriter.getNode<T>(this.path);
    if (validationWriter.isValidated()) {
      return;
    }

    const invalid = isInvalid(this.data);
    if (!invalid) {
      return;
    }

    validationWriter.set({message, type, level});
  };

  private getPathInfo = <TChild>(lambdaPath: LambdaPath<T, TChild>): Nullable<PathInfo<TChild>> => {
    const path = FunctionHelper.getLambdaPath(lambdaPath);

    let data: any = this.data;
    for (const part of path) {
      if (data == null) {
        return null;
      }
      data = data[part];
    }

    return {data, path: [...this.path, ...path]};
  }
}

/* eslint-disable no-useless-constructor */
import { ValidationInfo } from '../ValidationWrapper';
import { ExtractItem, Nullable } from '../../typings/Types';

import { ValidationNode } from './Types';
import { LambdaPath, PathTokensCache } from './PathHelper';

export class ValidationReader<T> {
  constructor(
    private readonly node: Nullable<ValidationNode<T>>,
    private readonly tokens: PathTokensCache,
  ) {}

  public getNode<TChild>(lambdaPath: LambdaPath<T, TChild>): ValidationReader<TChild> {
    const path = this.tokens.getOrAdd(lambdaPath);
    return this.getReaderInternal<TChild>(path);
  }

  public getNodeByIndex(index: number): ValidationReader<ExtractItem<T>> {
    return this.getReaderInternal<ExtractItem<T>>([index.toString()]);
  }

  public getNodeByKey<TKey extends keyof T>(key: TKey): ValidationReader<T[TKey]> {
    return this.getReaderInternal<T[TKey]>([key.toString()]);
  }

  public get(): Nullable<ValidationInfo> {
    return this.node ? this.node.validation : null;
  }

  private findValueInNestedObject(obj: Nullable<Record<string, any>>): [string | null, Nullable<ValidationInfo>] {
    let foundKey = null;
    let value = null;
    if (!obj) {
      return [null, null];
    }

    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const currentValue = obj[key];
        if (currentValue === 'invalid' || currentValue === 'warning') {
          return [key, obj as ValidationInfo];
        }

        if (typeof currentValue === 'object') {
          [foundKey, value] = this.findValueInNestedObject(currentValue);

          if (foundKey !== null) {
            return [key, value];
          }
        }
      }
    }

    return [null, null];
  }

  public getFirstNodeWithValidation(): Array<Nullable<ValidationInfo>> {
    if (!this.node) {
      return [];
    }
    if (this.node.validation) {
      return [this.node.validation];
    }
    const [key, value] = this.findValueInNestedObject(this.node.children);
    if (key) {
      const index = Number(key);
      const template: Array<Nullable<ValidationInfo>> = Array.from({ length: index });
      template[index] = value;
      return template;
    }
    return [];
  }

  private getReaderInternal<TChild>(path: string[]): ValidationReader<TChild> {
    const node = this.getNodeInternal<TChild>(path);
    return new ValidationReader<TChild>(node, this.tokens);
  }

  private getNodeInternal<TChild>(path: string[]): Nullable<ValidationNode<TChild>> {
    let current: Nullable<ValidationNode<any>> = this.node;
    for (const part of path) {
      if (!current || !current.children) {
        return null;
      }
      current = current.children[part];
    }
    return current;
  }
}

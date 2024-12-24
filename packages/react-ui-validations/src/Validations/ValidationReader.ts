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

  private findValueInNestedObject(obj: Nullable<Record<string, any>>, valuesToFind: string[]) {
    let foundKey = null;
    if (!obj) {
      return null;
    }

    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const currentValue = obj[key];

        if (valuesToFind.includes(currentValue)) {
          return key;
        }

        if (typeof currentValue === 'object') {
          foundKey = this.findValueInNestedObject(currentValue, valuesToFind);

          if (foundKey !== null) {
            return key;
          }
        }
      }
    }

    return null;
  }

  public getFirstNodeWithValidation(): number | null {
    if (!this.node) {
      return null;
    }
    if (this.node.validation) {
      return 0;
    }
    return Number(this.findValueInNestedObject(this.node.children, ['invalid', 'warning']));
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

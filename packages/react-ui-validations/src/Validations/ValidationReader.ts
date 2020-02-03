import { ValidationInfo } from '../ValidationWrapper';
import { ExtractItem, Nullable } from '../../typings/Types';

import { ValidationNode } from './Types';
import { LambdaPath, PathTokensCache } from './PathHelper';

export class ValidationReader<T> {
  constructor(private readonly node: Nullable<ValidationNode<T>>, private readonly tokens: PathTokensCache) {}

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

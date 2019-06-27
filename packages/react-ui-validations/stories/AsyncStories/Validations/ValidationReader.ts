import { ExtractItem, ValidationNode } from './Types';
import { LambdaPath, PathTokensCache } from '../../../src/Validations/PathHelper';
import { Nullable } from '../../../typings/Types';
import { ValidationInfo } from '../../../src';

export class ValidationReader<T> {
  private readonly node: Nullable<ValidationNode<T>>;

  constructor(node: Nullable<ValidationNode<T>>) {
    this.node = node;
  }

  public getNode<TChild>(lambdaPath: LambdaPath<T, TChild>): ValidationReader<TChild> {
    const node = this.getNodeInternal<TChild>(new PathTokensCache().getOrAdd(lambdaPath));
    return new ValidationReader<TChild>(node);
  }

  public getNodeByIndex(index: number): ValidationReader<ExtractItem<T>> {
    const node = this.getNodeInternal<ExtractItem<T>>([index.toString()]);
    return new ValidationReader<ExtractItem<T>>(node);
  }

  public getNodeByKey<TChild>(key: keyof T): ValidationReader<TChild> {
    const node = this.getNodeInternal<TChild>([key.toString()]);
    return new ValidationReader<TChild>(node);
  }

  public get(): Nullable<ValidationInfo> {
    if (!this.node || !this.node.info) {
      return null;
    }
    const loading = !!this.node.info.cancellation;
    return loading ? { loading: true } : this.node.info.validation;
  }

  public isPending(type: 'self' | 'deep' | 'children' | 'descendants' = 'self'): boolean {
    switch (type) {
      case 'self':
        return this.isPendingSelf();
      case 'deep':
        return this.isPendingDeep();
      case 'children':
        return this.isPendingChildren();
      case 'descendants':
        return this.isPendingDescendant();
      default:
        throw new Error('type ' + type);
    }
  }

  public isPendingDeep(): boolean {
    return this.isPendingSelf() || this.isPendingDescendant();
  }

  public isPendingSelf(): boolean {
    return !!this.node && !!this.node.info && !!this.node.info.cancellation;
  }

  public isPendingChildren(): boolean {
    if (!this.node || !this.node.children) {
      return false;
    }

    const children: Array<ValidationNode<any>> = Object.values(this.node.children);

    return children.some(node => !!node && !!node.info && !!node.info.cancellation);
  }

  public isPendingDescendant(): boolean {
    if (!this.node || !this.node.children) {
      return false;
    }

    const queue: Array<ValidationNode<any>> = Object.values(this.node.children);

    while (queue.length) {
      const node = queue.shift();
      if (node && node.info && !!node.info.cancellation) {
        return true;
      }
      if (node && node.children) {
        queue.push(...Object.values(node.children));
      }
    }
    return false;
  }

  private getNodeInternal<TChild>(path: string[]): Nullable<ValidationNode<TChild>> {
    let current: Nullable<ValidationNode<any>> = this.node;
    for (const part of path) {
      if (!current) {
        return null;
      }
      if (!part) {
        continue;
      }
      if (!current.children) {
        return null;
      }
      if (!current.childKeyByName) {
        return null;
      }
      const key = current.childKeyByName[part];
      current = current.children[key];
    }
    return current as ValidationNode<TChild>;
  }
}

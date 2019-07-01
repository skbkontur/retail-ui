import { ValidationNode } from './Types';
import { ValidationInfo } from '../ValidationWrapper';
import { ValidationReader } from './ValidationReader';
import { PathTokensCache } from './PathHelper';

export class ValidationWriter<T> {
  private readonly node: ValidationNode<T>;

  constructor(node?: ValidationNode<T>) {
    this.node = node || { validation: null, children: null };
  }

  public getReader(tokens: PathTokensCache): ValidationReader<T> {
    return new ValidationReader(this.node, tokens);
  }

  public set(validation: ValidationInfo): void {
    this.node.validation = validation;
  }

  public isValidated(): boolean {
    return !!this.node.validation;
  }

  public getNode<TChild>(path: string[]): ValidationWriter<TChild> {
    const node = this.getNodeInternal<TChild>(path);
    return new ValidationWriter<TChild>(node);
  }

  private getNodeInternal<TChild>(path: string[]): ValidationNode<TChild> {
    let node: ValidationNode<any> = this.node;
    for (const part of path) {
      if (!node.children) {
        node.children = {};
      }
      if (!node.children[part]) {
        node.children[part] = {
          validation: null,
          children: null,
        };
      }
      node = node.children[part];
    }
    return node;
  }
}

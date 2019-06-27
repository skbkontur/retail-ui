import { ValidationInfo, ValidationNode, NodePath, ValidationObject, NodeLocal } from './Types';
import { ValidationReader } from './ValidationReader';
import { Nullable } from '../../../typings/Types';
import CancellationToken from '../Cancellation/CancellationToken';

export class ValidationWriter<T> {
  private readonly node: ValidationNode<T>;

  public constructor(node?: ValidationNode<T>) {
    this.node = node || { info: null, children: null, childKeyByName: null };
  }

  public get reader(): ValidationReader<T> {
    return new ValidationReader(this.node);
  }

  public set = (validationInfo: ValidationInfo): void => {
    this.node.info = validationInfo;
  };

  public get = (): Nullable<ValidationInfo> => {
    return this.node.info;
  };

  public addValidation = (callback: (cancellation: CancellationToken) => Promise<Nullable<ValidationObject>>): void => {
    if (!this.node.info) {
      throw new Error('zzz');
    }

    this.node.info.validateCallbacks.push(callback);
  };

  public addLocal = (local: NodeLocal): void => {
    if (!this.node.info) {
      throw new Error('zzz');
    }

    this.node.info.locals[local.name] = {
      dependency: local.dependency,
      calculate: local.calculate,
      promiseLazySource: local.promiseLazySource,
      cancellation: null,
    };
  };

  public addSubmitted = (validate: (value: any) => Nullable<ValidationObject>): void => {
    if (!this.node.info) {
      throw new Error('zzz');
    }

    this.node.info.submittedCallbacks.push(validate);
  };

  public getInfos = (): ValidationInfo[] => {
    const result: ValidationInfo[] = [];
    const queue: Array<ValidationNode<any>> = [this.node];
    while (queue.length) {
      const node = queue.shift();
      if (node === undefined) {
        throw new Error('node is undefined');
      }
      if (node.info) {
        result.push(node.info);
      }
      if (node.children) {
        for (const key in node.children) {
          if (node.children.hasOwnProperty(key)) {
            queue.push(node.children[key]);
          }
        }
      }
    }
    return result;
  };

  public getInfo = (keys: string[]): Nullable<ValidationInfo> => {
    let current: ValidationNode<any> = this.node;
    for (const key of keys) {
      if (!current) {
        return null;
      }
      if (!current.children) {
        return null;
      }
      current = current.children[key];
    }
    return current ? current.info : null;
  };

  public getOrCreateNode = <TChild>(path: NodePath[]): ValidationWriter<TChild> => {
    const node = this.createNodeInternal<TChild>(path);
    return new ValidationWriter<TChild>(node);
  };

  private createNodeInternal = <TChild>(path: NodePath[]): ValidationNode<TChild> => {
    let current: ValidationNode<any> = this.node;
    for (const part of path) {
      if (!current.children) {
        current.children = {};
      }
      if (!current.childKeyByName) {
        current.childKeyByName = {};
      }
      const { key, name } = part;

      if (current.childKeyByName[name] && current.childKeyByName[name] !== key) {
        throw new Error('имя принадлежит другому ключу');
      }
      if (current.children[key] && current.childKeyByName[name] !== key) {
        throw new Error('ключ уже был добавлен по другим именем');
      }

      if (!current.children[key]) {
        current.childKeyByName[name] = key;
        current.children[key] = {
          info: null,
          children: null,
          childKeyByName: null,
        };
      }
      current = current.children[key];
    }
    if (!current.info) {
      current.info = {
        path,
        cancellation: null,
        validation: null,
        validateCallbacks: [],
        locals: {},
        submittedCallbacks: [],
      };
    }
    return current as ValidationNode<TChild>;
  };
}

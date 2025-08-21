import type React from 'react';
import EventEmitter from 'eventemitter3';

import type { Nullable } from '../../typings/utility-types';

import { getRootNode } from './getRootNode';

export type TGetRootNode = () => Nullable<Element>;
export type TSetRootNode = (e: Nullable<React.ReactInstance>) => void;

export interface TRootNodeSubscription {
  remove: () => void;
}

export interface InstanceWithRootNode {
  getRootNode: TGetRootNode;
  addRootNodeChangeListener?: (callback: (node: Nullable<Element>) => void) => TRootNodeSubscription;
}

interface ComponentWithDefaultRootNode {
  defaultRootNode?: Element | null;
}
interface ComponentWithKonturReactUI {
  __KONTUR_REACT_UI__?: string;
  displayName?: string;
}

interface DecoratableClassComponent extends ComponentWithDefaultRootNode, ComponentWithKonturReactUI {
  new (...args: any[]): React.Component;
}

export function rootNode<T extends DecoratableClassComponent>(Component: T) {
  const rootNode = class extends Component implements InstanceWithRootNode {
    public static __KONTUR_REACT_UI__ = Component.__KONTUR_REACT_UI__;
    public static displayName = Component.displayName;

    public rootNode: Nullable<Element> = Component.defaultRootNode;
    public rootNodeEmitter = new EventEmitter();
    public constructor(...args: any[]) {
      super(args[0]);
    }

    public setRootNode = (instance: Nullable<React.ReactInstance>) => {
      const rootNode = getRootNode(instance);
      if (rootNode !== this.rootNode) {
        this.rootNode = rootNode;
        this.rootNodeEmitter.emit('change', rootNode);
      }
    };

    public getRootNode = (): Nullable<Element> => {
      return this.rootNode;
    };

    public addRootNodeChangeListener = (callback: (node: Nullable<Element>) => void): TRootNodeSubscription => {
      this.rootNodeEmitter.addListener('change', callback);
      return {
        remove: () => {
          this.rootNodeEmitter.removeListener('change', callback);
        },
      };
    };
  };

  const nameDescriptor = Object.getOwnPropertyDescriptor(rootNode, 'name');
  if (!nameDescriptor || nameDescriptor.configurable) {
    Object.defineProperty(rootNode, 'name', { value: Component.name });
  }

  return rootNode;
}

export const isInstanceWithRootNode = (instance: unknown): instance is InstanceWithRootNode => {
  return Boolean(instance) && Object.prototype.hasOwnProperty.call(instance, 'getRootNode');
};

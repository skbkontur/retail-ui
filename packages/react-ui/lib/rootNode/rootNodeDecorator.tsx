/* eslint-disable react/display-name */
import React from 'react';
import EventEmitter from 'eventemitter3';

import { Nullable } from '../../typings/utility-types';

import { getRootNode } from './getRootNode';

export type TSetRootNode = (e: Nullable<React.ReactNode>) => void;

export interface TRootNodeSubscription {
  remove: () => void;
}

export interface InstanceWithRootNode {
  getRootNode: () => Nullable<Element>;
  addRootNodeChangeListener?: (callback: (node: Nullable<Element>) => void) => TRootNodeSubscription;
}

interface ComponentWithDefaultRootNode {
  defaultRootNode?: Element | null;
}

interface DecoratableClassComponent extends ComponentWithDefaultRootNode {
  new (...args: any[]): React.Component;
}

export function rootNode<T extends DecoratableClassComponent>(Component: T) {
  const rootNode = class extends Component implements InstanceWithRootNode {
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

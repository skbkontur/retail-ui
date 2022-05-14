/* eslint-disable react/display-name */
import React from 'react';
import EventEmitter from 'eventemitter3';

import { Nullable } from '../../typings/utility-types';
import { hasOwnProperty } from '../utils';

import { getRootNode } from './getRootNode';

export type TSetRootNode = (e: Nullable<React.ReactNode>) => void;

export type TRootNodeSubscription = {
  remove: () => void;
};

export interface InstanceWithRootNode {
  getRootNode: () => Nullable<HTMLElement>;
  addRootNodeChangeListener?: (callback: (node: Nullable<HTMLElement>) => void) => TRootNodeSubscription;
}

export function rootNode<T extends new (...args: any[]) => React.Component>(Component: T) {
  const rootNode = class extends Component implements InstanceWithRootNode {
    public rootNode: Nullable<HTMLElement> = null;
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

    public getRootNode = (): Nullable<HTMLElement> => {
      return this.rootNode;
    };

    public addRootNodeChangeListener = (callback: (node: Nullable<HTMLElement>) => void): TRootNodeSubscription => {
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

export const isInstanceWithRootNode = (instance: Nullable<object>): instance is InstanceWithRootNode => {
  return hasOwnProperty(instance, 'getRootNode');
};

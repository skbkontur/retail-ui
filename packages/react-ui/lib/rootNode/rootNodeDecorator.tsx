/* eslint-disable react/display-name */
import React from 'react';

import { Nullable } from '../../typings/utility-types';

import { getRootNode } from './getRootNode';

export type TSetRootNode = (e: Nullable<React.ReactNode>) => void;

export function rootNode<T extends new (...args: any[]) => React.Component>(Component: T) {
  const rootNode = class extends Component {
    public rootNode: Nullable<HTMLElement>;
    public constructor(...args: any[]) {
      super(args[0]);
    }

    public setRootNode = (instance: Nullable<React.ReactInstance>) => {
      this.rootNode = getRootNode(instance);
    };

    public getRootNode = (): Nullable<HTMLElement> => {
      return this.rootNode;
    };
  };

  const nameDescriptor = Object.getOwnPropertyDescriptor(rootNode, 'name');
  if (!nameDescriptor || nameDescriptor.configurable) {
    Object.defineProperty(rootNode, 'name', { value: Component.name });
  }

  return rootNode;
}

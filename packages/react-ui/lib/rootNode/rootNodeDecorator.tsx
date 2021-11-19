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

    public setRootNode = (e: Nullable<React.ReactNode>) => {
      const newValue = getRootNode(e);
      if (newValue === null) return;
      this.rootNode = getRootNode(e);
    };

    public getRootNode = () => {
      return this.rootNode;
    };
  };

  const nameDescriptor = Object.getOwnPropertyDescriptor(rootNode, 'name');
  if (!nameDescriptor || nameDescriptor.configurable) {
    Object.defineProperty(rootNode, 'name', { value: Component.name });
  }

  return rootNode;
}

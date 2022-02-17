import React from 'react';

import { Nullable } from '../../typings/utility-types';

import { getRootNode } from './getRootNode';

export type TSetRootNode = (e: Nullable<React.ReactNode>) => void;

export function rootNode<T extends new (...args: any[]) => React.Component>(Component: T) {
  const rootNode = class extends Component {
    public rootNode: Nullable<HTMLElement>;
    public __KONTUR_REACT_UI__: string;
    public constructor(...args: any[]) {
      super(args[0]);
      // @ts-ignore
      this.__KONTUR_REACT_UI__ = Component.__KONTUR_REACT_UI__;
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
